import styles from "@/styles/Layout.module.css";
import { Outlet } from "react-router";
import Navigation from "./Navigation.jsx";

function Layout() {
  return (
    <>
      <header className={styles.header}>
        <Navigation />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
