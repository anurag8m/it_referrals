import { SET_JOB_DESCRIPTION } from "../Actions/actions";

export default function jobdescription(state = [], action = {}) {
  switch (action.type) {
    case SET_JOB_DESCRIPTION:
      return action.jobdescription;
    default:
      return state;
  }
}
