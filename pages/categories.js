import Layout from "../components/Layout";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Categories.module.css";

function Categories({ data }) {
  return (
    <Layout page="/categories">
      <Head>
        <title>Categories</title>
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Categories</h2>
        </div>
        <div className={styles.categoriesList}>
          {data.categories.map((category) => {
            const { strCategory, idCategory, strCategoryThumb } = category;
            return (
              <Link
                href="/category/[category]"
                as={`/category/${strCategory}`}
                key={idCategory}
              >
                <a className={styles.categoryCard}>
                  <img
                    src={strCategoryThumb}
                    alt={strCategory}
                    className={styles.categoryCardImage}
                  />
                  <h3 className={styles.categoryCardTitle}>{strCategory}</h3>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Categories;
