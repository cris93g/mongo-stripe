import {
    createStore,
    applyMiddleware
} from "redux";
import promiseMiddleware from "redux-promise-middleware";
import itemsReducer from "./ducks/reducer";

const middleware = applyMiddleware(promiseMiddleware());
const store = createStore(itemsReducer, middleware);

export default store;