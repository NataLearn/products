import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectAllProducts,
  productDeleted,
  fetchProducts,
  selectProductsStatus,
  selectFavorStatus,
  selectProductsError,
  Product,
} from "../../slices/productsSlice";
import { ReactionButtons } from "../ReactionButtons";

import { useEffect } from "react";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div key={product.id} className="product-excerpt">
      <button
        type="button"
        className="del-btn"
        onClick={() => dispatch(productDeleted({ productId: product.id }))}
      >
        ❌
      </button>
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-card">
          <img className="product-img" src={product.image} />
          <div className="product-text">
            <h3>{product.name}</h3>
            <hr className="text-sep" />
            <p className="product-feat">Causine: {product.cuisine}</p>
            <p className="product-feat">Calories: {product.calories}</p>
            <p className="product-feat">Servings: {product.servings}</p>
          </div>
        </div>
      </Link>
      <ReactionButtons product={product} />
    </div>
  );
}

export const ProductsList = () => {
  let products = useAppSelector(selectAllProducts);
  const favorStatus = useAppSelector(selectFavorStatus);

  if (favorStatus)
    products = products.filter((product) => product.reactions.heart === true);

  const productStatus = useAppSelector(selectProductsStatus);

  const error = useAppSelector(selectProductsError);
  let content;

  const dispatch = useAppDispatch();

  if (productStatus === "pending") {
    content = <h2 style={{ opacity: "0.5" }}>Recipes loading ...</h2>;
  } else if (productStatus === "succeeded") {
    content = products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  } else if (productStatus === "failed") {
    content = products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  }

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  return (
    <>
      <h2>{favorStatus && "Favorite "}Recipes</h2>
      {productStatus === "failed" && <h3>Server: {error}</h3>}
      <div className="products-list">{content}</div>
    </>
  );
};
