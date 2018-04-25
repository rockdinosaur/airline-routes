import React, { Component } from 'react';
import './App.css';
import data from './data'


class App extends React.Component {
  state = {
    routes: [],
    airlines: [],
    airports: [],
  };

  componentDidMount() {
    this.setState(prevState => {
      return {
        routes: data.routes,
        airlines: data.airlines,
        airports: data.airports,
      }
    })
  }

  render() {
    this.state.routes.forEach(route => {
      console.log(route.airline);
    })

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <RouteList
            routes={this.state.routes}
            airlines={this.state.airlines}
            airports={this.state.airports}
          />
        </section>
      </div>
    );
  }
}

class RouteList extends React.Component {
  render() {
    <table>
      <thead>
        <tr>
          <th>Airline</th>
          <th>Source Airport</th>
          <th>Destination Airport</th>
        </tr>
      </thead>
      <tbody>
        {routeComponents}
      </tbody>
    </table>
  }
}

class Route extends React.Component {
  render() {
    <tr>
      <td>westjet</td>
      <td>toronto</td>
      <td>tokyo</td>
    </tr>
  }
}

export default App;
