import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { nav, ctaLink } from "./PageNav.module.css";
function PageNav() {
  return (
    <div className={nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
