const router = require("express").Router();
const Product = require("../../models/product");
const Project = require("../../models/project");

router.get("/:id", async (req, res, next) => {
  try {
    const { userId, userType } = req.user;
    const { id } = req.params;

    const project = await Project.findOne(
      { _id: id },
      { active: 0, gurdianIds: 0 }
    );

    let products;
    if (userType === "admin" || userType === "iep") {
      products = await Product.find(
        { projectId: id },
        {
          _id: 1,
          name: 1,
          type: 1,
          image: 1,
          colorImage: 1,
          count: 1,
          price: 1,
          priceArray: 1,
          discount: 1,
          status: 1,
          finalImage: 1,
        }
      );
    } else if (
      userType === "client" ||
      userType === "coach" ||
      userType === "guardian"
    ) {
      products = await Product.find(
        { projectId: id, $or: [{ userId }, { gurdianId: userId }] },
        {
          _id: 1,
          name: 1,
          type: 1,
          image: 1,
          colorImage: 1,
          count: 1,
          price: 1,
          priceArray: 1,
          discount: 1,
          status: 1,
          finalImage: 1,
        }
      );

      // if(!products.length) throw Error('You are not authorized in this product or not exist');
    }

    const projectData = project.toJSON();

    res.json({
      message: `Product for ${userType}`,
      ...projectData,
      products,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
