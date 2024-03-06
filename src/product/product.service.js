//service layer bertujuan untuk handle business logic
// kenapa dipisah? supaya tanggun jawabnya ter-isolate, dan functionnya
// reusable

const prisma = require("../db");

const {
  findProduct,
  findProductById,
  insertProduct,
  findProductByName,
  deleteProduct,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProduct();

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);
  if (!product) {
    throw Error("product not found");
  }

  return product;
};

const createProduct = async (newProductData) => {
  const productName = await findProductByName(newProductData.name);

  if (productName) {
    throw new Error("name has to be unique");
  }
  const product = await insertProduct(newProductData);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};

const patchProductById = async (id, productData) => {
  await getProductById(id);
  const product = editProduct(id, productData);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  patchProductById,
};
