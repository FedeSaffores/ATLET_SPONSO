const {
  GET_FIGHTERS,
  GET_SPONSORS,
  GET_FIGHTERS_NAME,
  GET_MYUSER,
  GET_USER_BY_EMAIL,
  GET_USER_DETAIL,
  GET_DETAIL_FIGHTER,
  DELETE_FIGHTER,
  DELETE_SPONSOR,
  GET_DETAIL_SPONSOR,
  GET_SPONSORS_NAME,
} = require("./const");

const inicialState = {
  user: [],
  sponsors: [],
  allSponsors: [],
  Fighters: [],
  allFighters: [],
  userDetail: [],
  myUser: [],
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
    case DELETE_FIGHTER: {
      const deleteFighter = state.allFighters;
      return {
        ...state,
        Fighters: deleteFighter.filter((fight) => fight.id !== payload),
      };
    }
    case GET_DETAIL_FIGHTER: {
      return {
        ...state,
        FighterDetail: payload,
      };
    }
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
    case DELETE_SPONSOR: {
      const deleteSponsor = state.allSponsors;
      return {
        ...state,
        sponsors: deleteSponsor.filter((sponsor) => sponsor.id !== payload),
      };
    }
    case GET_DETAIL_SPONSOR: {
      return {
        ...state,
        SponsorDetail: payload,
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
