//React stuff
import React, { Component } from "react";
import PropTypes from "prop-types";

//Material-ui components
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import User from "material-ui/svg-icons/social/person";
import Lock from "material-ui/svg-icons/action/lock";
import { grey500 } from "material-ui/styles/colors";
import CircularProgress from "material-ui/CircularProgress";

//Axios for Ajax
import axios from "axios";

//Alert ui from react-boostrap
import Alert from "react-bootstrap/lib/Alert";

//Creating context
export const TokenContext = React.createContext();

//The Auth components
class Auth extends Component {
  constructor(props) {
    super(props);

    //Sign out function
    this.signOut = () => {
      localStorage.removeItem("token");
      this.props.history.push("/");
    };

    //Component states
    this.state = {
      loading: false,
      token: localStorage.getItem("token"),
      error: false,
      signOut: this.signOut
    };
  }

  //Login function
  login = data => {
    const url = "https://restaurantportal.herokuapp.com/api/v1/user_token";

    const authData = {
      auth: data
    };

    axios({
      method: "post",
      url,
      data: authData
    })
      .then(async res => {
        await localStorage.setItem("token", res.data.jwt);

        await this.setState({
          loading: false,
          token: res.data.jwt
        });

        this.props.history.push("/profile");
      })
      .catch(error => {
        if (error) {
          this.setState({
            error: true
          });
        }
      });
  };

  //Sign up function
  signUp = data => {
    console.log(data);
    const url = "https://restaurantportal.herokuapp.com/api/v1/users";

    axios({
      method: "post",
      url,
      data
    })
      .then(() => {
        const { email, password } = data;

        this.login({ email, password });
      })
      .catch(error => {
        if (error) {
          this.setState({
            error: true
          });
        }
      });
  };

  //Auth form submission function
  onSubmit = e => {
    e.preventDefault();

    const data = e.target;
    const email = data[0].value;
    const password = data[1].value;

    this.setState({
      loading: true
    });

    //If submit button is "Login", run the login function
    if (this.props.submitButtonLabel === "Login") {
      const data = {
        email,
        password
      };

      this.login(data);
    }

    //If submit button is "Sign Up", run the sign up function
    if (this.props.submitButtonLabel === "Sign Up") {
      const password_confirmation = data[2].value;

      const signUpData = {
        role_id: "1",
        email,
        password,
        password_confirmation
      };

      this.signUp(signUpData);
    }
  };

  //Component render function
  render() {
    //Props destructuring
    const { submitButtonLabel, children } = this.props;

    //State destructuring
    const { loading, token, error } = this.state;
    console.log(this.state);
    return (
      <div>
        {/* If token exists, render the children of the Auth component */}
        {token ? (
          <TokenContext.Provider value={this.state}>
            {children}
          </TokenContext.Provider>
        ) : (
          //If token doesn't exist, render the Auth form
          <form onSubmit={this.onSubmit}>
            <div className="field-line">
              <User style={styles.icons} />
              <TextField hintText="Email" floatingLabelText="Email" />
            </div>

            <div className="field-line">
              <Lock style={styles.icons} />
              <TextField
                hintText="password"
                floatingLabelText="password"
                type="password"
              />
            </div>

            {submitButtonLabel === "Sign Up" && (
              <div className="field-line">
                <Lock style={styles.icons} />
                <TextField
                  hintText="password confirmation"
                  floatingLabelText="password confirmation"
                  type="password"
                />
              </div>
            )}

            <div className="button-line">
              <RaisedButton
                style={{ marginLeft: 10, marginTop: 10 }}
                type="submit"
                label={submitButtonLabel}
                primary
              />
            </div>

            <div>
              {loading && (
                <div style={{ margin: 20 }}>
                  <CircularProgress />
                </div>
              )}

              {error && (
                <Alert bsStyle="warning">
                  <strong>Holy guacamole!</strong> Please check your email or
                  password.
                </Alert>
              )}
            </div>
          </form>
        )}
      </div>
    );
  }
}

Auth.propTypes = {
  submitButtonLabel: PropTypes.string.isRequired,
  email: PropTypes.string
};

Auth.defaultProps = {
  email: ""
};

export default Auth;

const styles = {
  form: {
    marginBottom: 20
  },
  icons: {
    marginLeft: 10,
    marginRight: 10,
    color: grey500
  }
};
