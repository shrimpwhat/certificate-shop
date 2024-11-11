import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import SelectPage from "./pages/SelectPage";
import FormPage from "./pages/FormPage";
import PaymentPage from "./pages/PaymentPage";

export const formAction = () => {
  return redirect("/payment");
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <SelectPage /> },
      {
        path: "/form",
        element: <FormPage />,
        action: formAction,
      },
    ],
  },
  { path: "/payment", element: <PaymentPage /> },
]);

export default router;
