import React, { useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      try {
        console.log("User submitted:", input);
        // Make API call to 127.0.0.1/analyze?amazon_product_url=input
        const response = await fetch(`http://127.0.0.1:8000/analyze?amazon_product_url=${encodeURIComponent(input)}`)
        const data = await response.json();

        console.log("API response:", data);
        setMessage(data.analysis || JSON.stringify(data));
      } catch (error) {
        console.error("API error: ", error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search or paste product link..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        className="search-input"
      />
      {message && (
        <div className="api-message" style={{ marginTop: "1em"}}> 
          {message}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
