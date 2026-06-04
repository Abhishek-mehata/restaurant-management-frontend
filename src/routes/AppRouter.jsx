import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        errorElement: <div>404 Not Found</div>
    }
])

export default router;
