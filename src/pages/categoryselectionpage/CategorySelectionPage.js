import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import categories from '../../data/categories';
import styles from './styles/CategorySelectionPage.module.css';

function CategorySelectionPage({ onCategoriesSelected }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState('');

  const handleCategoryClick = (category) => {
    const isSelected = selectedCategories.find((c) => c.id === category.id);
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((c) => c.id !== category.id));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = () => {
    if (selectedCategories.length < 3) {
      setError('Please select at least 3 categories.');
      return;
    }
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    onCategoriesSelected();
  };

  return (
    <div className={styles.container}>
      <h2>Choose Your Favorite Categories</h2>
      <p>Select at least 3 categories to personalize your experience.</p>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${styles.category} ${
              selectedCategories.find((c) => c.id === category.id) ? styles.selected : ''
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </div>
        ))}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={handleSubmit} className={styles.submitButton}>
        Continue
      </button>
    </div>
  );
}

export default CategorySelectionPage;
