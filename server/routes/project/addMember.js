const router = require("express").Router();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Project = require("../../models/project");
const Product = require("../../models/product");
const User = require("../../models/user");
const Collection = require("../../models/collection");
const sendNotification = require("../../lib/sendNotification");
const { saveImage, fileFetch } = require("../../lib/imageConverter");

router.post("/:id", fileFetch.single("image"), async (req, res, next) => {
  try {
    const { userId, userType } = req.user;
    const { id } = req.params;
    const { name, email, size } = req.body;

    if (userType === "admin" || userType === "coach") {
      const project = await Project.findOne({ _id: id, type: "team" });

      if (!project) throw Error("Project not found");

      const products = await Product.find({ projectId: id }).limit(
        project.productCount
      );

      if (project.count < 1) throw Error("Can not add user");

      // Find the email
      let user = await User.findOne({ email });

      // Throw error if email already registers
      if (!user) {
        const password = crypto.randomBytes(4).toString("hex");

        // Creating user
        const newUser = new User({
          name,
          email,
          password: await bcrypt.hash(password, 12),
          userType: "client",
        });

        // Save User data to database
        user = await newUser.save();

        await sendPassword(name, email, password);
      }

      let image;
      if (req.file) {
        image = await saveImage(req.file);
      }

      const newProducts = await Promise.all(
        products.map((product, i) =>
          new Product({
            userId,
            projectId: project._id,
            typeId: product.typeId,
            type: product.type,
            name,
            image: {
              front: product.pngImageFront,
              back: product.pngImageBack,
            },
            colorImage: product.colorImage,
            color2: product.color2,
            price: product.price,
            priceArray: product.priceArray,
            discount: product.discount,
            count: product.count,
            size: size,
            description: product.description,
            layoutImage: product.layoutImage,
            primaryText: product.primaryText,
            primaryColor: product.primaryColor,
            secondaryText: product.secondaryText,
            secondaryColor: product.secondaryColor,
            frontImages: image ? [image] : [], // Store the gurdian image
            backImages: product.backImages,
            gurdianNotifications: [], // Store the gurdian email
            orderColor: product.orderColor,
            productFont: product.productFont,
          }).save()
        )
      );

      newProducts.map(async (product, i) => {
        const collections = await Collection.find(
          { productId: product._id },
          { image: 1 }
        );

        await new Collection({
          userId: product.userId,
          productId: product._id,
          title: product.name,
          image: collections[collections.length - 1].image,
        }).save();
      });

      await Project.findOneAndUpdate(
        { _id: id },
        { $push: { gurdianId: user._id }, $inc: { count: -1 } }
      );

      // Send notification
      const users = await User.find(
        { $or: [{ userType: "admin" }, { userType: "iep" }] },
        { _id: 1 }
      );
      const userIds = users.map(({ _id }) => _id.toString());

      userIds.push(project.userId.toString());
      userIds.push(user._id.toString());

      await sendNotification(
        "One player is added",
        userIds,
        project.orderId,
        project._id
      );
    } else {
      throw Error("You are not authorized");
    }

    res.json({
      message: `Player is added`,
    });
  } catch (err) {
    next(err);
  }
});

const sendPassword = async (name, email, password) => {
  try {
    // Verify Email
    const emailResult = await sendMail({
      to: email,
      subject: "Password for login",
      text: `Your password is ${password}`,
      template: "sendPassword",
      context: {
        username: name,
        email,
        password,
        link: `${CLIENT_URL}/login`,
      },
    });
  } catch (error) {
    console.log(`Password is ${password}`);
  }
};

module.exports = router;
