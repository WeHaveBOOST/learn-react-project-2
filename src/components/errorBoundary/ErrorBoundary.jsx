import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  }

  componentDidCatch(err, errInfo) {
    console.error(err, errInfo);
    this.setState({
      error: true,
    })
  }

  render() {
    const {children}  = this.props;
    const {error} = this.state;

    if (error) return <h2>Something went wrong</h2>

    return children;
  }
}

export default ErrorBoundary;
