import { combineReducers } from "redux";
import homepagecategory from "./homepagecategory";
import categoryjoblist from "./categoryjoblist";
import jobdescription from "./jobdescription";
import userlogin from "./userlogin";

export default combineReducers({
  homepagecategory,
  categoryjoblist,
  jobdescription,
  userlogin
});
