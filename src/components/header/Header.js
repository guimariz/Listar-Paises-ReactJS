import React, { Component } from 'react';

export default class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  };

  render() {
    const { filter, countryCount, totalPopulation } = this.props;
    return (
      <div>
        <input type="text" value={filter} onChange={this.handleInputChange} />
        <br />
        <span>
          Países: {countryCount} <br />
        </span>
        <span>População: {totalPopulation}</span>
      </div>
    );
  }
}
