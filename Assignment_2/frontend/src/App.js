import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, Center, Spinner, Heading, Flex, Select } from '@chakra-ui/react';
//Product Card
const ProductCard = ({ productName, price, rating, discount, availability }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4} p={4}>
      <Text fontSize="xl" fontWeight="semibold">{productName}</Text>
      <Text fontSize="lg" mt={2}>Price: ${price}</Text>
      <Text fontSize="md">Rating: {rating}</Text>
      <Text fontSize="md">Discount: {discount}%</Text>
      <Text fontSize="md">Availability: {availability ? 'Available' : 'Out of stock'}</Text>
    </Box>
  );
}

const App = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  //Get the data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:8000/product`, { category });
      setProducts(res.data); 
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <Center minH="100vh">
      <Box maxW="600px" w="100%" p={4}>
        <Flex direction="column" align="center" justify="center" mb={8}>
          <Heading as="h1" size="2xl">E-Commerce Store</Heading>
          <Text fontSize="lg" mt={2}>Check out our latest products!</Text>
        </Flex>
        <Flex mb={4} justify="space-between" align="center">
          <Text fontSize="lg">Select Product Category:</Text>
          <Select value={category} onChange={handleCategoryChange} w="50%">
            <option value="TV">TV</option>
            <option value="Laptop">Laptop</option>
            <option value="Computer">Computer</option>
            <option value="TV">TV</option>
            <option value="Earphone">Earphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Charger">Charger</option>
          </Select>
        </Flex>
        {loading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
          products.length ? (
            products.map((product, index) => (
              <ProductCard
                key={index}
                productName={product.productName}
                price={product.price}
                rating={product.rating}
                discount={product.discount}
                availability={product.availability}
              />
            ))
          ) : (
            <Text>No products available in the selected category</Text>
          )
        )}
      </Box>
    </Center>
  );
}

export default App;
