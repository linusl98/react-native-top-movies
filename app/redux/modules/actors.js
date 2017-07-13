import { createAction, handleActions } from 'redux-actions';

export const setActors = createAction('SET_ACTORS');


const initialState = {
  actors: [],
};


export default handleActions({
  SET_ACTORS: (state, action) => ({
    ...state,
    actors: action.payload.data,
  }),
}, initialState);

export const getState = state => state.actors;
