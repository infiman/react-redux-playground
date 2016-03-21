import { createStore, applyMiddleware } from 'redux';
import justBecauseICanApp from 'reducers';
import { localSaver } from 'middlewares';

export default createStore(
  justBecauseICanApp,
  applyMiddleware(
    localSaver
  )
);
