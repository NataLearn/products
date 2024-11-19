import { favoritesClicked } from "../slices/productsSlice";
import { useAppDispatch } from "../app/hooks";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <nav>
      <NavLink
        className="menu-text"
        to="/products"
        end
        onClick={() => dispatch(favoritesClicked({ favor: false }))}
      >
        All
      </NavLink>
      <NavLink
        className="menu-text"
        to="/products"
        onClick={() => dispatch(favoritesClicked({ favor: true }))}
      >
        Favorites
      </NavLink>
      <NavLink className="menu-text" to="/create-product">
        Add Recipe
      </NavLink>
    </nav>
  );
};
