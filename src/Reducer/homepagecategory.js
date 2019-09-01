import { SET_HOMEPAGE_CATEGORY } from "../Actions/actions";

export default function homepagecategory(state = [], action = {}) {
  switch (action.type) {
    case SET_HOMEPAGE_CATEGORY:
      return action.homepagecategory;
    default:
      return state;
  }
}
