import React, { useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      try {
        console.log("User submitted:", input);
        // Make API call to 127.0.0.1/analyze?amazon_product_url=input
        const response = await fetch(`http://127.0.0.1:8000/analyze?amazon_product_url=${encodeURIComponent(input)}`)

        console.log("API response:", response);
      } catch (error) {
        console.error("API error:", error);
      }
    }
  };

  return (
    <input
      type="text"
      placeholder="Search or paste product link..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyPress}
      className="search-input"
    />
  );
};

export default SearchBar;
