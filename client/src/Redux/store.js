import reducer from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";
import ThunkMiddlewere from "redux-thunk";

const composeEhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(
  reducer,
  composeEhancer(applyMiddleware(ThunkMiddlewere))
);
export default store;
