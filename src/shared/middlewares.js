import { UI_STATE } from 'constants';

export const localSaver = store => next => action => {
  const result = next(action);

  window.localStorage[UI_STATE] = JSON.stringify(store.getState());

  return result;
};
