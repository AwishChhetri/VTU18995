const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;


  

// // GET /companies/:companyName/categories/:categoryName/products/:productType
app.get('/companies/:companyName/categories/:categoryName/products/:productType', async (req, res) => {
    try {
      const { companyName, categoryName, productType } = req.params;
      const { top, minPrice, maxPrice } = req.query;
      const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE0NTQ1ODAxLCJpYXQiOjE3MTQ1NDU1MDEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijk4ZTAxOTc0LTdmMGMtNDE0Yi1iNjJmLTYyMThmMjBjN2FmNCIsInN1YiI6InZ0dTE4OTk1QHZlbHRlY2guZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiI5OGUwMTk3NC03ZjBjLTQxNGItYjYyZi02MjE4ZjIwYzdhZjQiLCJjbGllbnRTZWNyZXQiOiJjRUtOWFNaVFl4YWZaY3J1Iiwib3duZXJOYW1lIjoiQWJpc2ggQ2hoZXRyaSIsIm93bmVyRW1haWwiOiJ2dHUxODk5NUB2ZWx0ZWNoLmVkdS5pbiIsInJvbGxObyI6IjE4OTk1In0.BV_FX8EbCllcfzkymC83efVD6l8TyFVVYxOpHvbgGDc';
  
      // Constructing headers with the bearer token
      const headers = {
        'Authorization': `Bearer ${bearerToken}`
      };
  
      const response = await axios.get(`http://20.244.56.144/test/companies/${companyName}/categories/${categoryName}/products/${productType}`, {
        params: {
          top,
          minPrice,
          maxPrice
        },
        headers: headers 
      });
  
      res.json(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
