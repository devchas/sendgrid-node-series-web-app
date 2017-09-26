import { types } from '../actions';

const initialState = {
  isModalDisplayed: false,
  modalCallback: null
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case types.TOGGLE_MODAL:
      return Object.assign({}, state, { 
        isModalDisplayed: !state.isModalDisplayed, 
        modalCallback: payload
      });
    default:
      return state;
  }
}