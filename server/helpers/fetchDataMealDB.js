const { default: axios } = require("axios");

async function getAllCategories() {
  try {
    const { data } = await axios({
      method: "get",
      url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    });
    const result = data.categories.map((el) => {
      return el.strCategory;
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getMenuByCategory(category) {
  try {
    const { data } = await axios({
      method: "get",
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    });
    return data.meals;
  } catch (error) {
    console.log(error);
  }
}

async function getAllMenus(index) {
  try {
    const categories = await getAllCategories();
    const data = await getMenuByCategory(categories[index]);
    data.map((el) => {
      el.CategoryId = 1;
      return el;
    });
    const result = [...data];
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function allMenusId(index) {
  try {
    const menus = await getAllMenus(index);
    const id = menus.map((el) => {
      return el.idMeal;
    });
    return id;
  } catch (error) {
    console.log(error);
  }
}

async function allMenusDetail(index) {
  try {
    const id = await allMenusId(index);
    const detail = Promise.all(
      id.map(async (el) => {
        const { data } = await axios({
          method: "get",
          url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el}`,
        });
        return data.meals;
      })
    );
    return detail;
  } catch (error) {
    console.log(error);
  }
}

async function formatData(index) {
  try {
    const menus = await allMenusDetail(index);
    let result = [];
    menus.map((el) => {
      let ingredientRaw = [
        el[0].strMeasure1 + " " + el[0].strIngredient1,
        el[0].strMeasure2 + " " + el[0].strIngredient2,
        el[0].strMeasure3 + " " + el[0].strIngredient3,
        el[0].strMeasure4 + " " + el[0].strIngredient4,
        el[0].strMeasure5 + " " + el[0].strIngredient5,
        el[0].strMeasure6 + " " + el[0].strIngredient6,
        el[0].strMeasure7 + " " + el[0].strIngredient7,
        el[0].strMeasure8 + " " + el[0].strIngredient8,
        el[0].strMeasure9 + " " + el[0].strIngredient9,
        el[0].strMeasure10 + " " + el[0].strIngredient10,
        el[0].strMeasure11 + " " + el[0].strIngredient11,
        el[0].strMeasure12 + " " + el[0].strIngredient12,
        el[0].strMeasure13 + " " + el[0].strIngredient13,
        el[0].strMeasure14 + " " + el[0].strIngredient14,
        el[0].strMeasure15 + " " + el[0].strIngredient15,
        el[0].strMeasure16 + " " + el[0].strIngredient16,
        el[0].strMeasure17 + " " + el[0].strIngredient17,
        el[0].strMeasure18 + " " + el[0].strIngredient18,
        el[0].strMeasure19 + " " + el[0].strIngredient19,
        el[0].strMeasure20 + " " + el[0].strIngredient20,
      ];
      let ingredient = ingredientRaw.filter((el) => {
        if (el.length > 2) {
          if (!el.includes("null")) {
            return el;
          }
        }
      });
      el[0].ingredient = ingredient.join(", ");
      delete el[0].strMeasure1;
      delete el[0].strMeasure2;
      delete el[0].strMeasure3;
      delete el[0].strMeasure4;
      delete el[0].strMeasure5;
      delete el[0].strMeasure6;
      delete el[0].strMeasure7;
      delete el[0].strMeasure8;
      delete el[0].strMeasure9;
      delete el[0].strMeasure10;
      delete el[0].strMeasure11;
      delete el[0].strMeasure12;
      delete el[0].strMeasure13;
      delete el[0].strMeasure14;
      delete el[0].strMeasure15;
      delete el[0].strMeasure16;
      delete el[0].strMeasure17;
      delete el[0].strMeasure18;
      delete el[0].strMeasure19;
      delete el[0].strMeasure20;
      delete el[0].strIngredient1;
      delete el[0].strIngredient2;
      delete el[0].strIngredient3;
      delete el[0].strIngredient4;
      delete el[0].strIngredient5;
      delete el[0].strIngredient6;
      delete el[0].strIngredient7;
      delete el[0].strIngredient8;
      delete el[0].strIngredient9;
      delete el[0].strIngredient10;
      delete el[0].strIngredient11;
      delete el[0].strIngredient12;
      delete el[0].strIngredient13;
      delete el[0].strIngredient14;
      delete el[0].strIngredient15;
      delete el[0].strIngredient16;
      delete el[0].strIngredient17;
      delete el[0].strIngredient18;
      delete el[0].strIngredient19;
      delete el[0].strIngredient20;

      delete el[0].dateModified;
      delete el[0].strCreativeCommonsConfirmed;
      delete el[0].strImageSource;
      delete el[0].strSource;
      delete el[0].strTags;
      delete el[0].strDrinkAlternate;

      result.push(el[0]);
      return el[0];
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = formatData;
