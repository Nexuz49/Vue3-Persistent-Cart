//Backend/Server Setup
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PRODUCT_DATA_FILE = path.join(__dirname, 'server-product-data.json');
const CART_DATA_FILE = path.join(__dirname, 'server-cart-data.json');

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// API endpoint that frontend will query to add an item to the shopping cart.
// Will use app.post to listen for an HTTP POST request.
app.post('/cart', (req, res) => {
    fs.readFile(CART_DATA_FILE, (err, data) => {
      const cartProducts = JSON.parse(data);
      const newCartProduct = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image_tag: req.body.image_tag,
        quantity: 1
      };
      let cartProductExists = false;
      cartProducts.map((cartProduct) => {
        if (cartProduct.id === newCartProduct.id) {
          cartProduct.quantity++;
          cartProductExists = true;
        }
      });
      if (!cartProductExists) cartProducts.push(newCartProduct);
      fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(cartProducts);
      });
    });
  });

// API endpoint to remove an item from the shopping cart.
// Will use app.delete to listen for an HTTP DELETE request.
  app.put('/cart/delete', (req, res) => {
    console.log("hej")
    fs.readFile(CART_DATA_FILE, (err, data) => {
      let cartProducts = JSON.parse(data);
      cartProducts.map((cartProduct) => {
        console.log("hej2");
        console.log(cartProduct.id,
          req.body.id,
          cartProduct.quantity);
          console.log(req.body);           // Felsökning underway - Gissning: HTTP Request Delete cant target body?. Ändrat till Put. Fungerar. Post throwar errors. Återkommer.
        if (cartProduct.id === req.body.id && cartProduct.quantity > 1) {
          console.log("before")
          console.log(cartProduct.quantity);
          cartProduct.quantity--;
          console.log("after")
          console.log(cartProduct.quantity);
        } else if (cartProduct.id === req.body.id && cartProduct.quantity === 1) {
          console.log("elseIF");
          const cartIndexToRemove = cartProducts.findIndex(cartProduct => cartProduct.id === req.body.id);
          cartProducts.splice(cartIndexToRemove, 1);
        }
      });
      fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(cartProducts);
      });
    });
  });

// API endpoint to remove all items from the shopping cart. This will also listen for a DELETE request. 
  app.delete('/cart/delete/all', (req, res) => {
    fs.readFile(CART_DATA_FILE, () => {
      let emptyCart = [];
      fs.writeFile(CART_DATA_FILE, JSON.stringify(emptyCart, null, 4), () => {
        res.json(emptyCart);
      });
    });
  });

// API endpoint to retrieve all the products from the product storage.
//Code uses the file system’s native readFile method to fetch all the data in the server-product-data.json file
//- and returns them in JSON format.
  app.get('/products', (req, res) => {
    fs.readFile(PRODUCT_DATA_FILE, (err, data) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(JSON.parse(data));
    });
  });


// API endpoint to retrieve all the items from the cart storage.
// code uses the file system’s native readFile method to fetch all the data in the server-cart-data.json file
//- and returns them in JSON format.
app.get('/cart', (req, res) => {
    fs.readFile(CART_DATA_FILE, (err, data) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(JSON.parse(data));
    });
  });


  // Server listens on
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});