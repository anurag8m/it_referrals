import React, { Component } from 'react'
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <footer className="page-footer pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 aboutus">
                            <h5>About Us</h5>
                            <p>The six degree of separation theory states that we are 6 people away from one another.<br />
                                We strive to implement this theory in the IT world.<br />
                                We are dedicated to finding you, who you want.</p>
                            <div className="row social" >
                                <a href="https://www.facebook.com/" className="fa fa-icon fa-facebook">&nbsp;</a>
                                <a href="https://twitter.com/" className="fa fa-icon fa-twitter"></a>
                                <a href="https://www.instagram.com/" className="fa fa-icon fa-instagram"></a>
                                <a href="https://www.google.com/" className="fa fa-icon fa-google"></a>
                                <a href="https://www.linkedin.com/" className="fa fa-icon fa-linkedin"></a>
                            </div>
                        </div>
                        <hr className="clearfix w-100 d-md-none" />
                        <div className="col-md-2 sitemap">
                            <h5>Sitemap</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="/">Analytics</a>
                                </li>
                                <li>
                                    <a href="/">Software Services</a>
                                </li>
                                <li>
                                    <a href="/">ChipDsg/Semicond.</a>
                                </li>
                                <li>
                                    <a href="/">Market Reserch</a>
                                </li>
                                <li>
                                    <a href="/">Cloud Computing</a>
                                </li>
                                <li>
                                    <a href="/">Product Software</a>
                                </li>
                                <li>
                                    <a href="/">Helthcare/Pharma</a>
                                </li>
                            </ul>
                        </div>
                        <hr className="clearfix w-100 d-md-none" />
                        <div className="col-md-2 itreferral" style={{ paddingTop: "0px" }}>
                            <h2>ITReferrals.ca</h2>
                            <p>All rights reserved. © 2019</p>
                        </div>
                    </div>
                </div>
            </footer>


        )
    }
}