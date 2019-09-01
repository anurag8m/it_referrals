import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import topimage from "../../Resources/Images/slide.jpg";
import ScrollableAnchor from "react-scrollable-anchor";
import Footer from "../Partials/Footer";
import axios from "axios";
//redux part
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HomepageCategoryList from "./homepagecategory";
import { fetchHomepageCategory } from "../../Actions/actions";

class LandingPage extends Component {
  constructor() {
    super();

    this.state = {
      shown: false,
      allhomepagecategory: [],
      loading: true
    };
  }
  showDiv() {
    this.setState({
      shown: true
    });
  }
  componentDidMount() {
    // get homepage category
    this.props.fetchHomepageCategory();
  }

  render() {
    var shown = {
      display: this.state.shown ? "block" : "none",
      padding: "10px",
      background: "#7676a7",
      color: "#fff"
    };

    var hidden = {
      display: this.state.shown ? "none" : "block"
    };
    return (
      <div className="container-fluid  px-0">
        <div className="bg-1 text-center">
          <div className="row mr-0 ml-0">
            <div className="col-md-12 col-sm-12 px-0">
              <img
                src={topimage}
                className="img-responsive homepage-top-image"
              />
              <div className="centered">
                <h1 className="top-image-text">
                  Welcome to{" "}
                  <span style={{ color: "rgb(255, 156, 1)" }}>
                    {" "}
                    IT referrals
                  </span>
                  <br />
                </h1>
                <p className="top-para">What would you like to do ?</p>
                <p className="top-button">
                  <Link to="/referjob">
                    <button
                      type="button"
                      className="btn btn-primary first-color btn-lg refer-click"
                    >
                      Refer Jobs
                    </button>
                  </Link>
                  <a href="#section1" className="button-right">
                    <button
                      type="button"
                      className="btn btn-primary second-color btn-lg refer-click"
                      onClick={this.showDiv.bind(this)}
                    >
                      Refer Candidate
                    </button>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="container-fluid px-0">
            <ScrollableAnchor id={"section1"}>
              <div>
                <div style={shown}>
                  <h2>For What Role ?</h2>
                </div>

                <HomepageCategoryList
                  homepagecategory={this.props.homepagecategory}
                />
              </div>
            </ScrollableAnchor>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

LandingPage.propTypes = {
  homepagecategory: PropTypes.array.isRequired,
  fetchHomepageCategory: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    homepagecategory: state.homepagecategory
  };
}

export default connect(
  mapStateToProps,
  { fetchHomepageCategory }
)(LandingPage);
