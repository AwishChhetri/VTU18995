const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser'); // Import body-parser

app.use(cors());
app.use(bodyParser.json()); // Add body-parser middleware

app.listen(8000, () => {
    console.log('Server running at port 8000');
});

app.post('/product', async (req, res) => {
    console.log(req.body)
    const cat = req.body.category;
   
    const API = `http://20.244.56.144/test/companies/FLP/categories/${cat}/products?top=10&minPrice=1&maxPrice=1000`;
    console.log(API)
    const params = {
        top: 10,
        minPrice: 1,
        maxPrice: 1000
    };
    const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE0NTQ5ODM4LCJpYXQiOjE3MTQ1NDk1MzgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijk4ZTAxOTc0LTdmMGMtNDE0Yi1iNjJmLTYyMThmMjBjN2FmNCIsInN1YiI6InZ0dTE4OTk1QHZlbHRlY2guZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiI5OGUwMTk3NC03ZjBjLTQxNGItYjYyZi02MjE4ZjIwYzdhZjQiLCJjbGllbnRTZWNyZXQiOiJjRUtOWFNaVFl4YWZaY3J1Iiwib3duZXJOYW1lIjoiQWJpc2ggQ2hoZXRyaSIsIm93bmVyRW1haWwiOiJ2dHUxODk5NUB2ZWx0ZWNoLmVkdS5pbiIsInJvbGxObyI6IjE4OTk1In0.cxsvUZAnwOmdZPRkcP867USOq9lC3vf_xFKTXj9eU4Q';
    const headers = {
        Authorization: `Bearer ${bearerToken}`
    };
    try {
        const result = await axios.get(API, { headers, params });
        console.log(result)
        res.json(result.data).status(200); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
