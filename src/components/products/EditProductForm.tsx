import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { productUpdated, selectProductById } from "../../slices/productsSlice";

import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ProductForm, ProductFormValues } from "./ProductForm";

const ProductSchema = Yup.object().shape({
  prodName: Yup.string()
    .min(3, "Type 3-27 symbols")
    .max(27, "Type 3-27 symbols")
    .required("Required!"),
  prodImage: Yup.string().url("Invalid url").required("Required"),
  prodDesc: Yup.string().min(10, "Type >10 symbols").required("Required!"),
  prodCuisine: Yup.string().required("Required! Select from list!"),
  prodCalories: Yup.number().min(10, "Type >9 calories").required("Required!"),
  prodServings: Yup.number()
    .min(1, "Should be > 0")
    .max(100, "Type <= 100")
    .required("Required!"),
});

export const EditProductForm = () => {
  let params = useParams();
  const { productId } = params;

  const product = useAppSelector((state) =>
    selectProductById(state, productId!)
  );

  if (!product) {
    return <p>No such recipe</p>;
  }

  const initialValues: ProductFormValues = {
    prodName: product.name,
    prodImage: product.image,
    prodDesc: product.desc,
    prodCuisine: product.cuisine,
    prodCalories: product.calories,
    prodServings: product.servings,
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="form">
      <h2>Edit Recipe</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={ProductSchema}
        onSubmit={async (
          values: ProductFormValues,
          { setSubmitting }: FormikHelpers<ProductFormValues>
        ) => {
          const origName = values.prodName.trim();

          const name = origName[0].toUpperCase() + origName.slice(1);
          const image = values.prodImage;
          const desc = values.prodDesc;
          const cuisine = values.prodCuisine;
          const calories = values.prodCalories;
          const servings = values.prodServings;

          if (image && name && desc && cuisine && calories) {
            dispatch(
              productUpdated({
                id: product.id,
                image,
                name,
                desc,
                cuisine,
                calories,
                servings,
                reactions: product.reactions,
              })
            );
            navigate(`/products/${productId}`);
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <ProductForm errors={errors} touched={touched} />
        )}
      </Formik>
    </div>
  );
};
