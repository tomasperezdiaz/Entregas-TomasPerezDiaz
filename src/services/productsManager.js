import { productoModel } from "../dao/models/products.js";

export const getProductsService = async ({
  limit = 10,
  page = 1,
  sort,
  query,
}) => {
  try {
    page = page == 0 ? 1 : page;
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;
    const sortOrderOptions = {
      asc: -1,
      desc: 1,
    };
    sort = sortOrderOptions[sort] || null;

    try {
      if (query) query = JSON.parse(decodeURIComponent(query));
    } catch (error) {
      query = {};
    }

    const queryProducts = productoModel
      .find(query)
      .limit(limit)
      .skip(skip)
      .lean();
    if (sort !== null) {
      queryProducts.sort({ price: sort });
    }
    const [productos, totalDocs] = await Promise.all([
      queryProducts,
      productoModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);
    const hasNextPage = page < totalPages;
    const hasPrePage = page > 1;
    const prevPage = hasPrePage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    return {
      page,
      totalDocs,
      totalPages,
      limit,
      query: JSON.stringify(query),
      hasNextPage,
      hasPrePage,
      prevPage,
      nextPage,
      payload: productos,
    };
  } catch (error) {
    console.log("getProductsService ->", error);
    throw error;
  }
};

export const getProductsByIdService = async (id) => {
  try {
    return await productoModel.findById(id);
  } catch (error) {
    console.log("getProductsByIdService ->", error);
    throw error;
  }
};

export const addProductService = async ({
  title,
  description,
  price,
  thumbnails,
  code,
  stock,
  category,
  status,
}) => {
  try {
    return await productoModel.create({
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      category,
      status,
    });
  } catch (error) {
    console.log("addProductService ->", error);
    throw error;
  }
};

export const updateProductService = async (id, rest) => {
  try {
    return await productoModel.findByIdAndUpdate(
      id,
      { ...rest },
      { new: true }
    );
  } catch (error) {
    console.log("updateProductService ->", error);
    throw error;
  }
};

export const deleteProductService = async (id) => {
  try {
    return await productoModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("deleteProductService ->", error);
    throw error;
  }
};
