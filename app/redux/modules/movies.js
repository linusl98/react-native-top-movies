import { createAction, handleActions } from 'redux-actions';

export const setMovies = createAction('SET_MOVIES');


const initialState = {
  movies: [],
};


export default handleActions({
  SET_MOVIES: (state, action) => ({
    ...state,
    movies: action.payload.data,
  }),
}, initialState);

export const getState = state => state.movies;
