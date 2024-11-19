import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./app/routes/root";
import { ProductsList } from "./components/products/ProductsList";
import { ProductPage } from "./components/products/ProductPage";
import { EditProductForm } from "./components/products/EditProductForm";
import { AddProductForm } from "./components/products/AddProductForm";
import Index from "./app/routes";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "/products",
        element: <ProductsList />,
      },
      {
        path: "/products/:productId",
        element: <ProductPage />,
      },
      {
        path: "/create-product",
        element: <AddProductForm />,
      },
      {
        path: "/edit-product/:productId",
        element: <EditProductForm />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
