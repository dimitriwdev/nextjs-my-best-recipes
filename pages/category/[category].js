import Layout from "../../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Category.module.css";
import imageLoader from "../../imageLoader";

function Categories({ category }) {
  const router = useRouter();

  console.log(category);
  console.log(router.query.category);
  return (
    <Layout page={"Category" + router.query.category}>
      <Head>
        <title>{router.query.category}</title>
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <h3>All {router.query.category} recipes</h3>
        </div>
        <div className={styles.recipeList}>
          {category.map((recipe) => {
            const { strMeal, idMeal, strMealThumb } = recipe;
            return (
              <Link
                href="/recipe/[recipe]"
                as={`/recipe/${idMeal}`}
                key={idMeal}
              >
                <a className={styles.recipeCard}>
                  <h2 className={styles.recipeCardTitle}>{strMeal}</h2>
                  <Image
                    loader={imageLoader}
                    unoptimized
                    className={styles.recipeCardImage}
                    src={strMealThumb}
                    alt={strMeal}
                    width="200"
                    height="200"
                  />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  console.log("query: ", query);
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query.category}`
  );
  const results = await res.json();

  return {
    props: { category: results.meals },
  };
};

export default Categories;
