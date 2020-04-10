import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1077304847122-mhbvf9gsi7t1n0ddsl6k1apam0a2vp67.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.authInstance = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.authInstance.isSignedIn.get());
          this.authInstance.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = AreWeSignedIn => {
    if (AreWeSignedIn) {
      // check status of state
      this.props.signIn(this.authInstance.currentUser.get().getId()); // calls action creator that returns type of "SIGN_IN"
    } else {
      this.props.signOut(); // calls action creator that returns type of "SIGN_OUT"
    }
  };

  AttemptSignIn = () => {
    this.authInstance.signIn();
  };

  AttemptSignOut = () => {
    this.authInstance.signOut();
  };

  renderAuthButton() {
    if (this.props.AreWeSignedIn === null) {
      return null;
    } else if (this.props.AreWeSignedIn) {
      return (
        <button onClick={this.AttemptSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.AttemptSignIn} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { AreWeSignedIn: state.authState.AreWeSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
