import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./style.scss"
import Home from "./pages/Home";
import {Post} from "./pages/Post";
import Profile from "./pages/Profile";

const router = createBrowserRouter([

  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path:"/post/:id",
    element:<Post />
  },
  {
    path:"/profile",
    element:<Profile />

  }
]);




function App() {
  
  return (
    <div className="app">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
