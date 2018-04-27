import React from 'react';

class Pagination extends React.Component {
  render() {
    return (
      <div>
        <RouteCount
          numberOfRoutes={this.props.numberOfRoutes}
          pageNumber={this.props.pageNumber}
          start={this.props.start}
          end={this.props.end}
        />
        <NavButtons
          handleBackClick={this.props.handleBackClick}
          handleNextClick={this.props.handleNextClick}
          numberOfRoutes={this.props.numberOfRoutes}
          end={this.props.end}
          pageNumber={this.props.pageNumber}
        />
      </div>
    )
  }
}

class RouteCount extends React.Component {
  render() {
    return (
      <p>
        Showing {this.props.start}-{this.props.end} of {this.props.numberOfRoutes} routes.
      </p>
    )
  }
}

class NavButtons extends React.Component {
  render() {
    return (
      <p>
        <BackButton
          handleBackClick={this.props.handleBackClick}
          pageNumber={this.props.pageNumber}
        />
        <NextButton
          handleNextClick={this.props.handleNextClick}
          numberOfRoutes={this.props.numberOfRoutes}
          end={this.props.end}
        />
      </p>
    )
  }
}

class BackButton extends React.Component {
  render() {
    return(
      <button
        onClick={this.props.handleBackClick}
        disabled={this.props.pageNumber === 0}
      >
      Previous Page
      </button>
    )
  }
}

class NextButton extends React.Component {
  render() {
    return(
      <button
        onClick={this.props.handleNextClick}
        disabled={this.props.end >= this.props.numberOfRoutes}
      >
      Next Page
      </button>
    )
  }
}

export { Pagination };
