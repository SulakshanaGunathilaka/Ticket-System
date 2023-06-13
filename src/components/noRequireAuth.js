import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StaticRouter } from 'react-router';

export default function(ComposedComponent) {
	class NotAuthentication extends Component {
		componentWillMount() {
			if (this.props.authenticated) {
				 
					this.props.history.push('/home');
				 
			}
		}

		// componentWillUpdate(nextProps) {
		// 	if (nextProps.authenticated) {
		// 		this.props.history.push('/dashboard');
		// 	}
		// }

		PropTypes = {
			router: PropTypes.object
		};

		render() {
			return <ComposedComponent {...this.props} />;
		}
	}

	function mapStateToProps(state) {
		return { 
			authenticated: state.auth.isAuthenticated,
			user: state.auth.item
		 };
	}

	return connect(mapStateToProps)(NotAuthentication);
}
