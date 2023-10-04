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
import Sponsors from "./components/ListSponsors/ListSponsor";
import AllEventsFighter from "./components/ComentsByFihter/comentsFighter";

/* import Events from "./components/Events/events"; */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Routes>
        {/* <Route path="/events" element={<Events />} /> */}

        <Route path="/sponsor" element={<Sponsors />} />
        <Route path="/landing" element={<Landing />} />

        <Route path="/" element={<Home />} />

        <Route path="/sponsorhome" element={<SponsorHome />} />

        <Route path="/newFighter" element={<RegisterFighter />} />

        <Route path="/fighters" element={<Fighters />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/event/fighter/:id" element={<AllEventsFighter />} />
        <Route path="/formSponsor" element={<FormSponsor />} />

        <Route path="/login" element={<LogUser />} />

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
