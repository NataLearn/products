import { Form, Field, FormikErrors, FormikTouched } from "formik";

export interface ProductFormValues {
  prodName: string;
  prodImage: string;
  prodDesc: string;
  prodCuisine: string;
  prodCalories: string;
  prodServings: string;
}

const cuisines = [
  { id: "1", type: "American" },
  { id: "2", type: "Asian" },
  { id: "3", type: "Italian" },
];

const cuisineOpts = cuisines.map((cuisine) => (
  <option key={cuisine.id} value={cuisine.type}>
    {cuisine.type}
  </option>
));

export const ProductForm = (props: {
  errors: FormikErrors<ProductFormValues>;
  touched: FormikTouched<ProductFormValues>;
}) => {
  const errors = props.errors;
  const touched = props.touched;

  return (
    <Form>
      <div className="form-field">
        <label htmlFor="prodImage">Image(URL):</label>
        <Field id="prodImage" name="prodImage" />
        {errors.prodImage && touched.prodImage ? (
          <div className="field-error">{errors.prodImage}</div>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="prodName">Name:</label>
        <Field id="prodName" name="prodName" />
        {errors.prodName && touched.prodName ? (
          <div className="field-error">{errors.prodName}</div>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="prodDesc">Description:</label>
        <Field id="prodDesc" name="prodDesc" component="textarea" />
        {errors.prodDesc && touched.prodDesc ? (
          <div className="field-error">{errors.prodDesc}</div>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="prodCuisine">Cuisine:</label>
        <Field id="prodCuisine" name="prodCuisine" component="select">
          <option value=""></option>
          {cuisineOpts}
        </Field>
        {errors.prodCuisine && touched.prodCuisine ? (
          <div className="field-error">{errors.prodCuisine}</div>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="prodCalories">Calories:</label>
        <Field id="prodCalories" name="prodCalories" />
        {errors.prodCalories && touched.prodCalories ? (
          <div className="field-error">{errors.prodCalories}</div>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="prodServings">Servings:</label>
        <Field id="prodServings" name="prodServings" />
        {errors.prodServings && touched.prodServings ? (
          <div className="field-error">{errors.prodServings}</div>
        ) : null}
      </div>

      <button type="submit">Save</button>
    </Form>
  );
};
