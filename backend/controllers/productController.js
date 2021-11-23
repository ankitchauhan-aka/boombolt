import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Brand from "../models/brandModel.js";
import Bagsize from "../models/bagsizeModel.js";
import Material from "../models/materialModel.js";
import Category from "../models/categoryModel.js";
import Color from "../models/colorModel.js";

import cloudinary from "cloudinary";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = parseInt(req.query.rows) || 10;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword;
  const filter = parseInt(req.query.sort) || -1;
  const categoryQuery = req.query.category;
  const category = decodeURI(req.query.brands);

  const sorttype = req.query.sorttype;
  const color = req.query.color;
  const subcategory = req.query.subcategory;
  const size = req.query.size;
  const discount = req.query.discount;
  const material = req.query.material;
  const sort = req.query.sort;
  let query = {};
  let recommended = 1;
  let popular = 1;
  let priceFilter = 1;
  if (sort == "recommended") {
    recommended = -1;
  }
  else if (sort == "high_to_low") {
    priceFilter = -1
  }
  else if (sort == "popular") {
    popular = -1;
  } else {
    recommended = -1;
  }
  if (subcategory) {
    query.subcategory = { $in: [subcategory] };
  }
  if (color) {
    query.colors = { $in: color };
  }
  if (material) {
    const materiall = await Material.find({
      title: { $in: material.split(",") }
    }).select("_id");
    const matlist = materiall.map(brand => brand._id);
    query.material = { $in: matlist };
  }
  if (size) {
    const bagsize = await Bagsize.find({
      title: { $in: size.split(",") }
    }).select("_id");
    const sizelist = bagsize.map(brand => brand._id);
    query.size = { $in: sizelist };
  }
  if (categoryQuery) {
    let category = await Category.findOne({
      slug: {
        $regex: decodeURI(categoryQuery),
        $options: "i"
      }
    }).select("_id");
    let searchCategories = [];
    if (category) {
      let childCategory = await Category.find({ parent: category._id }).select(
        "_id"
      );
      searchCategories = childCategory.map(cat => cat._id);
      searchCategories.push(category._id);
      query.categories = { $in: searchCategories };
    }
  } else if (categoryQuery && categoryQuery.split(",").length > 1) {
    let category = await Category.find({
      slug: {
        $in: categoryQuery.split(",")
      }
    }).select("_id");

    let searchCategories = [];
    let categ = category.map(cate => cate._id);
    categ = categ.toString();
    if (category) {
      let childCategory = await Category.find({
        parent: { $in: decodeURI(categ.split(",")) }
      }).select("_id");
      searchCategories = childCategory.map(cat => cat._id);
      searchCategories.push(category._id);
      query.categories = { $in: searchCategories };
    }
  } else if (keyword != "all") {
    query = { $or: [] };
    query.$or.push({
      description: {
        $regex: decodeURI(keyword),
        $options: "i"
      }
    });
    // query.$or.push({ ManufPartNo: decodeURI(keyword) });
  }
  if (req.query.brands) {
    // const brands = await Category.find({
    //   title: { $in: req.query.brands.split(",") }
    // }).select("_id");
    // const brandList = brands.map(brand => brand._id);
    // query.categories = { $in: brandList };
    let catego = decodeURI(req.query.brands);

    let category = await Category.find({
      title: {
        $in: catego.split(",")
      }
    }).select("_id");
    let searchCategories = [];
    let categ1 = category.map(cate => cate._id);
    let categ = categ1.toString();
    if (category) {
      let childCategory = await Category.find({
        parent: { $in: categ.split(",") }
      }).select("_id");
      searchCategories = childCategory.map(cat => cat._id);
      var i;
      for (i = 0; i < categ1.length; i++) {
        searchCategories.push(categ1[i]);
      }
      // searchCategories=

      query.categories = { $in: searchCategories };
    }
  }
  if (req.query.mindiscount) {
    query.discount = {};
    query.discount.$gte = Number(req.query.mindiscount || 0);
  }
  if (req.query.maxdiscount) {
    if (!query.discount) query.discount = {};
    query.discount.$lte = Number(req.query.maxdiscount);
  }

  // if (req.query.discount && req.query.discount !== "Select Discount") {
  //   query.discount = { $in: [req.query.discount] };
  // }
  if (req.query.color) {
    const colorsdata = await Color.find({
      title: { $in: req.query.color.split(",") }
    }).select("_id");
    const colorlist = colorsdata.map(col => col._id);
    query.colors = { $in: colorlist };
  }
  const minPriceProduct = await Product.find(query)
    .sort({ price: 1 })
    .limit(1);
  const maxPriceProduct = await Product.find(query)
    .sort({ price: -1 })
    .limit(1);
  const maximumPriceProduct = await Product.find()
    .sort({ price: -1 })
    .limit(1);
  let minAll = minPriceProduct[0]?.price;
  let maxAll = maxPriceProduct[0]?.price;
  let maximumAll = maximumPriceProduct[0]?.price;

  if (req.query.minprice) {
    query.price = {};
    query.price.$gte = Number(req.query.minprice || 0);
  }
  if (req.query.maxprice) {
    if (!query.price) query.price = {};
    query.price.$lte = Number(req.query.maxprice);
  }

  const allProducts = await Product.countDocuments(query);
  const count = allProducts;
  const products = await Product.find(query)
    .populate(["categories", "colors", "size"])
    .limit(pageSize)
    .sort(sort == "popular" ? { orders: popular } : sort == "recommended" ? { rating: recommended } : { discount_price:priceFilter})
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    count,
    minAll,
    maxAll,
    maximumAll
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.find({
    _id: { $in: req.params.id.split(",") }
  }).populate([
    // "attr_type",
    "categories",
    "size",
    "colors",
    "related",
    "material",
    "bought_together"
  ]);

  if (product) {
    if (product.length == 1) {
      res.json(product[0]);
    } else {
      res.json(product);
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createCustom = asyncHandler(async (req, res) => {
  try {
    res.status(201).json({ createdProduct: "ddd" });
  } catch (err) {
    console.log(err);
  }
});

const getProductBySlug = asyncHandler(async (req, res) => {
  const keyword = req.params.slug;

  const product = await Product.find({
    slug: { $in: req.params.slug.split(",") }
  }).populate(["categories", "size", "colors", "related", "attr_type"]);
  if (product) {
    if (product.length == 1) {
      res.json(product[0]);
    } else {
      res.json(product);
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let id1 = id.split(",");
  for (var item in id1) {
    let id2 = id1[item];
    const product = await Product.findById(id2);
    if (product) {
      await product.remove();
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body);
  const categoryPromise = req.body.categories.map(category => category.value);
  const colorPromise = req.body.colors.map(colors => colors.value);
  const sizePromise = req.body.size.map(size => size.value);
  const materialPromise = req.body.material.map(material => material.value);
  // const discountPromise = req.body.discount.map(dis => dis.value);

  const subcategoryPromise = req.body.subcategory.map(
    subcategory => subcategory.value
  );

  const relatedProductPromise = req.body.related.map(product => product.value);
  const boughtTogetherPromise = req.body.bought_together.map(
    product => product.value
  );
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

  const images = [];
  for (let i = 0; i < req.body.images.length; i++) {
    let uploadeResponse = await cloudinary.v2.uploader.upload(
      req.body.images[i]
    );
    images.push(uploadeResponse.secure_url);
  }
  const data = await Promise.all([
    categoryPromise,
    colorPromise,
    sizePromise,
    // discountPromise,
    relatedProductPromise,
    boughtTogetherPromise,
    subcategoryPromise,
    materialPromise
  ]);
  // product.discount = discountPromise.toString();
  product.categories = data[0];
  product.colors = data[1];
  product.size = data[2];
  product.material = data[6];
  product.subcategory = data[5];
  product.images = images;
  product.related = data[3];
  product.bought_together = data[4];
  const createdProduct = await product.save();
  // res.status(201).json("createdProduct");
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const categoryPromise = req.body.categories.map(category => category.value);
  const relatedProductPromise = req.body.related.map(related => related.value);
  const sizePromise = req.body.size.map(size => size.value);
  const materialPromise = req.body.material.map(material => material.value);
  // const discountPromise = req.body.discount.map(dis => dis.value);
  const colorPromise = req.body.colors?.map(colors => colors?.value);

  const boughtTogetherPromise = req.body.bought_together.map(
    product => product?.value
  );
  const subcategoryPromise = req.body.subcategory.map(
    subcategory => subcategory.value
  );
  const data = await Promise.all([
    categoryPromise,
    relatedProductPromise,
    boughtTogetherPromise,
    sizePromise,
    // discountPromise,
    subcategoryPromise,
    colorPromise,
    materialPromise
  ]);
  const {
    name,
    price,
    description,
    brand,
    category,
    countInStock,
    discount,
    images,
    short_desc,
    height,
    width,
    slug,
    specs,
    discount_price,
    sku,
    depth,
    attr_type,
    attrs,
    weight,
    nav_include,
    topDeals_include,
    featured_include,
    sale_include,
    newProduct_include
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.nav_include = nav_include;
    product.topDeals_include = topDeals_include;
    product.featured_include = featured_include;
    product.sale_include = sale_include;
    product.newProduct_include = newProduct_include;
    product.brand = brand;
    product.attr_type = attr_type;
    product.attrs = attrs;
    product.category = category;
    product.countInStock = countInStock;
    if (data[0][0] != undefined) {
      product.categories = data[0];
    }
    if (data[1][0] != undefined) {
      product.related = data[1];
    }
    if (data[2][0] != undefined) {
      product.bought_together = data[2];
    }
    if (data[3][0] != undefined) {
      product.size = data[3];
    }
    // if (data[4][0] != undefined) {
    // product.discount = discountPromise.toString();
    // }
    if (data[4][0] != undefined) {
      product.subcategory = data[5];
    }
    if (data[5][0] != undefined) {
      product.colors = data[5];
    }
    if (data[6][0] != undefined) {
      product.material = data[6];
    }
    product.images = images;
    product.short_desc = short_desc;
    product.height = height;
    product.width = width;
    product.discount_price = discount_price;
    product.discount = discount;
    product.price = price;
    product.specs = specs;
    product.return = req.body.return;
    product.sku = sku;
    product.slug = slug;
    product.description = description;
    product.depth = depth;

    product.weight = weight;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private

const createProductReview = asyncHandler(async (req, res) => {
  const { ratings, description } = req.body;
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
    });
    let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image);
    const imagedata = uploadeResponse.secure_url;

    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.json({ message: "Product already reviewed" });
        return;
      }

      const review = {
        name: req.user.firstName,
        rating: Number(ratings.length),
        comment: description,
        image: imagedata,
        user: req.user._id
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (err) {
    console.log(err);
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ rating: -1 })
    .limit(3);
  res.json(products);
});

const getProductByBrand = asyncHandler(async (req, res) => {
  const brandId = req.params.brandId;
  // var query = { brand: ObjectId(brandId) };
  const brand = await Brand.findOne({ slug: brandId });
  var query = { brand: brand._id };
  const products = await Product.find(query).populate([
    "related",
    "bought_together",
    "brand",
    "categories"
  ]);
  // const
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getSaleProducts = asyncHandler(async (req, res) => {
  // const keyword = req.query.keyword;
  var product = {};
  var sale_include_query = { sale_include: true };
  const sale_product = await Product.findOne(sale_include_query).sort({
    updatedAt: -1
  });

  var topDeals_include_query = { topDeals_include: true };
  const deals_product = await Product.find(topDeals_include_query)
    .limit(5)
    .sort({ updatedAt: -1 });

  var newProduct_include_query = { newProduct_include: true };
  const new_product = await Product.findOne(newProduct_include_query).sort({
    updatedAt: -1
  });

  var homeCategory_query = { home_include: true };
  const home_category = await Category.find(homeCategory_query)
    .limit(4)
    .sort({ updatedAt: -1 });

  // var sale_include_query = { sale_include: true };
  // const product = await Product.findOne(sale_include_query);
  product.sale_product = sale_product;
  product.deals_product = deals_product;
  product.new_product = new_product;
  product.home_categories = home_category;
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  getProductBySlug,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductByBrand,
  getSaleProducts,
  createCustom
};
