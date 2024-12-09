const Product = require('../models/productModel');
const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

//Product ID generator:
function generateProductId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let productId = 'PROD-';
  
  for (let i = 0; i < 7; i++) {
      productId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return productId;
}


//  Upload product image to S3 and metadata to MongoDB
const addProduct = async (req, res) => {
    const { name, description, brand, category, quantity, price, availability } = req.body;
    const pid = generateProductId() //product ID

    const productData = new Product({
      pid,
      url: req.file.location,
      name,
      description,
      brand,
      category,
      quantity,
      price,
      availability,
      s3_key: req.file.key,
    });
  
    try {
      await productData.save();
      console.log('Added')
      req.flash('success', 'Product uploaded successfully!')
      res.redirect('/manage-products')
    } catch (err) {
      console.log('Error uploading image')
      req.flash('error', 'Error uploading image to S3')
      res.redirect('/manage-products')
    }

  };


  //edit product
  const editProduct = async (req, res) => {
    const { pid, name, description, brand, category, quantity, price, availability } = req.body;
  
    try {
      const product = await Product.findById(pid);
  
      if (!product) {
        req.flash('error', 'Product not found!');
        return res.redirect('/manage-products');
      }
  
      product.name = name;
      product.description = description;
      product.brand = brand;
      product.category = category;
      product.quantity = quantity;
      product.price = price;
      product.availability = availability;
  
      // If new file
      if (req.file) {
        product.url = req.file.location
        product.s3_key = req.file.key
      }
  
      // Save
      await product.save();
  
      console.log('Product updated successfully');
      req.flash('success', 'Product updated successfully!');
      res.redirect('/manage-products');
    } catch (err) {
      console.error('Error updating product:', err);
      req.flash('error', 'Error updating product.');
      res.redirect('/manage-products');
    }
  };
  



//Delete a product by ID
const deleteProduct =  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        console.log('Product not found')
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: product.s3_key,
      };
  
      s3.deleteObject(params, async (err, data) => {
        if (err) {
          console.log('Error deleting product from S3 Bucket')
          req.flash('error', 'Error deleting product from S3');
          return res.redirect('/manage-products');
        }
  
        await product.deleteOne();
        console.log('Product deleted!')
        req.flash('success', 'Product successfully deleted!');
        res.redirect('/manage-products');
      });
    } catch (err) {
        console.log(err)
      res.status(500).json({ error: 'Error deleting product - e' });
    }
  };


//add product page
const addProductPage = (req, res) => {
        const user = req.user
        return res.render('product/add-product', {title: 'Add Products', user})
    
}

//edit product page
const editProductPage = async (req, res) => {
  const user = req.user
  const pid = req.params.pid

  try {
    const product = await Product.findById(pid); 
    // console.log(product)
    return res.render('product/edit-product', {title: 'Edit Product', user, product})

  } catch (err) {
    res.status(500).json({ error: 'Error fetching products' });
  }  

}


//product management page
const manageProductsPage = async (req, res) => {
        const user = req.user

        try {
            const products = await Product.find().sort({ createdAt: 1 });
            return res.render('product/manage-products', {title: 'Admin - Manage Products', user, products})
    
          } catch (err) {
            res.status(500).json({ error: 'Error fetching products' });
          }     
    
}


//update publishing status
const publishStatus =  async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log('Product not found')
      return res.status(404).json({ error: 'Product not found' });
    }

    if(req.params.action === 'publish'){
      product.status = 1
    } else if(req.params.action === 'unpublish'){
      product.status = 0
    }

    await product.save();
    console.log('Publish status updated!')
    req.flash('success', 'Success!');
    res.redirect('/manage-products');

    } catch (err) {
        console.log(err)
      res.status(500).json({ error: 'Error deleting product - e' });
    }
};



module.exports = {
    addProductPage,
    manageProductsPage,
    addProduct,
    editProduct,
    editProductPage,
    deleteProduct,
    publishStatus
}