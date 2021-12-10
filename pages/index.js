import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import imageLoader from "../imageLoader";

const Home = ({ recipes }) => {
  const { defaultMeals = [] } = recipes;
  const [newRecipes, setNewRecipes] = useState(defaultMeals);
  const [input, setInput] = useState("");
  const [endPoint, setEndPoint] = useState({
    current: defaultEndPoint,
  });

  useEffect(() => {
    async function request() {
      const res = await fetch(endPoint.current);
      const newData = await res.json();
      setNewRecipes(newData.meals);
    }
    request();
  }, [endPoint.current]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input === "") return;

    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    setEndPoint({
      current: endpoint,
    });
    setInput("");
  };

  function handleReset() {
    setEndPoint({
      current: defaultEndPoint,
    });
  }

  return (
    <Layout page="/" className={styles.layout}>
      <Head>
        <title>My Best Recipes</title>
        <meta name="description" content="recipe app created with next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Image
              loader={imageLoader}
              unoptimized
              src="/logo512.png"
              alt="logo"
              width="100"
              height="100"
            />
            <input
              type="text"
              className={styles.formInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.formButton}>
                Search for a recipe
              </button>
              <button
                type="button"
                onClick={handleReset}
                className={styles.resetButton}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className={styles.mainContent}>
          {newRecipes ? (
            newRecipes.map((newRecipe) => {
              const { strMeal, idMeal, strMealThumb } = newRecipe;
              return (
                <Link
                  href="/recipe/[recipe]"
                  as={`/recipe/${idMeal}`}
                  key={idMeal}
                >
                  <a className={styles.card}>
                    <h2 className={styles.cardTitle}>{strMeal}</h2>
                    <Image
                      loader={imageLoader}
                      unoptimized
                      className={styles.cardImage}
                      src={strMealThumb}
                      alt={strMeal}
                      width="200"
                      height="200"
                    />
                  </a>
                </Link>
              );
            })
          ) : (
            <h2 className={styles.errorMessage}>Sorry no recipe found</h2>
          )}
        </div>
      </div>
    </Layout>
  );
};

const defaultEndPoint = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

export async function getServerSideProps() {
  try {
    const res = await fetch(defaultEndPoint);
    const meals = await res.json();

    return {
      props: {
        recipes: meals,
      },
    };
  } catch (err) {
    console.log(err.message);
  }
}

export default Home;
