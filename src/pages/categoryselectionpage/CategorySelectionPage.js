import React, { useState } from 'react';
import styles from './styles/CategorySelectionPage.module.css';
import { categories } from '../../data/categories';

const CategorySelectionPage = ({ onCategoriesSelected }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState('');

  const handleCategoryClick = (category) => {
    const isSelected = selectedCategories.find(c => c.type === category.type);
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter(c => c.type !== category.type));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = () => {
    if (selectedCategories.length >= 3) {
      setError('');
      localStorage.setItem('categoriesSelected', 'true');
      localStorage.setItem('userCategories', JSON.stringify(selectedCategories));
      onCategoriesSelected();
    } else {
      setError('Please select at least 3 categories.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.selection}>
        <h2>Choose Your Favorite Categories</h2>
        <p>Select at least 3 categories to personalize your experience.</p>
        <div className={styles.grid}>
          {categories.map((category) => (
            <div
              key={category.type}
              className={`${styles.card} ${selectedCategories.find(c => c.type === category.type) ? styles.selected : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </div>
          ))}
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleSubmit} className={styles.button}>Continue</button>
      </div>
    </div>
  );
};

export default CategorySelectionPage;
