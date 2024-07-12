import React, { useState, useEffect } from 'react';
import { searchMealByName, getRandomMeal } from './mealApi';

const Meal = () => {
  const [mealName, setMealName] = useState('');
  const [meals, setMeals] = useState([]);
  const [randomMeal, setRandomMeal] = useState(null);

  // Search meal by name
  const handleSearch = async () => {
    const results = await searchMealByName(mealName);
    setMeals(results || []);
  };

  // Get a random meal
  useEffect(() => {
    const fetchRandomMeal = async () => {
      const result = await getRandomMeal();
      setRandomMeal(result || null);
    };

    fetchRandomMeal();
  }, []);

  return (
    <div>
      <h2>Search Meal By Name</h2>
      <input 
        type="text" 
        value={mealName} 
        onChange={(e) => setMealName(e.target.value)} 
        placeholder="Enter meal name" 
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {meals.map(meal => (
          <div key={meal.idMeal}>
            <h3>{meal.strMeal}</h3>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>{meal.strInstructions}</p>
          </div>
        ))}
      </div>

      <h2>Random Meal</h2>
      {randomMeal && (
        <div>
          <h3>{randomMeal.strMeal}</h3>
          <img src={randomMeal.strMealThumb} alt={randomMeal.strMeal} />
          <p>{randomMeal.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default Meal;
