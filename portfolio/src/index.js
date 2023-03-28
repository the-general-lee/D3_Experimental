import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
/* for deployment on pages:
https://blog.logrocket.com/deploying-react-apps-github-pages/
https://dev.to/kathryngrayson/deploying-your-cra-react-app-on-github-pages-2614
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
