import { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const fetchData = async (searchItem) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(searchItem.toLowerCase())
      );
      setProducts(filteredData);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    setQuery(userInput);
    if (userInput.length >= 3) {
      fetchData(userInput);
    } else {
      setProducts([]);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <input
        type="text"
        placeholder="search item"
        value={query}
        onChange={handleChange}
      />

      {error && <p>{error}</p>}

      {products.map((item) => (
        <div key={item.id}>
          <h3> {item.title} </h3>
        </div>
      ))}
    </div>
  );
};

export default Products;
