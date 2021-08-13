import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    // process the  error
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Some thing went wrong</div>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
