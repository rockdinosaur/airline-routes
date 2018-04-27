import React, { Component } from 'react';
import './App.css';
import data from './data'
import { Table, Route } from './components/Table'
import { FilterForm } from './components/FilterForm'
import { Map } from './components/Map'

class App extends React.Component {
  state = {
    routes: data.routes,
    airlines: data.airlines,
    airports: data.airports,
    airlineFilterStatus: "off",
    airportFilterStatus: "off",
    pageNumber: 0,
    perPage: 25,
    numberOfRoutes: data.routes.length,
  };

  handleSelect = (listName, itemId) => {
    if (listName.toLowerCase() === 'airports') {
      if (itemId === 'all') {
        this.setState(prevState => ({ airportFilterStatus: "off" }), this.applyFilters)
      } else {
        this.setState(prevState => ({ airportFilterStatus: itemId }), this.applyFilters)
      }
    } else if (listName.toLowerCase() === 'airlines') {
      if (itemId === 'all') {
        this.setState(prevState => ({ airlineFilterStatus: "off" }), this.applyFilters)
      } else {
        this.setState(prevState => ({ airlineFilterStatus: itemId }), this.applyFilters)
      }
    }
  }

  applyFilters = () => {
    if (this.state.airlineFilterStatus === 'off' && this.state.airportFilterStatus === 'off') {
      this.setState(prevState => (
        {
          routes: data.routes,
          numberOfRoutes: data.routes.length,
          pageNumber: 0,
        }
      ))
    } else if (this.state.airportFilterStatus === 'off') {
      const currentRoutes = data.routes.filter(route => route.airline.toString() === this.state.airlineFilterStatus);
      this.setState(prevState => (
        {
          routes: currentRoutes,
          numberOfRoutes: currentRoutes.length,
          pageNumber: 0,
        }
      ))
    } else if (this.state.airlineFilterStatus === 'off') {
      const currentRoutes = data.routes.filter(
      route => route.src === this.state.airportFilterStatus || route.dest === this.state.airportFilterStatus)
      this.setState(prevState => (
        {
          routes: currentRoutes,
          numberOfRoutes: currentRoutes.length,
          pageNumber: 0,
        }
      ))
    } else {
      const currentRoutes = data.routes.filter(
      route => route.src === this.state.airportFilterStatus || route.dest === this.state.airportFilterStatus).filter(
      route => route.airline.toString() === this.state.airlineFilterStatus)
      this.setState(prevState => (
        {
          routes: currentRoutes,
          numberOfRoutes: currentRoutes.length,
          pageNumber: 0,
        }
      ))
    }
  }

  resetFilters = () => {
    this.setState(prevState => ({
      airlineFilterStatus: "off",
      airportFilterStatus: "off",
    }), this.applyFilters)
  }

  goBackAPage = () => {
    if (this.state.pageNumber > 0) {
      this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1}))
    }
  }

  goToNextPage = () => {
    if (this.state.pageNumber + 1 < Math.floor(this.state.numberOfRoutes / this.state.perPage)) {
      this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1}))
    }
  }

  render() {
    const routesPerPage = 25;

    const routesInfo = this.state.routes.map(route => {
      let airlineInfo = this.state.airlines.filter(airline => airline.id === route.airline)[0]
      let srcAirport = this.state.airports.filter(airport => airport.code === route.src)[0]
      let destAirport = this.state.airports.filter(airport => airport.code === route.dest)[0]
      return {
        airline: airlineInfo.name,
        srcAirport: srcAirport.name,
        destAirport: destAirport.name,
        y1: srcAirport.lat,
        x1: srcAirport.long,
        y2: destAirport.lat,
        x2: destAirport.long,
      }
    })

    const routeComponents = routesInfo.map(info => {
      return (
        <Route
          airline={info.airline}
          srcAirport={info.srcAirport}
          destAirport={info.destAirport}
        />
      )
    })

    const routeCoordinates = routesInfo.map(info => {
      return (
        <g key="">
          <circle className="source" cx={info.x1} cy={info.y1}>
            <title></title>
          </circle>
          <circle className="destination" cx={info.x2} cy={info.y2}>
            <title></title>
          </circle>
          <path d={`M${info.x1} ${info.y1} L ${info.x2} ${info.y2}`} />
        </g>
      )
    })

    const airlines = [
      <option
        value="all"
        selected={this.state.airlineFilterStatus === 'off' ? true : false}
      >
        All Airlines
      </option>
      ].concat(this.state.airlines.map(airline => {
      return (
        <option
          value={airline.id}
          disabled={!this.state.routes.some(route => {
            return route.airline === airline.id;
          })}
        >
          {airline.name}
        </option>
      )
    }))

    const airports = [
      <option
        value="all"
        selected={this.state.airportFilterStatus === 'off' ? true : false}
      >
        All Airports
      </option>
      ].concat(
      this.state.airports.map(airport => {
      return (
        <option
          value={airport.code}
          disabled={!this.state.routes.some(route => {
            return route.src === airport.code || route.dest === airport.code;
          })}
        >
          {airport.name}
        </option>
      )
    }))

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <div>
          <Map
            coordinates={routeCoordinates}
          />
        </div>
        <section>
          <FilterForm
            airlines={airlines}
            airports={airports}
            handleSelect={this.handleSelect}
            handleClearClick={this.resetFilters}
          />
          <Table
            rows=""
            format=""
            routes={routeComponents}
            perPage={routesPerPage}
            pageNumber={this.state.pageNumber}
            numberOfRoutes={this.state.numberOfRoutes}
            handleBackClick={this.goBackAPage}
            handleNextClick={this.goToNextPage}
          />
        </section>
      </div>
    );
  }
}

export default App;
