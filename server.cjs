// server.cjs
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products/:code', async (req, res) => {
  const productCode = req.params.code;

  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${productCode}.json`);
    const data = await response.json();

    if (response.ok && data.product) {
      res.json({
        name: data.product.product_name,
        image: data.product.image_url,
        description: data.product.ingredients_text
      });
    } else {
      res.status(response.status || 404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
