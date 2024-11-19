import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { favoritesClicked, productAdded } from "../../slices/productsSlice";

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
    .max(100, "Type <= 100>")
    .required("Required!"),
});

export const AddProductForm = () => {
  const initialValues: ProductFormValues = {
    prodName: "",
    prodImage:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
    prodDesc: "",
    prodCuisine: "",
    prodCalories: "",
    prodServings: "",
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="form">
      <h2>Add Recipe</h2>
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

          dispatch(
            productAdded(name, image, desc, cuisine, calories, servings)
          );
          dispatch(favoritesClicked({ favor: false }));
          navigate(`/products`);
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
