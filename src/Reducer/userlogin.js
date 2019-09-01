import { SET_CURRENT_USER } from "../Actions/actions";

export default function userlogin(state = [], action = {}) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.userlogin;
    default:
      return state;
  }
}
