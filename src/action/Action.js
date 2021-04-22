import * as types from './ActionTypes';

export const saveUser = () => (types.SAVE_USER);
export const saveFollow = () => (types.SAVE_FOLLOW);

export const componentShowHide = (act, dp) => {
    const action = types.CONPONENT_SHOW_HIDE[act];

    return {type: action, display: dp}
}