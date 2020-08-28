import { createStore, applyMiddleware, compose } from 'redux';
// import { sessionService } from 'redux-react-session';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);
// const options = { refreshOnCheckAuth: true, redirectPath: '/', driver: 'COOKIES' };
const store = createStore(rootReducer(), enhancer);

// export default sessionService.initSessionService(store);

export default store;
