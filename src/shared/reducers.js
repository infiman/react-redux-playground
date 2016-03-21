import { combineReducers } from 'redux';
import { ACTION_TYPES } from 'actions';
import { UI_STATE } from 'constants';

const BOUNDS = [0.1, 1];
const previousState = window.localStorage[UI_STATE];
let initialState = {
  progress: BOUNDS[1] - BOUNDS[0],
  sidebar: {
    isVisible: true,
  },
  pages: {
    previousId: 0,
    1: {
      elements: [{ elementId: 0 }],
    },
    2: {
      elements: [],
    },
  },
};

try {
  initialState = JSON.parse(previousState);
} catch (e) {
  console.warn('initialState used.');
}

function findLimit(value, bounds = BOUNDS) {
  return value < bounds[0] ? bounds[0] : bounds[1] - bounds[0];
}

function isInsideOfBoundaries(value, bounds = BOUNDS) {
  return value > bounds[0] && value < bounds[1] - bounds[0];
}

function generateElementId(previousId) {
  return previousId + 1;
}

function progress(state = initialState.progress, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_PROGRESS:
      return isInsideOfBoundaries(action.progress) ?
        action.progress :
        findLimit(action.progress);
    default:
      return state;
  }
}

function sidebar(state = initialState.sidebar, action) {
  switch (action.type) {
    case ACTION_TYPES.OPEN_SIDEBAR:
      return {
        ...state,
        ...{ isVisible: action.isVisible },
      };
    default:
      return state;
  }
}

function pages(state = initialState.pages, action) {
  let newState = null;

  switch (action.type) {
    case ACTION_TYPES.ADD_ELEMENT_TO_PAGE: {
      newState = { ...state };

      const elementId = generateElementId(newState.previousId);

      newState.previousId = elementId;
      newState[action.pageId].elements.push({ elementId });

      return newState;
    }
    case ACTION_TYPES.REMOVE_ELEMENT_FROM_PAGE: {
      newState = { ...state };

      let elements = newState[action.pageId].elements;

      elements = elements.filter(item => item.elementId !== action.elementId);

      newState[action.pageId].elements = elements;

      return newState;
    }
    default:
      return state;
  }
}

export default combineReducers({
  progress,
  sidebar,
  pages,
});
