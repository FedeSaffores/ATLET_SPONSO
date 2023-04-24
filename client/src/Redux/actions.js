import axios from "axios";
import {
  GET_FIGHTERS,
  GET_SPONSORS,
  DELETE_SPONSOR,
  GET_MYUSER,
  GET_FIGHTERS_NAME,
  GET_SPONSORS_NAME,
  GET_DETAIL_SPONSOR,
  GET_USER_BY_EMAIL,
  GET_USER_DETAIL,
  GET_DETAIL_FIGHTER,
  DELETE_FIGHTER,
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
export function deleteFighter(id) {
  return async function (dispatch) {
    const json = await instance.delete(`http://localhost:3001/fighters/${id}`);
    return dispatch({
      type: DELETE_FIGHTER,
    });
  };
}
export function getFighter(idFighter) {
  return async (dispatch) => {
    const res = await instance.get(`/fighters/${idFighter}`);
    dispatch({ type: GET_DETAIL_FIGHTER, payload: res.data });
  };
}
export function getSponsors() {
  return async function (dispatch) {
    const json = await instance.get("/sponsor");
    return dispatch({ type: GET_SPONSORS, payload: json.data });
  };
}
export function getSponsorsByName(companyName) {
  return async function (dispatch) {
    const json = await instance.get(`/sponsor?companyName=${companyName}`);
    return dispatch({
      type: GET_SPONSORS_NAME,
      payload: json.data,
    });
  };
}
export function deleteSponsor(id) {
  return async function (dispatch) {
    const json = await instance.delete(`http://localhost:3001/sponsor/${id}`);
    return dispatch({
      type: DELETE_SPONSOR,
    });
  };
}
export function getSponsor(idSponsor) {
  return async (dispatch) => {
    const res = await instance.get(`/fighters/${idSponsor}`);
    dispatch({ type: GET_DETAIL_SPONSOR, payload: res.data });
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
