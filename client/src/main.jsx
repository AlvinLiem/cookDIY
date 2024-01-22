import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import OrderPage from "./pages/OrderPage.jsx";

function authentication() {
  const access_token = localStorage.access_token;
  if (!access_token) {
    throw redirect(`/login`);
  }
  return null;
}

function authLogin() {
  const access_token = localStorage.access_token;
  if (access_token) {
    throw redirect(`/`);
  }
  return null;
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: `/`,
        element: <HomePage />,
      },
      {
        path: `/meals/:id`,
        element: <DetailPage />,
        loader: authentication,
      },
      {
        path: `/register`,
        element: <RegisterPage />,
        loader: authLogin,
      },
      {
        path: `/login`,
        element: <LoginPage />,
        loader: authLogin,
      },
      {
        path: `/profile`,
        element: <ProfilePage />,
        loader: authentication,
      },
      {
        path: `/orders`,
        element: <OrderPage />,
        loader: authentication,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
