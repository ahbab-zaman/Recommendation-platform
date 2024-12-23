import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Layouts/Home/Home";
import AllQueries from "../Layouts/AllQueries/AllQueries";
import MyQueries from "../Layouts/MyQueries/MyQueries";
import Recommendations from "../Layouts/Recommendations/Recommendations";
import MyRecommendations from "../Layouts/MyRecommendations/MyRecommendations";
import AddQuery from "../Layouts/AddQuery/AddQuery";

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/queries",
                element:<AllQueries></AllQueries>
            },
            {
                path:"/myQueries",
                element:<MyQueries></MyQueries>
            },
            {
                path:"/recommendation",
                element:<Recommendations></Recommendations>
            },
            {
                path:"/myRecommendation",
                element:<MyRecommendations></MyRecommendations>
            },
            {
                path:"/addQuery",
                element:<AddQuery></AddQuery>
            }
        ]
    }
])

export default router;