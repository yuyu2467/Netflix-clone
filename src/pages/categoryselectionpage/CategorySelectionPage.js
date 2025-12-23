import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles/CategorySelectionPage.module.css';
import categories from '../../data/categories';

const CategorySelectionPage = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleCategoryClick = (category) => {
        const isSelected = selectedCategories.includes(category);
        if (isSelected) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleSubmit = () => {
        if (selectedCategories.length < 3) {
            setError('Please select at least 3 categories.');
        } else {
            localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
            localStorage.setItem('hasCompletedOnboarding', 'true');
            history.push('/movies');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1>Choose Your Categories</h1>
                <p>Select at least 3 categories to personalize your experience.</p>
                <div className={styles.categories}>
                    {categories.map((category) => (
                        <div
                            key={category}
                            className={`${styles.category} ${selectedCategories.includes(category) ? styles.selected : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button onClick={handleSubmit} className={styles.button}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default CategorySelectionPage;