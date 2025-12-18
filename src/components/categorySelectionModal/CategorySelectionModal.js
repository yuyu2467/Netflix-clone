import React, { useState } from "react";
import styles from "./CategorySelectionModal.module.css";

const categories = [
  "Action",
  "Horror",
  "Comedy",
  "Top Rated",
  "Netflix Originals",
  "Romance",
  "Trending",
  "Documentaries",
];

const CategorySelectionModal = ({ onCategoriesSelected }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = () => {
    if (selectedCategories.length >= 3) {
      localStorage.setItem(
        "selectedCategories",
        JSON.stringify(selectedCategories)
      );
      localStorage.setItem("categoriesSelected", "true");
      onCategoriesSelected(true);
    } else {
      setError("Please select at least 3 categories.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Select Your Favorite Categories</h2>
        <p>Choose at least 3 categories to personalize your experience.</p>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.categories}>
          {categories.map((category) => (
            <div
              key={category}
              className={`${styles.category} ${
                selectedCategories.includes(category) ? styles.selected : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className={styles.button}
          disabled={selectedCategories.length < 3}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CategorySelectionModal;
