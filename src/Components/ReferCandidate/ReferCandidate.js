import React, { Component } from "react";
import "./ReferCandidate.css";
import Header from "../Partials/Header";
import topimage from "../../Resources/Images/slide1.jpg";
import Footer from "../Partials/Footer";
import LoadingSpinner from "../loadingspinner.component";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchJobDescription, saveReferCandidate } from "../../Actions/actions";
import image from "../lg.rotating-balls-spinner.gif";

class ReferSpecialization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      referredName: "",
      referredLinkedIn: "",
      referredResumeLink: "",
      jobid: "",
      username: "",
      useremail: "",
      userpassword: "",
      userobjectid: "",
      loading: false,
      loading1: true,
      message: ""
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({ userpassword: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  onChange(e) {
    const { name, value } = e.target;
    // console.log("name :", name);
    // console.log("value :", value);
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    this.setState({
      loading: true
    });
    e.preventDefault();
    const user1 = {
      referredName: this.state.referredName,
      referredLinkedIn: this.state.referredLinkedIn,
      referredResumeLink: "http://www.anurag.com/resume",
      jobid: this.props.match.params.id,
      username: this.state.username,
      useremail: this.state.useremail,
      userpassword: this.state.userpassword,
      userid: this.state.userobjectid
    };

      this.props.saveReferCandidate(user1).then((res, err) => {
          if (res.Success == "0") {
              this.setState({
                  loading: false,
                  message: res.Message
              });
          } else if (res.Success == "1") {
              this.setState({
                  loading: false,
                  message: res.Message,
                  referredName: "",
                  referredLinkedIn: "",
                  referredResumeLink: "",
                  username: "",
                  useremail: "",
                  userpassword: ""
              });
              window.scrollTo(0, 0);
          }
      });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    var requestedId = this.props.match.params.id;
    this.props.fetchJobDescription(requestedId).then(() => {
      this.setState({ loading1: false });
    });

    if (localStorage.usertoken && localStorage.usertoken != "undefined") {
      const token = localStorage.usertoken;

      const decoded = jwt_decode(token);
      console.log(decoded);
      this.setState({
        userobjectid: decoded.id
      });
    }
  }

  render() {
    const { loading, loading1 } = this.state;
    return (
      <div className="container-fluid">
        <Header />
        <div className="inner-slide">
          <img src={topimage} className="img-fluid homepage-top-image" />
          <div class="refer-centered">
            <h2 className="render-image-text">
              Refer a <br />
              <span className="job-color">CANDIDATE</span>
            </h2>
            <p className="render-image-para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
            {loading1 ? (
                <div className="col-md-4 offset-md-5">
                    <img src={image} />
                </div>
            ) : (
                    <div>
                        <div className="container">
                            <div className="row software">
                                <h1>{this.props.jobdescription.jobTitle}</h1>
                            </div>
                        </div><br />
                        <div className="container candidate-form">
                            <form onSubmit={this.onSubmit}>
                                <div className="padded">
                                    {this.state.message !== "" && (
                                        <div class="alert alert-success alert-dismissible" role="alert">
                                            <a
                                                href="#"
                                                class="close"
                                                data-dismiss="alert"
                                                aria-label="close"
                                            >
                                                &times;
                  </a>
                                            <strong>{this.state.message}</strong>
                                        </div>
                                    )}

                                    <div class="form-group row referral">
                                        <h1 className="heading">
                                            Remember you can refer only two candidates{" "}
                                        </h1>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-6 col-md-8">
                                            <label for="inputEmail3" class="col col-form-label">
                                                Name of Referral
                  </label>
                                        </div>
                                        <div class="col-sm-6 col-md-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                placeholder="Enter Name of the Candidate"
                                                required="required"
                                                name="referredName"
                                                value={this.state.referredName}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-6 col-md-8">
                                            <label for="inputEmail3" class="col col-form-label">
                                                Linkedin URL
                  </label>
                                        </div>
                                        <div class="col-sm-6 col-md-4">
                                            <input
                                                type="text"
                                                className="form-control input"
                                                placeholder="Enter Linkedin URL of the Candidate"
                                                required="required"
                                                name="referredLinkedIn"
                                                value={this.state.referredLinkedIn}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-6 col-md-8">
                                            <label for="inputEmail3" class="col col-form-label">
                                                Upload Resume
                  </label>
                                        </div>
                                        <div class="col-sm-6 col-md-4">
                                            <span class="btn btn-file">
                                                Browse <input type="file" />
                                            </span>
                                            <span style={{ fontSize: "18px" }}> </span>
                                        </div>
                                    </div>
                                    {localStorage.usertoken &&
                                        localStorage.usertoken != "undefined" ? (
                                            ""
                                        ) : (
                                            <div>
                                                <div class="form-group row referral">
                                                    <h1 className="heading-profile">Create a Profile</h1>
                                                </div>
                                                <div class="form-group row">
                                                    <div class="col-sm-6 col-md-8">
                                                        <label for="inputEmail3" class="col col-form-label">
                                                            Username
                      </label>
                                                    </div>
                                                    <div class="col-sm-6 col-md-4">
                                                        <input
                                                            type="text"
                                                            className="form-control input"
                                                            placeholder="Enter Your Name"
                                                            required="required"
                                                            name="username"
                                                            value={this.state.username}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <div class="col-sm-6 col-md-8">
                                                        <label for="inputEmail3" class="col col-form-label">
                                                            Email
                      </label>
                                                    </div>
                                                    <div class="col-sm-6 col-md-4">
                                                        <input
                                                            type="email"
                                                            className="form-control input"
                                                            placeholder="Enter Your Email"
                                                            required="required"
                                                            name="useremail"
                                                            value={this.state.useremail}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <div class="col-sm-6 col-md-8">
                                                        <label for="inputEmail3" class="col col-form-label">
                                                            Password
                      </label>
                                                    </div>
                                                    <div class="col-sm-6 col-md-4">
                                                        <input
                                                            type={this.state.hidden ? "password" : "text"}
                                                            name="userpassword"
                                                            placeholder="Enter Your password"
                                                            value={this.state.userpassword}
                                                            onChange={this.handlePasswordChange}
                                                            class="form-control input"
                                                        />
                                                        <i
                                                            class="fa fa-eye"
                                                            onClick={this.toggleShow}
                                                            aria-hidden="true"
                                                        ></i>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    <div class="form-group row">
                                        <div class="col submit">
                                            <button
                                                type="submit"
                                                class="btn btn-primary btn-lg submit-button"
                                            >
                                                {" "}
                                                {loading ? <LoadingSpinner /> : "SUBMIT"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>)}
        <Footer />
      </div>
    );
  }
}

ReferSpecialization.propTypes = {
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
    { fetchJobDescription, saveReferCandidate }
)(ReferSpecialization);
