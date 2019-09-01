import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import JobList from "./Components/JobList/JobList";
import Pagination from "./Pagination/Pagination";
import ReferJob from "./Components/ReferJob/ReferJob";
import SpecializationList from "./Components/SpecializationList/SpecializationList";
import ReferCandidate from "./Components/ReferCandidate/ReferCandidate";
import JobDescription from "./Components/JobDescription/JobDescription";
//Test

class App extends Component {
  render() {
    //     // FOR POSTS
    // const [posts, setPosts] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [postsPerPage] = useState(10);

    // //Get current posts-- get the index of the last post
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost -postsPerPage;
    // const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);

    //Change Page
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/joblist/:id" component={JobList} />
        <Route path="/jobDescription/:id" component={JobDescription} />
        <Route path="/referjob" exact component={ReferJob} />
        <Route
          path="/specializationList"
          exact
          component={SpecializationList}
        />
        <Route path="/refercandidate/:id" exact component={ReferCandidate} />
      </Router>
    );
  }
}

export default App;
