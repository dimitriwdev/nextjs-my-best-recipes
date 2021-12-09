import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Layout.module.css";
import imageLoader from "../imageLoader";

export default function Layout({ children, page }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{page}</title>
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.HeaderContent}>
            <div className={styles.logoHeader}>
              <Image
                loader={imageLoader}
                unoptimized
                src="/logo512.png"
                alt="logo"
                width="50"
                height="50"
              />
            </div>
            <h1 className={styles.titleHeader}>
              My <span className={styles.span}>best</span> recipes
            </h1>
          </a>
        </Link>
        <nav className={styles.nav}>
          <Link href="/">
            <a
              className={router.pathname === "/" ? styles.active : styles.link}
            >
              Home
            </a>
          </Link>
          <Link href="/categories">
            <a
              className={
                router.pathname === "/categories" ? styles.active : styles.link
              }
            >
              Categories
            </a>
          </Link>
          <Link href="/random-recipe">
            <a
              className={
                router.pathname === "/random-recipe"
                  ? styles.active
                  : styles.link
              }
            >
              Random Recipe
            </a>
          </Link>
        </nav>
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        Dimitri Devoille-<span className={styles.span}>2021</span> &copy;
      </footer>
    </div>
  );
}
