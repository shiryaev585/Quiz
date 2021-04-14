import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../../store/actions/authAction"

class Logout extends React.Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Redirect to={'/'} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
