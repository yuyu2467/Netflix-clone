import React, { useState } from 'react';
import categories from '../../data/categories';
import styles from './Onboarding.module.css';

const AgeVerification = ({ onAgeVerified }) => {
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ageNum = parseInt(age, 10);

    if (isNaN(ageNum) || ageNum <= 0) {
      setError('Please enter a valid age.');
      return;
    }

    if (ageNum < 18) {
      setShowDisclaimer(true);
      localStorage.setItem('ageRestriction', JSON.stringify({ isMinor: true, startTime: new Date().getTime() }));
    } else {
      localStorage.setItem('ageRestriction', JSON.stringify({ isMinor: false }));
    }

    localStorage.setItem('ageIsVerified', 'true');

    if (ageNum < 18) {
        setTimeout(() => {
            onAgeVerified(true);
        }, 4000);
    } else {
        onAgeVerified(true);
    }
  };

  if (showDisclaimer) {
    return (
      <div className={styles.container}>
        <h2>Disclaimer</h2>
        <p>Your age is below 18, so you'll be using this site as a minor. The site will be closed automatically in under 30 minutes.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Age Verification</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={handleAgeChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

const CategorySelection = ({ onCategoriesSelected }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState('');

  const handleCategoryClick = (category) => {
    const isSelected = selectedCategories.includes(category);
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setError('');
  };

  const handleFinish = () => {
    if (selectedCategories.length < 3) {
      setError('Please select at least 3 categories.');
      return;
    }
    localStorage.setItem('categoriesAreSelected', 'true');
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    onCategoriesSelected();
  };

  return (
    <div className={styles.container}>
      <h2>Category Selection</h2>
      <p>Please select at least 3 categories.</p>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={styles.categoryButton}
            style={{
              backgroundColor: selectedCategories.includes(category) ? '#f0ad4e' : '#fff',
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <button onClick={handleFinish} className={styles.button}>Finish</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

function Onboarding({ onOnboardingComplete }) {
  const [step, setStep] = useState('ageVerification');

  const handleAgeVerified = (isVerified) => {
    if (isVerified) {
      setStep('categorySelection');
    }
  };

  const handleCategoriesSelected = () => {
    onOnboardingComplete();
  };

  return (
    <div className={styles.onboardingContainer}>
      {step === 'ageVerification' && <AgeVerification onAgeVerified={handleAgeVerified} />}
      {step === 'categorySelection' && <CategorySelection onCategoriesSelected={handleCategoriesSelected} />}
    </div>
  );
}

export default Onboarding;