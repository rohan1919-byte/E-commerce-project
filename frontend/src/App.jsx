import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import CheckOutAddress from "./pages/CheckoutAddress";
import CheckOut from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <>
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000, 
        }}
      />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/admin/products",
        element: <ProductList />,
      },
      {
        path: "/admin/products/create",
        element: <AddProduct />,
      },
      {
        path: "/admin/products/update/:id",
        element: <EditProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout-address",
        element: <CheckOutAddress />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path: "/order-success/:id",
        element: <OrderSuccess />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
