const router = require("express").Router();
const Player = require("../../models/player");
const { saveImage, fileFetch } = require("../../lib/imageConverter");
const User = require("../../models/user");
const bcrypt = require('bcrypt');

router.post("/:teamId", fileFetch.single("image"), async (req, res, next) => {
  try {
    const { name, gurdianEmail } = req.body;
    const { userId } = req.user;
    const { teamId } = req.params;

    const images = await Promise.all([saveImage(req.files.image[0])]);

    await new Player({
      name,
      coachId: userId,
      teamId,
      gurdianEmail,
      image: images[0],
    }).save();



    // check gurdian user exist
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
        const generatedPassword = Math.random().toString(36).slice(-8);

      // Creating user
      const newUser = new User({
        name,
        email:gurdianEmail,
        password: await bcrypt.hash(generatedPassword, 12),
        userType: "client",
      });

      const newData = await newUser.save();

      let token = await Token.findOne({ userId: newData._id});
        if (!token) {
            token = await new Token({
                userId: newData._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

      try {
        const activateToken = `${newData._id}.${token.token}?email=${encodeURI(
            gurdianEmail
        )}`;

        // Verify Email
        const emailResult = await sendMail({
          to: newData.email,
          subject: "Verification mail",
          text: `Click on the given link ${CLIENT_URL}/activate/${activateToken}`,
          template: "activation",
          context: {
            username: newData.name,
            email: newData.email,
            link: `${CLIENT_URL}/activate/${activateToken}`,
          },
        });
      } catch (err) {
        console.log(err.message);
      }
    }

    res.json({
      msg: "Player is added successfully",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
