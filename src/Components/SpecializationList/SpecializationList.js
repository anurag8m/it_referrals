import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './SpecializationList.css'
import Header from '../Partials/Header';
import topimage from '../../Resources/Images/slide1.jpg';
import Footer from '../Partials/Footer';

export default class SpecializationList extends Component {
    constructor() {
        super();

        this.state = {

            categoryinfo: [],
            loading: true
        };

    }
    componentDidMount() {
        window.scrollTo(0, 0);

        // get homepage category

        var apiUrl = `http://18.207.190.61:4000/jobCountByCategory`;
        fetch(apiUrl)
            .then(getresponse => {
                return getresponse.json();

            }).then(data => {
                console.log(data);
                let allCatFromApi = data.Categories.map(team => { return { catmainid: team._id, catdescription: team.description, catname: team.name, catstatus: team.isactive, totaljob: team.jobCount && team.jobCount.total } })
                this.setState({ categoryinfo: allCatFromApi, loading: false });

            }).catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <Header />
                <div className="inner-slide">
                    <img src={topimage} className="img-fluid homepage-top-image" />
                    <div class="refer-centered">
                        <h2 className="render-image-text">Refer a <br /><span className="job-color">CANDIDATE</span></h2>
                        <p className="render-image-para">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className="container job-form">
                    <div className="padded">
                        <div class="form-group row">
                            <div class="col-md-9">
                                <label for="inputEmail3" class="col col-form-label heading">Specializations</label>
                            </div>
                            <div class="col-md-3">
                                <form class="form-inline search-form">
                                    <i class="fa fa-search seacrch-icon" aria-hidden="true"></i>
                                    <input class="search-bar" type="search" placeholder="Search here" aria-label="Search" />
                                </form>
                            </div>
                        </div>
                        {this.state.categoryinfo.map((team) =>
                            team.catstatus ?
                                < div class="form-group row" >
                                    <div class="col-md-9">
                                        <label for="inputEmail3" class="col col-form-label">{team.catname}</label>
                                    </div>
                                    <div class="col-md-3 job-button">
                                        <Link to={"/joblist/" + team.catmainid}>
                                            <button type="submit" class="btn btn-light btn-lg description jobs-button">{team.totaljob}  Jobs</button>
                                        </Link>
                                    </div>
                                </div> : ""


                        )}

                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
