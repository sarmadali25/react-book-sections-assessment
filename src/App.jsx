import { Fragment } from "react/jsx-runtime";
//import renderApp from "./routes";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
