import React, { Component } from "react";
import "./JobDescription.css";
import { Link } from "react-router-dom";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import { connect } from "react-redux";
import { fetchJobDescription } from "../../Actions/actions";
import PropTypes from "prop-types";
import image from "../lg.rotating-balls-spinner.gif";

class JobDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobid: "",
      jobtitle: "",
      jobdecsription: "",
      companyNane: "",
      category: "",
      loading: true
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    var requestedId = this.props.match.params.id;
    this.props.fetchJobDescription(requestedId).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="container-fluid">
        <Header />
        <hr className="line-break" />
        {loading ? (
          <div className="col-md-4 offset-md-5">
            <img src={image} />
          </div>
        ) : (
          <div>
            <div className="container job">
              <div className="job-listing">
                <h3>{this.props.jobdescription.jobTitle}</h3>
                <p className="job-details">
                  {" "}
                  <i class="fa fa-money" aria-hidden="true"></i>&nbsp;Referral
                  Fee=$200 &nbsp;&nbsp;{" "}
                  <i class="fa fa-calendar-o" aria-hidden="true"></i>
                  &nbsp;Posted 9 days ago
                </p>
              </div>
            </div>
            <div className="container job-desc">
              <div class="row">
                <div className="col-md-12">
                  <h5>
                    <b>Job Title</b>
                  </h5>
                </div>
                <div className="col-md-12">
                  <p>{this.props.jobdescription.jobTitle}</p>
                </div>
              </div>
              <br />

              <div class="row">
                <div className="col-md-12">
                  <h5>
                    <b>Job Description</b>
                  </h5>
                </div>
                <div className="col-md-12">
                  <p>{this.props.jobdescription.description}</p>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-md-12">
                  <h5>
                    <b>Company Profile</b>
                  </h5>
                </div>
                <div className="col-md-12">
                  <p>{this.props.jobdescription.companyNane}</p>
                </div>
              </div>
              <div className="row">
                <Link to={"/refercandidate/" + this.props.jobdescription._id}>
                  <button type="submit" class="btn btn-lg refer-for-job">
                    REFER A CANDIDATE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

JobDescription.propTypes = {
  jobdescription: PropTypes.array.isRequired,
  fetchJobDescription: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    jobdescription: state.jobdescription
  };
}

export default connect(
  mapStateToProps,
  { fetchJobDescription }
)(JobDescription);
