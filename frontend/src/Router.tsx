import { createBrowserRouter } from "react-router-dom";
import { Login } from "./app/login";

export const Router = createBrowserRouter([
   {
     path: "/",
     element: <div>Hello world!</div>,
   },
   {
    path: "/login",
    element:<Login/>,
  },
 ]);
