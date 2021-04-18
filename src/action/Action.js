import * as types from './ActionTypes';

export const saveUser = () => (types.SAVE_USER);
export const searchShow = () => ({type : types.SEARCH_SHOW});
export const searchHide = () => ({type : types.SEARCH_HIDE});
export const followShow = () => ({type : types.FOLLOW_SHOW});
export const followHide = () => ({type : types.FOLLOW_HIDE});
export const saveFollow = () => (types.SAVE_FOLLOW);