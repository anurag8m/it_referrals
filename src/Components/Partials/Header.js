import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.css";
import logo from "../logo.png";
import LoadingSpinner from "../loadingspinner.component";
import Modal from "react-bootstrap/Modal";
import { loginUser } from "../../Actions/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const emailRegex = RegExp(
  /^[a-zA-Z0-9_\-\.]+@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
);

const formValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      email: "",
      name: "",
      password: "",
      loading: false,
      message: "",
      formErrors: {
        email: "",
        password: ""
      }
    };

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // if (localStorage.usertoken && localStorage.usertoken != 'undefined') {
    //     const token = localStorage.usertoken;
    //     const decoded = jwt_decode(token);
    //     console.log(decoded);
    //     this.setState({
    //         name: decoded.name
    //     })
    // }
  }

  onChange(e) {
    const { name, value } = e.target;
    // console.log("name :", name);
    // console.log("value :", value);
    this.setState({ [e.target.name]: e.target.value });
    let formErrors = this.state.formErrors;

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid Email Address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Minimum 6 character required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
  }

  onSubmit(e) {
    if (formValid(this.state.formErrors)) {
      this.setState({
        loading: true
      });
      e.preventDefault();
      const user = {
        email: this.state.email,
        password: this.state.password
      };

      this.props.loginUser(user).then((res, err) => {
        // console.log(res);
        if (res.Success == "0") {
          this.setState({
            loading: false,
            message: res.Message
          });
        } else {
          // if (localStorage.usertoken && localStorage.usertoken != 'undefined') {
          //     const token = localStorage.usertoken;

          //     const decoded = jwt_decode(token);
          //     console.log(decoded);
          //     this.setState({
          //         name: decoded.name
          //     })
          // }
          this.handleHide();
        }
      });
    } else {
      e.preventDefault();
      console.error("FORM ERROR - DISPLAY ERROR MESSAGE");
    }
  }

  render() {
    const { loading, message } = this.state;
    const { formErrors } = this.state;

    const loginRegLink = (
      <div className="" style={{ display: "inline-flex" }}>
        <li class="nav-item">
          <a
            onClick={this.handleShow}
            class="nav-link"
            style={{ cursor: "pointer" }}
          >
            Login&nbsp;<i class="fa fa-user" aria-hidden="true"></i>
          </a>
        </li>
        {/* <li class="nav-item">
                    <a class="nav-link" href="/">SignUp&nbsp;<i class="fa fa-lock" aria-hidden="true"></i></a>
                </li> */}
        <li class="nav-item">
          <a class="nav-link" href="/">
            AboutUs
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">
            ContactUs
          </a>
        </li>
      </div>
    );

    const userLink = () => (
      <div className="" style={{ display: "inline-flex" }}>
        <li class="nav-item">
          <Link className="nav-link" to="/">
            {this.props.userlogin.name}
          </Link>
        </li>
        <li class="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">
            AboutUs
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">
            ContactUs
          </a>
        </li>
      </div>
    );

    return (
      <nav class="navbar navbar-expand-md navbar-light bg-basic">
        <Link to="/">
          <img src={logo} />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse w-100 flex-md-column"
          id="navbarTogglerDemo03"
        >
          <ul class="navbar-nav ml-auto small mb-2 mb-md-0">
            {/* <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="country-image" src="https://www.countryflags.io/be/shiny/64.png" />&nbsp;English
                        </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li> */}
            {localStorage.usertoken && localStorage.usertoken != "undefined"
              ? userLink()
              : loginRegLink}
          </ul>
        </div>

        {/* model popup */}
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          centered
          size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title text-center">
              IT Referrals Login
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="form-group" id="sampleTableForEmployee">
              {message !== "" && (
                <div class="alert alert-danger alert-dismissible" role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-class-field">
                      <div className="form-group">
                        <label htmlFor="email">
                          <b>Email</b>
                        </label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <span className="glyphicon glyphicon-envelope" />
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            style={{ width: "100%" }}
                            placeholder="anyone@example.com"
                            required="required"
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                          {formErrors.email && (
                            <span
                              className="errorMessage"
                              style={{ color: "red", fontSize: "14px" }}
                            >
                              {formErrors.email}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">
                          <b>Password</b>
                        </label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <span className="glyphicon glyphicon-envelope" />
                          </span>
                          <input
                            type="password"
                            className={
                              formErrors.password.length > 0
                                ? "error form-control"
                                : "form-control"
                            }
                            style={{ width: "100%" }}
                            id="password"
                            name="password"
                            placeholder="********"
                            required="required"
                            value={this.state.password}
                            onChange={this.onChange}
                          />
                          {formErrors.password.length > 0 && (
                            <span
                              className="errorMessage"
                              style={{ color: "red", fontSize: "14px" }}
                            >
                              {formErrors.password}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block pull-right"
                          id="btnContactUs"
                        >
                          {loading ? <LoadingSpinner /> : "Login"}
                        </button>
                        <br />
                        <br />
                        {/* <p className="forgetpassword"><a href="">Forget my password ?</a></p> */}
                        {/* <p className="signup">Don't have an account? <Link to="/register"> Create Now</Link> </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <hr />
          </Modal.Body>
        </Modal>
        {/* end modal popup */}
      </nav>
    );
  }
}

Header.propTypes = {
  loginUser: PropTypes.func.isRequired,
  userlogin: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  userlogin: state.userlogin
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Header);
