import { Provider } from "react-redux";
import store from "./store";
import Stepper from "./components/Stepper";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <h1 className="title">Купить сертификат в подарок</h1>
      <Stepper />
      <Outlet />
    </Provider>
  );
}

export default App;
