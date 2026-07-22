import ProductModel from "../models/Product.js";

//create new product or add product
export const createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.json({
      message: "product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server Error",
      error,
    });
  }
};

//get all product
export const getProduct = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" }; //case sensitive search
    }
    if (category) {
      filter.category = category;
    }

    const products = await ProductModel.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

//update a product
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      message: "product updated successfully",
      updated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server Error",
      error,
    });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findByIdAndDelete(id);
    res.json({
      message: "deleted successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
      error,
    });
  }
};
