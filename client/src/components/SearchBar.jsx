import React, { useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      setMessage("");
      try {
        console.log("User submitted:", input);
        const response = await fetch(`http://127.0.0.1:8000/analyze?amazon_product_url=${encodeURIComponent(input)}`)
        const data = await response.json();

        console.log("API response:", data);
        setMessage(data.analysis || data.message || JSON.stringify(data));
      } catch (error) {
        console.error("API error: ", error);
      } finally {
        setLoading(false);
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
      {loading && (
        <div style={{ marginTop: "1em" }}>
          <span className="loader" />
        </div>
      )}
      {message && !loading && (
        <div
          className="api-message" 
          dangerouslySetInnerHTML={{ __html: message.substring(7, message.length - 4) }}
        /> 
      )}
      <style>
        {`
        .loader {
          display: inline-block;
          width: 32px;
          height: 32px;
          border: 4px solid #bfc8e6;
          border-top: 4px solid #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        `}
      </style>
    </div>
  );
};

export default SearchBar;
