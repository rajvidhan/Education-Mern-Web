const Category = require("../models/Category");
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
//create tag ka handler function
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    //validation
    if (!name || !description) {
      res
        .json({
          success: false,
          msg: "All field are require ",
        })
        .status(500);
    }
    //create entry in db
    const categoryDetails = await Category.create({
      name,
      description,
    });
    console.log("categoryDetails", categoryDetails);
    //resturn the response
    return res
      .json({
        success: true,
        msg: "Category create successfully...",
      })
      .status(500);
  } catch (err) {
    console.log("error in the build of Category", err);
    res
      .json({
        success: false,
        msg: "something went wrong in creation of Category...",
      })
      .status(403);
  }
};

//get all the Categories
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );
    res
      .json({
        success: true,
        msg: "All Categories return successfully ...",
        data:allCategories,
      })
      .status(200);
  } catch (err) {
    console.log("err in get all Category >", err);
    res
      .json({
        success: false,
        msg: "error in get all Category",
      })
      .status(500);
  }
};

//category page details ka handler function
exports.categoryPageDetails = async (req, res) => {
  try {
    //getcategoryid
    const { categoryId } = req.body;
    console.log("kya hall chal")
    //fetch the all courses according to category id
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
       
        populate: "ratingAndReviews",
      })
      .exec();
    //validation
    if (!selectedCategory) {
      res
        .json({
          success: false,
          msg: "Category not found",
        })
        .status(400);
    }

    //  handle case when there are no courses
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec();

    //get top selling courses across the all courses
    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      
      })
      .exec();

      const allCourses = allCategories.flatMap((category) => category.course)
      
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
    //return response
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (err) {
    return res
      .json({
        success: false,
        msg: err.message,
      })
      .status(400);
  }
};
