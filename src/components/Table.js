import React from 'react';
import { Pagination } from './Pagination';

class Table extends React.Component {
  render() {
    const startIdx = this.props.pageNumber *  this.props.perPage;
    const endIdx = (this.props.pageNumber + 1) * this.props.perPage;
    return (
      <div>
        <table className="routes-table">
          <thead>
            <tr>
              <th>Airline</th>
              <th>Source Airport</th>
              <th>Destination Airport</th>
            </tr>
          </thead>
          <tbody>
            {this.props.routes.slice(startIdx, endIdx)}
          </tbody>
        </table>
        <footer>
          <Pagination
            perPage={this.props.perPage}
            numberOfRoutes={this.props.numberOfRoutes}
            start={startIdx + 1}
            end={endIdx > this.props.numberOfRoutes ? this.props.numberOfRoutes : endIdx}
            handleBackClick={this.props.handleBackClick}
            handleNextClick={this.props.handleNextClick}
            pageNumber={this.props.pageNumber}
          />
       </footer>
     </div>
    )
  }
}

class Route extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.airline}</td>
        <td>{this.props.srcAirport}</td>
        <td>{this.props.destAirport}</td>
      </tr>
    )
  }
}

export { Table, Route };
