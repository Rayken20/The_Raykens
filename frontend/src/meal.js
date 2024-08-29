import React, { useState, useEffect } from 'react';
import { searchMealByName, getRandomMeal } from './mealApi';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div 
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: 'calc(100vh - 70px)', paddingTop: '70px' }}
    >
      <h2 className="text-center mb-4">Search Meal By Name</h2>
      <div className="row justify-content-center mb-4 w-100">
        <div className="col-md-6">
          <input 
            type="text" 
            value={mealName} 
            onChange={(e) => setMealName(e.target.value)} 
            placeholder="Enter meal name" 
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <button 
            onClick={handleSearch} 
            className="btn btn-primary btn-block"
          >
            Search
          </button>
        </div>
      </div>

      <div className="row justify-content-center w-100">
        {meals.map(meal => (
          <div key={meal.idMeal} className="col-md-4 mb-4">
            <div className="card h-100">
              <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal} 
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{meal.strMeal}</h5>
                <p className="card-text">{meal.strInstructions}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-center mt-5 mb-4">Random Meal</h2>
      {randomMeal && (
        <div className="row justify-content-center w-100">
          <div className="col-md-6">
            <div className="card">
              <img 
                src={randomMeal.strMealThumb} 
                alt={randomMeal.strMeal} 
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{randomMeal.strMeal}</h5>
                <p className="card-text">{randomMeal.strInstructions}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meal;
