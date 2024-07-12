const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMealByName = async (name) => {
  const response = await fetch(`${API_BASE_URL}/search.php?s=${name}`);
  const data = await response.json();
  return data.meals;
};

export const getRandomMeal = async () => {
  const response = await fetch(`${API_BASE_URL}/random.php`);
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
};
