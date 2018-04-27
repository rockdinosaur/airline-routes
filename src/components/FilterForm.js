import React from 'react';

class FilterForm extends React.Component {
  render() {
    return (
      <div>
        <span>Show routes on</span>
        <FilterSelect
          name="airlines"
          options={this.props.airlines}
          handleSelect={this.props.handleSelect}
        />
        <span>flying in or out of</span>
        <FilterSelect
          name="airports"
          options={this.props.airports}
          handleSelect={this.props.handleSelect}
        />
        <ClearFilterBtn
          handleClearClick={this.props.handleClearClick}
        />
      </div>
    )
  }
}

class FilterSelect extends React.Component {
  handleSelect = event => (
    this.props.handleSelect(this.props.name, event.target.value)
  );

  render() {
    return (
      <select
        name={this.props.name}
        onChange={this.handleSelect}
      >
        {this.props.options}
      </select>
    )
  }
}

class ClearFilterBtn extends React.Component {
  handleClearClick = event => (
    this.props.handleClearClick()
  );

  render() {
    return (
      <button
        onClick={this.handleClearClick}
      >
        Show All Routes
      </button>
    )
  }
}

export { FilterForm, FilterSelect, ClearFilterBtn };
