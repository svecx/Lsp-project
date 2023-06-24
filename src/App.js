import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/LoginRegister";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";
import Dashboard from "./pages/Dashboard";
import SinglePage from "./pages/SinglePage";
import AddArticle from "./components/AddArticle";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/masuk",
        element: <Login />,
      },
      {
        path: "/tambah",
        element: <AddArticle />,
      },
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/post/:postId",
        element: <SinglePage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
