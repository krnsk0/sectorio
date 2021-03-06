/* eslint-disable complexity */
const constants = require('../shared/constants');

let dirList = [];
export let direction = false;

// helper function to get the current direction from a list
// this will be the most recent keypress
const getDirectionFromStack = list => {
  if (list.length === 0) {
    return false;
  } else {
    return list[list.length - 1];
  }
};

export const setUpKeyListeners = socket => {
  // keydowns push to list
  document.addEventListener('keydown', evt => {
    // prevent defaults for arrow keys
    if (evt.keyCode >= 37 && evt.keyCode <= 40) {
      evt.preventDefault();
      if (evt.repeat === false) {
        if (evt.keyCode === 38) {
          // up
          dirList.push('up');
        } else if (evt.keyCode === 40) {
          // down
          dirList.push('down');
        } else if (evt.keyCode === 37) {
          // left
          dirList.push('left');
        } else if (evt.keyCode === 39) {
          // right
          dirList.push('right');
        }
        direction = getDirectionFromStack(dirList);
        socket.emit(constants.MSG.DIRECTION, direction);
      }
    }
  });

  // keyups remove their key from the list
  document.addEventListener('keyup', evt => {
    // prevent defaults for arrow keys
    if (evt.keyCode >= 37 && evt.keyCode <= 40) {
      evt.preventDefault();
      if (evt.keyCode === 38) {
        // up
        dirList = dirList.filter(dir => dir !== 'up');
      } else if (evt.keyCode === 40) {
        // down
        dirList = dirList.filter(dir => dir !== 'down');
      } else if (evt.keyCode === 37) {
        // left
        dirList = dirList.filter(dir => dir !== 'left');
      } else if (evt.keyCode === 39) {
        // right
        dirList = dirList.filter(dir => dir !== 'right');
      }
      direction = getDirectionFromStack(dirList);
      socket.emit(constants.MSG.DIRECTION, direction);
    }
  });
};
