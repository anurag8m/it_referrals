import { SET_CATEGORY_JOBLIST } from "../Actions/actions";

export default function categoryjoblist(state = [], action = {}) {
  switch (action.type) {
    case SET_CATEGORY_JOBLIST:
      return action.categoryjoblist;
    default:
      return state;
  }
}
