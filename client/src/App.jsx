import React from "react";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <div className="app-container">
      <h1>Sustainability Shopping Assistant</h1>
      <p>Paste an Amazon link or search a product to get sustainable suggestions.</p>
      <SearchBar />
    </div>
  );
};

export default App;
