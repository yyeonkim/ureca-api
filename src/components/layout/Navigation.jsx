import styles from "@/styles/Navigation.module.css";
import { NavLink } from "react-router";

const defaultClassName = ({ isActive }) => (isActive ? styles.active : "");

function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink className={defaultClassName} to="/">
        날씨 정보 조회
      </NavLink>
      <NavLink className={defaultClassName} to="/camping">
        고캠핑 정보 조회
      </NavLink>
    </nav>
  );
}

export default Navigation;
