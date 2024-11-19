import { useAppSelector } from "../../app/hooks";
import { Link, useParams } from "react-router-dom";
import { selectProductById } from "../../slices/productsSlice";
import { ReactionButtons } from "../ReactionButtons";

export const ProductPage = () => {
  const { productId } = useParams();

  const product = useAppSelector((state) =>
    selectProductById(state, productId!)
  );

  if (!product) {
    return <h2>No such recipe</h2>;
  }

  return (
    <div className="product-page">
      <div className="product-header">
        <h2>{product.name}</h2>
        <div className="product-inst">
          <ReactionButtons product={product} />
          <Link to={`/edit-product/${product.id}`} className="link-edit">
            ✏️
          </Link>
        </div>
      </div>
      <img className="product-img" src={product.image} />
      <div className="product-feats">
        <p>
          <b>Cuisine:</b> {product.cuisine}, <b>Calories</b>: {product.calories}
          , <b>Servings:</b> {product.servings}
        </p>
      </div>
      <p className="product-feat product-desc">Description: {product.desc}</p>
      <div className="product-footer">
        <Link to="/products" className="menu-text">
          ... to Recipes
        </Link>
      </div>
    </div>
  );
};
