
// We use ducks modules for redux, see https://github.com/erikras/ducks-modular-redux

import { AppNavigator } from '../../containers/app/index';

const initialPathAndParams = {
  path: 'MoviesTab',
};

const initialState = AppNavigator.router.getStateForAction(
 AppNavigator.router.getActionForPathAndParams(initialPathAndParams.path),
);


export default (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};
