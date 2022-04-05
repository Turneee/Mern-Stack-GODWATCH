const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');

exports.createProduct = (req, res) => {

    //res.status(200).json( { file: req.files, body: req.body } );

    const {
        name, price, description, category, quantity, createdBy
    } = req.body;
    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    });

    product.save(((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(201).json({ product });
        }
    }));


};

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id')
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({ error });
            }

            if (category) {
                Product.find({ category: category._id })
                    .exec((error, products) => {

                        if (error) {
                            return res.status(400).json({ error });
                        }

                        if (products.length > 0) {
                            res.status(200).json({
                                products,
                                productsByPrice: {
                                    under100: products.filter(products => products.price <= 100),
                                    under200: products.filter(products => products.price > 100 && products.price <= 200),
                                    under500: products.filter(products => products.price > 200 && products.price <= 500),
                                    under1000: products.filter(products => products.price > 500 && products.price <= 1000),
                                    under10000: products.filter(products => products.price > 1000 && products.price <= 10000)
                                }
                            })
                        }
                    });
            }
        });  
}

exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(200).json({ product });
        }
      });
    } else {
      return res.status(400).json({ error: "Params required" });
    }
  };