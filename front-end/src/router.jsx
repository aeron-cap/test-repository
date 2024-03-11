import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import ResourcesPage from "./pages/ResourcePage/index";
import ProjectsPage from "./pages/ProjectsPage";
import CompaniesPage from "./pages/CompanyPage";
import ViewResource from "./pages/ViewResource";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "resources", element: <ResourcesPage /> },
      { path: "resources/:id", element: <ViewResource /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "companies", element: <CompaniesPage /> },
      { path: "404", element: <ErrorPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

const router = createBrowserRouter(routes);
export default router;
