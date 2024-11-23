import App from "./App"
import ErrorPage from "./components/ErrorPage"

const routes = [
    {
        path: "/:city?",
        element: <App key="app" />,
        errorElement: <ErrorPage />,
    },
]

export default routes
