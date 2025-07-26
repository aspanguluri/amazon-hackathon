import React, { useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Placeholder: Replace with actual search handler
      console.log("User submitted:", input);
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
