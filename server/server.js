const express = require('express');
const cors = require('cors');
const connectToDB = require('./connectToDB'); // Import the connection function
const productsData = require('./productsData.json'); // Import the JSON data

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017';
const dbName = 'productDB';

async function main() {
  const { client, db } = await connectToDB(uri, dbName);
  const collection = db.collection('products');

  // get products route
  app.get('/products', async (req, res) => {
    try {
      const products = await collection.find().toArray();

      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // get product by id route
  app.get('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await collection.findOne({ id: Number(id) });

      res.json(product);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  // get product reviews by id route
  app.get('/reviews/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await collection.findOne({ id: Number(id) });
      const reviews = await product?.reviews;

      res.json(reviews);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });

  // post product review by id route
  app.post('/reviews/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const newReview = req.body;

      // Find the product by its ID
      const product = await collection.findOne({ id: Number(id) });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Add the new review to the product's existing reviews
      product.reviews.push(newReview);

      // Update the product with the new reviews array
      const updatedProduct = await collection.findOneAndUpdate(
        { id: Number(id) },
        { $set: { reviews: product.reviews } },
        { returnOriginal: false } // return the updated product
      );

      res.json(updatedProduct.value); // Use `updatedProduct.value` to get the updated document
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add review' });
    }
  });

  // server listening to the port
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  // Gracefully close the MongoDB connection when the server is terminated
  process.on('SIGINT', () => {
    client.close().then(() => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
}

main().catch(console.error);
