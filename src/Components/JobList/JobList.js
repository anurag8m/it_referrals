import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import "./Joblist.css";
import Header from "../Partials/Header";
import HeaderImage from "../../Resources/Images/slide3.jpg";
import Footer from "../Partials/Footer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCategoryJoblist } from "../../Actions/actions";
import CategoryJoblistPage from "./categoryjoblistpage";
import image from "../lg.rotating-balls-spinner.gif";

class JobList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: true,
      categoryname: "",
      categorydesc: ""
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    var requestedId = this.props.match.params.id;
    this.props.fetchCategoryJoblist(requestedId).then(() => {
      this.setState({ loading: false });
    });
  }
  render() {
    const { loading } = this.state;
    return (
      <div className="container-fluid">
        <Header />
        <div className="inner-slide">
          <img
            className="img-fluid homepage-top-image"
            src={HeaderImage}
            alt=""
          />
          <div class="refer-centered">
            <h4 className="explore-text">
              Explore Thousands <br />
              Of <span className="jobs-bold">JOBS</span> around you
            </h4>
            <div>
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                optio nam illo! adipisicing elit. Officia optio nam illo!
              </p>
            </div>
          </div>
        </div>
        <div className="container search-box">
          <div className="search-container">
            <div className="row">
              <div class="col-md-5 input-group search-item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Keywords"
                />
              </div>
              <div class="col-md-5 search-item">
                <i class="fa fa-map-marker location" aria-hidden="true"></i>
                <select
                  class="custom-select"
                  style={{ borderRadius: "5px" }}
                  placeholder="All Locations"
                >
                  <option selected>All Locations</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="col-md-2 float-right search">
                <button className="btn btn-primary search-btn" type="submit">
                  SEARCH JOB
                </button>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="col-md-4 offset-md-5">
            <img src={image} />
          </div>
        ) : (
          <div>
            <div className="container featured">
              <div className="job-listing">
                <h3>
                  {this.props.categoryjoblist[0] &&
                    this.props.categoryjoblist[0].category.name}
                </h3>
                <p>
                  {this.props.categoryjoblist[0] &&
                    this.props.categoryjoblist[0].category.description}
                </p>
              </div>
            </div>

            <div className="container jobs">
              <CategoryJoblistPage
                categoryjoblist={this.props.categoryjoblist}
              />
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
JobList.propTypes = {
  categoryjoblist: PropTypes.array.isRequired,
  fetchCategoryJoblist: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    categoryjoblist: state.categoryjoblist
  };
}

export default connect(
  mapStateToProps,
  { fetchCategoryJoblist }
)(JobList);
