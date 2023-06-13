import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";


export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push("/auth/login");
        window.location.reload();
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push("/auth/login");
        window.location.reload();
      }
    }

    PropTypes = {
      router: PropTypes.object,
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.isAuthenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
