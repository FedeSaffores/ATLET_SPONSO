import axios from "axios";
import {
  GET_FIGHTERS,
  GET_SPONSORS,
  GET_MYUSER,
  GET_FIGHTERS_NAME,
  GET_SPONSORS_NAME,
  GET_USER_BY_EMAIL,
  GET_USER_DETAIL,
  GET_DETAIL_FAIGHTER,
} from "./const";

/* const instance = axios.create({
  baseURL: "http://localhost:3001",
}); */

const instance = axios.create({ baseURL: "http://localhost:3001" });
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function getFighters() {
  return async function (dispatch) {
    const json = await instance.get("/fighters");
    console.log(json.data);
    return dispatch({ type: GET_FIGHTERS, payload: json.data });
  };
}
export function getFightersByName(name) {
  return async function (dispatch) {
    const json = await instance.get(`/fighters?name=${name}`);
    console.log(json);
    return dispatch({
      type: GET_FIGHTERS_NAME,
      payload: json.data,
    });
  };
}
export function getFighter(idFighter) {
  return async (dispatch) => {
    const res = await axios.get(`/fighters/${idFighter}`);
    dispatch({ type: GET_DETAIL_FAIGHTER, payload: res.data });
  };
}
export function getSponsors() {
  return async function (dispatch) {
    const json = await instance.get("/sponsor");
    return dispatch({ type: GET_SPONSORS, payload: json.data });
  };
}
export function getSponsorsByName(name) {
  return async function (dispatch) {
    const json = await instance.get(`/sponsor?name=${name}`);
    return dispatch({
      type: GET_SPONSORS_NAME,
      payload: json.data,
    });
  };
}
export function getMyUser() {
  return async function (dispatch) {
    let json = await instance.get("/user/myuser");
    return dispatch({
      type: GET_MYUSER,
      payload: json.data,
    });
  };
}
export function getUserDetail(id) {
  return async function (dispatch) {
    let json = await instance.get(`/user/${id}`);
    return dispatch({
      type: GET_USER_DETAIL,
      payload: json.data,
    });
  };
}
export function getUserByEmail(email) {
  return async function (dispatch) {
    let json = await instance.get(`/user/log/${email}`);
    return dispatch({
      type: GET_USER_BY_EMAIL,
      payload: json.data,
    });
  };
}
