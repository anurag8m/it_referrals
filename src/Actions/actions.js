import axios from "axios";
import jwt_decode from "jwt-decode";
export const SET_HOMEPAGE_CATEGORY = "SET_HOMEPAGE_CATEGORY";
export const SET_CATEGORY_JOBLIST = "SET_CATEGORY_JOBLIST";
export const SET_JOB_DESCRIPTION = "SET_JOB_DESCRIPTION";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// code to get homepage category
export function setHomapageCategory(homepagecategory) {
  return {
    type: SET_HOMEPAGE_CATEGORY,
    homepagecategory
  };
}

export function fetchHomepageCategory() {
  return dispatch => {
    fetch("http://18.207.190.61:4000/getHomepageCategory")
      .then(res => res.json())
      .then(data => dispatch(setHomapageCategory(data.Category)));
  };
}

// code to get job listing based on category
export function setCategoryJoblist(categoryjoblist) {
  return {
    type: SET_CATEGORY_JOBLIST,
    categoryjoblist
  };
}

export function fetchCategoryJoblist(requestedId) {
  var apiUrl = `http://18.207.190.61:4000/getJobByCategory/${requestedId}`;
  return dispatch => {
    return fetch(apiUrl)
      .then(res => res.json())
      .then(data => dispatch(setCategoryJoblist(data.Jobs)));
  };
}

// code to get job description
export function setJobDescription(jobdescription) {
  return {
    type: SET_JOB_DESCRIPTION,
    jobdescription
  };
}

export function fetchJobDescription(requestedId) {
  var apiUrl = `http://18.207.190.61:4000/getJobDetails/${requestedId}`;
  return dispatch => {
    return fetch(apiUrl)
      .then(res => res.json())
      .then(data => dispatch(setJobDescription(data.Detail)));
  };
}

// code to save refer candidate form
export function saveReferCandidate(user1) {
  if (localStorage.usertoken && localStorage.usertoken != "undefined") {
    var user = {
      userId: user1.userid
    };
  } else {
    var user = {
      name: user1.username,
      password: user1.userpassword,
      email: user1.useremail
    };
  }
  return dispatch => {
    return axios
      .post("http://18.207.190.61:4000/referCandidate", {
        user,

        candidate: {
          referredName: user1.referredName,
          referredLinkedIn: user1.referredLinkedIn,
          referredResumeLink: user1.referredResumeLink,
          jobId: user1.jobid
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err.response.data.msg);
      });
  };
}

// code to login user
export function loginUser(user) {
  return dispatch => {
    return axios
      .post("http://18.207.190.61:4000/login", {
        email: user.email,
        password: user.password
      })
      .then(res => {
        // Set token to localStorage
        localStorage.setItem("usertoken", res.data.token);
        // Decode token to get user data
        const decoded = jwt_decode(res.data.token);
        // Set current user
        dispatch(setCurrentUser(decoded));
        return res.data;
      })
      .catch(err => {
        console.log(err.response.data.msg);
      });
  };
}

export function setCurrentUser(userlogin) {
  return {
    type: SET_CURRENT_USER,
    userlogin
  };
}
