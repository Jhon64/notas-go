import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./app/login";
import { localStorageHelper } from "./helpers/localstorage.helper";
import { AppLayout } from "./layouts/app-layout";
import { AuthGuard } from "./validaciones/guard-auth";
import { Task } from "./app/tasks";
import { Users } from "./app/users";

const layoutRouter: RouteObject[] = [
  {
    element: <AppLayout />,
    path: "/",
    children: [
      {
        index: true,
        element:<Task/>,
      },
      {
        path:'/tareas',
        element:<Task/>,
      },
      {
        path:'/usuarios',
        element:<Users/>,
      },
      {
        path:'/perfil',
        element:<Users/>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  }
]


export const Router = () => {
  window.token = localStorageHelper.getItemString("token") || ''
  window.expiredToken = Number.parseInt(localStorageHelper.getItemString("expireToken") || '0')
  window.usuarioID = Number.parseInt(localStorageHelper.getItemString("usuarioID") || '0')
  window.username =localStorageHelper.getItemString("username") || ''

  const validToken = AuthGuard.validToken()
  if (validToken) {
    const router = createBrowserRouter(layoutRouter);
    return <RouterProvider router={router} />
  } else {
    localStorageHelper.deleteItems(["token","expireToken","user_info"])
    window.token = ""
    window.expiredToken = 0
    return <Login />
  }
}
