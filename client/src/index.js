import React from "react";
import store from "./Redux/store";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/Home/Home";
import FormSponsor from "./components/RegisterSponsor/RegisterSponsor";
import SponsorHome from "./components/SponsorsHome/SponsorsHome";
import FormUser from "./components/RegisterUser/RegisterUser";
import Landing from "./components/Landing";
import LogUser from "./components/Login/Login";
import RegisterFighter from "./components/RegisterFighter/RegisterFighter";
import Profile from "./components/Profile/Profile";
import Fighters from "./components/ListFighters/ListFighters";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />

      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Routes>
        <Route path="/landing" element={<Landing />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/sponsorhome" element={<SponsorHome />} />
      </Routes>
      <Routes>
        <Route path="/newFighter" element={<RegisterFighter />} />
      </Routes>
      <Routes>
        <Route path="/fighters" element={<Fighters />} />
      </Routes>
      <Routes>
        <Route path="/formSponsor" element={<FormSponsor />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<LogUser />} />
      </Routes>
      <Routes>
        <Route path="/formuser" element={<FormUser />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
/* const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
 */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
