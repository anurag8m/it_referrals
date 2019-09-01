import React, { Component } from 'react'
import './ReferJob.css'
import Header from '../Partials/Header';
import Footer from '../Partials/Footer';
import topimage from '../../Resources/Images/slide2.jpg';
import LoadingSpinner from '../loadingspinner.component';
import { referJob } from "../UserFunctions";
import jwt_decode from 'jwt-decode';

export default class ReferJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: true,
            companyName: "",
            companyContactPersoon: "",
            jobTitle: "",
            duration: "",
            jobDescription: "",
            username: "",
            useremail: "",
            userpassword: "",
            userobjectid: "",
            loading: false,
            message: "",
            allcategory: [],
            jobCategory: ""
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

    componentDidMount() {
        window.scrollTo(0, 0);

        // get  category

        var apiUrl = `http://18.207.190.61:4000/getAllCategory`;
        fetch(apiUrl)
            .then(getresponse => {
                return getresponse.json();

            }).then(data => {

                let allCatFromApi = data.Category.map(team => { return { catmainid: team._id, catimage: team.catImage, catdescription: team.description, catname: team.name } })
                this.setState({ allcategory: allCatFromApi, loading: false });

            }).catch(error => {
                console.log(error);
            });

        // end code for get category


        if (localStorage.usertoken && localStorage.usertoken != 'undefined') {
            const token = localStorage.usertoken;

            const decoded = jwt_decode(token);
            console.log(decoded);
            this.setState({
                userobjectid: decoded.id
            })
        }
    }

    onSubmit(e) {


        this.setState({
            loading: true,
        })
        e.preventDefault();
        const user1 = {
            companyName: this.state.companyName,
            companyContactPersoon: this.state.companyContactPersoon,
            jobTitle: this.state.jobTitle,
            duration: this.state.duration,
            jobCategory: this.state.jobCategory,
            jobDescription: this.state.jobDescription,
            username: this.state.username,
            useremail: this.state.useremail,
            userpassword: this.state.userpassword,
            userid: this.state.userobjectid
        };

        referJob(user1).then((res, err) => {

            if (res.Success == '0') {
                this.setState({
                    loading: false,
                    message: res.Message
                })
            }
            else if (res.Success == '1') {
                this.setState({
                    loading: false,
                    message: res.Message,
                    companyName: "",
                    companyContactPersoon: "",
                    jobTitle: "",
                    duration: "",
                    jobCategory: "",
                    jobDescription: "",
                    username: "",
                    useremail: "",
                    userpassword: ""
                });
                window.scrollTo(0, 0);
            }
        });



    }

    render() {
        const { loading } = this.state;
        return (
            <div className="container-fluid">
                <Header />
                <div className="inner-slide">
                    <img src={topimage} className="img-fluid homepage-top-image" />
                    <div class="refer-centered">
                        <h2 className="render-image-text">Refer a <br /><span className="job-color">JOB</span></h2>
                        <p className="render-image-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur .</p>
                    </div>
                </div>
                <div className="container job-form">
                    <form onSubmit={this.onSubmit}>
                        <div className="padded">
                            {this.state.message !== '' &&
                                <div class="alert alert-success alert-dismissible" role="alert">
                                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                    <strong>{this.state.message}</strong>
                                </div>
                            }
                            <div class="form-group row referral">
                                <h1 className="heading">Refer a Job</h1>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 col-md-8">
                                    <label for="inputEmail3" class="col col-form-label">Company Name</label>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <input
                                        type="text"
                                        className='form-control input'
                                        placeholder="Enter Company Name"
                                        required="required"
                                        name="companyName"
                                        value={this.state.companyName}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 col-md-8">
                                    <label for="inputEmail3" class="col col-form-label">Contact Person at Company</label>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <input
                                        type="text"
                                        className='form-control input'
                                        placeholder="Enter Company Contact Person"
                                        required="required"
                                        name="companyContactPersoon"
                                        value={this.state.companyContactPersoon}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 col-md-8">
                                    <label for="inputEmail3" class="col col-form-label">Job Title</label>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <input
                                        type="text"
                                        className='form-control input'
                                        placeholder="Enter Job Title"
                                        required="required"
                                        name="jobTitle"
                                        value={this.state.jobTitle}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 col-md-8">
                                    <label for="inputEmail3" class="col col-form-label">Category</label>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <select className="form-control input" id="jobCategory" name="jobCategory" onChange={this.onChange}>
                                        <option value="">Please Select Category</option>
                                        {this.state.allcategory.map((team) => <option key={team.catmainid} value={team.catmainid}>{team.catname}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 col-md-8">
                                    <label for="inputEmail3" class="col col-form-label">Duration</label>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <input
                                        type="text"
                                        className='form-control input'
                                        placeholder="Enter Duration in days"
                                        required="required"
                                        name="duration"
                                        value={this.state.duration}
                                        onChange={this.onChange}
                                    />

                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 col-md-8">
                                    <label for="inputEmail3" class="col col-form-label">Job Description</label>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <textarea class="form-control input" rows="5" id="comment" placeholder="Enter Job Description"
                                        required="required"
                                        name="jobDescription"

                                        onChange={this.onChange}>{this.state.jobDescription}</textarea>
                                    <br />
                                    <label for="file-upload" class="custom-file-upload">
                                        Browse...
                                    </label>
                                    <input id="file-upload" type="file" />
                                </div>
                            </div>
                            {localStorage.usertoken && localStorage.usertoken != 'undefined' ?
                                "" :
                                (
                                    <div>
                                        <div class="form-group row referral">
                                            <h1 className="heading-profile">Create a Profile</h1>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-6 col-md-8">
                                                <label for="inputEmail3" class="col col-form-label">Username</label>
                                            </div>
                                            <div class="col-sm-6 col-md-4">
                                                <input
                                                    type="text"
                                                    className='form-control input'
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
                                                <label for="inputEmail3" class="col col-form-label">Email</label>
                                            </div>
                                            <div class="col-sm-6 col-md-4">
                                                <input
                                                    type="email"
                                                    className='form-control input'
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
                                                <label for="inputEmail3" class="col col-form-label">Password</label>
                                            </div>
                                            <div class="col-sm-6 col-md-4">

                                                <input
                                                    type={this.state.hidden ? "password" : "text"}
                                                    name="userpassword"
                                                    placeholder="Enter Your password"
                                                    value={this.state.userpassword}
                                                    onChange={this.handlePasswordChange}
                                                    class="form-control input"
                                                /><i class="fa fa-eye" onClick={this.toggleShow} aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>)

                            }
                            <div class="form-group row">
                                <div class="col submit">
                                    <button type="submit" class="btn btn-primary btn-lg submit-button"> {loading ? <LoadingSpinner /> : "SUBMIT"}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        )
    }
}
