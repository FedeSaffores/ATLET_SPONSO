import axios from "axios";
import {
  GET_FIGHTERS,
  GET_SPONSORS,
  GET_COMMENTS,
  GET_MYUSER,
  GET_FIGHTERS_NAME,
  GET_DETAIL_SPONSOR,
  GET_USER_BY_EMAIL,
  GET_USER_DETAIL,
  GET_DETAIL_FIGHTER,
  CLEAR_DETAILS,
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

export function getFighter(id) {
  return async (dispatch) => {
    const res = await instance.get(`/fighters/${id}`);
    dispatch({ type: GET_DETAIL_FIGHTER, payload: res.data });
  };
}
export function clearDetails() {
  return {
    type: CLEAR_DETAILS,
    payload: [],
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
      type: GET_SPONSORS,
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
export function getAllComments() {
  return async function (dispatch) {
    const json = await instance.get("/allcoments");
    console.log(json.data);
    return dispatch({ type: GET_COMMENTS, payload: json.data });
  };
}

/* export function createComments(comments) {
  return async function () {
    try {
      const newComment = await instance.post(
        "http://localhost:3001//comments",
        comments
      );
    } catch (error) {
      throw error;
    }
  };
}
 */
