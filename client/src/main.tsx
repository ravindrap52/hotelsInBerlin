import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

import App from "./App";
import { getAllHotels } from "./features/hotels/hotelsSlice";

// fetching all hotels here because we need this when application loads.
// TODO remove the hardcode value and get from the window navigator object
store.dispatch(getAllHotels('en-US'));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
