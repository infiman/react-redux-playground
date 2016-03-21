export const ACTION_TYPES = {
  UPDATE_PROGRESS: 'UPDATE_PROGRESS',

  OPEN_SIDEBAR: 'OPEN_SIDEBAR',

  ADD_ELEMENT_TO_PAGE: 'ADD_ELEMENT_TO_PAGE',
  REMOVE_ELEMENT_FROM_PAGE: 'REMOVE_ELEMENT_FROM_PAGE',
};

export function updateProgress(progress) {
  return {
    progress,
    type: ACTION_TYPES.UPDATE_PROGRESS,
  };
}

export function openSideBar(isVisible) {
  return {
    isVisible,
    type: ACTION_TYPES.OPEN_SIDEBAR,
  };
}

export function addElementToPage(pageId) {
  return {
    pageId,
    type: ACTION_TYPES.ADD_ELEMENT_TO_PAGE,
  };
}

export function removeElementFromPage(pageId, elementId) {
  return {
    pageId,
    elementId,
    type: ACTION_TYPES.REMOVE_ELEMENT_FROM_PAGE,
  };
}
