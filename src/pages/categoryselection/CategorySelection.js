import React, { useState } from "react";

const categories = [
  "Action",
  "Comedy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Drama",
  "Animation",
  "Documentary",
  "Trending",
  "Netflix Originals"
];

const CategorySelection = ({ onCategoriesSelected }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");

  const handleCategoryToggle = (category) => {
    setError("");
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = () => {
    if (selectedCategories.length < 3) {
      setError("Please select at least 3 categories.");
      return;
    }
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
    onCategoriesSelected();
  };

  return (
    <div>
      <h1>Select Your Favorite Categories</h1>
      <p>Choose at least 3 to get started.</p>
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryToggle(category)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedCategories.includes(category)
                ? "lightblue"
                : "white",
            }}
          >
            {category}
          </button>
        ))}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Continue
      </button>
    </div>
  );
};

export default CategorySelection;
