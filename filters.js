import React, { Component } from 'react';

class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actors: 2,
      musician: true,
      showtime: 3,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return(
      <div>
        Gramy w 
        <select name="actors" id="actors" value={this.state.actors} onChange={this.handleChange}>
        <option value="2">2 osoby</option>
          <option value="3">3 osoby</option>
          <option value="4">4 osoby</option>
          <option value="5">5 osób</option>
          <option value="6">6 lub więcej osób</option>
        </select>
        (+prowadzący)
        <select name="musician" id="musician" value={this.state.musician} onChange={this.handleChange}>
          <option value="true">z muzykiem</option>
          <option value="false">bez muzyka</option>
        </select>
        Planowana długość występu:
        <select name="showtime" id="showtime" value={this.state.showtime} onChange={this.handleChange}>
          <option value="3">3 gry</option>
          <option value="4">4 gry</option>
          <option value="5">5 gier</option>
          <option value="6">6 gier</option>
          <option value="7">7 gier</option>
          <option value="8">8 gier</option>
          <option value="9">9 gier</option>
          <option value="10">10 gier</option>
          <option value="11">11 gier</option>
          <option value="12">12 gier</option>
          <option value="13">13 gier</option>
          <option value="14">14 gier</option>
        </select>
        
      </div>
    )
  }
}

export default Filters