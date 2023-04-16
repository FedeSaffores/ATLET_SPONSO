const {
  GET_FIGHTERS,
  GET_SPONSORS,
  GET_FIGHTERS_NAME,
  GET_MYUSER,
  GET_USER_BY_EMAIL,
  GET_USER_DETAIL,
  GET_DETAIL_FAIGHTER,
} = require("./const");

const inicialState = {
  user: [],
  sponsors: [],
  fighters: [],
  userDetail: [],
  myUser: [],
};

function reducer(state = inicialState, { type, payload }) {
  switch (type) {
    case GET_FIGHTERS: {
      return {
        ...state,
        fighters: payload,
      };
    }
    case GET_FIGHTERS_NAME: {
      return {
        ...state,
        fighters: payload,
      };
    }
    case GET_DETAIL_FAIGHTER: {
      return {
        ...state,
        fighterDetail: payload,
      };
    }
    case GET_SPONSORS: {
      return {
        ...state,
        sponsors: payload,
      };
    }
    case GET_MYUSER:
      return {
        ...state,
        myUser: payload,
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        userDetail: payload,
      };
    case GET_USER_BY_EMAIL:
      return {
        ...state,
        fighters: payload,
      };
    default:
      return state;
  }
}
export default reducer;
