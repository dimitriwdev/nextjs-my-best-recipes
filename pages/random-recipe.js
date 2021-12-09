import Image from "next/image";
import imageLoader from "../imageLoader";
import styles from "../styles/randomRecipe.module.css";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

function RandomRecipe({ randomRecipe }) {
  const defaultRecipe = randomRecipe;
  const [generateRecipe, setGenerateRecipe] = useState(false);
  const [recipe, setRecipe] = useState(defaultRecipe);

  useEffect(() => {
    if (generateRecipe !== true) return;
    async function newRequest() {
      const res = await fetch(defaultEndPoint);
      const newData = await res.json();
      setRecipe(newData.meals[0]);
    }
    newRequest();
    setGenerateRecipe(false);
  }, [generateRecipe]);

  const instructions =
    recipe.strInstructions !== undefined
      ? recipe.strInstructions.split(".")
      : [];

  return (
    <Layout page={"recipe" + randomRecipe.idMeal}>
      <div className={styles.randomRecipeContainer}>
        <div className={styles.randomRecipeHeader}>
          <div className={styles.randomRecipeImage}>
            <Image
              loader={imageLoader}
              unoptimized
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              width="200px"
              className={styles.image}
              height="200px"
            />
          </div>
          <div className={styles.titleContainer}>
            <h1 className={styles.randomRecipeTitle}>{recipe.strMeal}</h1>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button
            type="button"
            className={styles.generateRecipe}
            onClick={() => setGenerateRecipe(true)}
          >
            Generate another recipe
          </button>
        </div>
        <div className={styles.randomRecipeDetails}>
          <div className={styles.ingredientList}>
            <ul className={styles.list}>
              <h3>Ingredients</h3>
              {recipe.strIngredient1 ? (
                <li>
                  {recipe.strIngredient1} : {recipe.strMeasure1}
                </li>
              ) : null}
              {recipe.strIngredient2 ? (
                <li>
                  {recipe.strIngredient2} : {recipe.strMeasure2}
                </li>
              ) : null}
              {recipe.strIngredient3 ? (
                <li>
                  {recipe.strIngredient3} : {recipe.strMeasure3}
                </li>
              ) : null}
              {recipe.strIngredient4 ? (
                <li>
                  {recipe.strIngredient4} : {recipe.strMeasure4}
                </li>
              ) : null}
              {recipe.strIngredient5 ? (
                <li>
                  {recipe.strIngredient5} : {recipe.strMeasure5}
                </li>
              ) : null}
              {recipe.strIngredient6 ? (
                <li>
                  {recipe.strIngredient6} : {recipe.strMeasure6}
                </li>
              ) : null}
              {recipe.strIngredient7 ? (
                <li>
                  {recipe.strIngredient7} : {recipe.strMeasure7}
                </li>
              ) : null}
              {recipe.strIngredient8 ? (
                <li>
                  {recipe.strIngredient8} : {recipe.strMeasure8}
                </li>
              ) : null}
              {recipe.strIngredient9 ? (
                <li>
                  {recipe.strIngredient9} : {recipe.strMeasure9}
                </li>
              ) : null}
              {recipe.strIngredient10 ? (
                <li>
                  {recipe.strIngredient10} : {recipe.strMeasure10}
                </li>
              ) : null}
            </ul>
            <ul className={styles.list}>
              {recipe.strIngredient11 ? (
                <li>
                  {recipe.strIngredient11} : {recipe.strMeasure11}
                </li>
              ) : null}
              {recipe.strIngredient12 ? (
                <li>
                  {recipe.strIngredient12} : {recipe.strMeasure12}
                </li>
              ) : null}
              {recipe.strIngredient13 ? (
                <li>
                  {recipe.strIngredient13} : {recipe.strMeasure13}
                </li>
              ) : null}
              {recipe.strIngredient14 ? (
                <li>
                  {recipe.strIngredient14} : {recipe.strMeasure14}
                </li>
              ) : null}
              {recipe.strIngredient15 ? (
                <li>
                  {recipe.strIngredient15} : {recipe.strMeasure15}
                </li>
              ) : null}
              {recipe.strIngredient16 ? (
                <li>
                  {recipe.strIngredient16} : {recipe.strMeasure16}
                </li>
              ) : null}
              {recipe.strIngredient17 ? (
                <li>
                  {recipe.strIngredient17} : {recipe.strMeasure17}
                </li>
              ) : null}
              {recipe.strIngredient18 ? (
                <li>
                  {recipe.strIngredient18} : {recipe.strMeasure18}
                </li>
              ) : null}
              {recipe.strIngredient19 ? (
                <li>
                  {recipe.strIngredient19} : {recipe.strMeasure19}
                </li>
              ) : null}
              {recipe.strIngredient20 ? (
                <li>
                  {recipe.strIngredient20} : {recipe.strMeasure20}
                </li>
              ) : null}
            </ul>
          </div>
          <ul className={styles.instructionsContainer}>
            <h3>Instructions</h3>
            {instructions.map((instruction, index) => {
              return instruction ? (
                <li key={index} className={styles.instructions}>
                  {"- " + instruction}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

const defaultEndPoint = "https://www.themealdb.com/api/json/v1/1/random.php";
export const getServerSideProps = async () => {
  const res = await fetch(defaultEndPoint);
  const result = await res.json();

  return {
    props: { randomRecipe: result.meals[0] },
  };
};

export default RandomRecipe;
