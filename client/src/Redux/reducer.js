const {
  GET_FIGHTERS,
  GET_SPONSORS,
  GET_FIGHTERS_NAME,
  GET_MYUSER,
  GET_USER_BY_EMAIL,
  GET_USER_DETAIL,
  GET_DETAIL_FIGHTER,
  GET_LIKES_BY_USER,
  /*  DELETE_SPONSOR,
  GET_DETAIL_SPONSOR, */
  GET_SPONSORS_NAME,
  GET_COMMENTS,
  CLEAR_DETAILS,
  GET_CITIES,
  GET_All_LIKES,
} = require("./const");

const inicialState = {
  user: [],
  sponsors: [],
  allSponsors: [],
  Fighters: [],
  FighterDetail: [],
  allFighters: [],
  userDetail: [],
  myUser: [],
  coments: [],
  cities: [],
  getAllLikes: [],
  allLikes: [],
};

function reducer(state = inicialState, { type, payload }) {
  switch (type) {
    case GET_FIGHTERS: {
      console.log(payload);
      return {
        ...state,
        Fighters: payload,
        allFighters: payload,
      };
    }
    case GET_FIGHTERS_NAME: {
      return {
        ...state,
        Fighters: payload,
      };
    }

    case GET_DETAIL_FIGHTER: {
      return {
        ...state,
        FighterDetail: payload,
      };
    }
    case CLEAR_DETAILS:
      return {
        ...state,
        fighterDetail: [],
      };
    case GET_SPONSORS: {
      return {
        ...state,
        sponsors: payload,
      };
    }
    case GET_SPONSORS_NAME: {
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
    case GET_COMMENTS:
      return {
        ...state,
        coments: payload,
      };
    case GET_CITIES:
      return {
        ...state,
        cities: payload,
      };
    case GET_All_LIKES:
      return {
        ...state,
        getAllLikes: payload,
      };
    case GET_LIKES_BY_USER:
      return {
        ...state,
        allLikes: payload,
      };

    default:
      return state;
  }
}
export default reducer;
