import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import allGames from './allgames.js'
import Filters from './filters.js'

/*checkbox group*/
const OPTIONS = [];
/*Filter groups*/
const group1 = [];
const group2 = [];
const group3 = [];
const group4 = [];
const group5 = [];
const group6 = [];
const group7 = [];
const group8 = [];
const group9 = [];
const group10 = [];
const group11 = [];
const group12 = [];
const group13 = [];
const group14 = [];
var merged = [];
const dynamic = [];
const slow = [];
const final = [];

/*Operation runs on passing "allGames" indexes*/
for (var i = 0; i < allGames.length; i++){
  OPTIONS.push(i)
}

class App extends Component {
  state = {
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
  };

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };


  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    /*Filter groups have to be reset before running another request. Do not use sets. */
    group1.length = 0;
    group2.length = 0;
    group3.length = 0;
    group4.length = 0;
    group5.length = 0;
    group6.length = 0;
    group7.length = 0;
    group8.length = 0;
    group9.length = 0;
    group10.length = 0;
    group11.length = 0;
    group12.length = 0;
    group13.length = 0;
    group14.length = 0;
    merged.length = 0;
    dynamic.length = 0;
    slow.length = 0;
    final.length = 0;

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        if ( (document.getElementById("actors").value >= allGames[parseInt(checkbox)].minAct) &&
         !((allGames[parseInt(checkbox)].music === true &&
          document.getElementById("musician").value === "false"))
          ) { 
        switch(allGames[parseInt(checkbox)].group) {
          case 1:
            group1.push(checkbox);
            break;
          case 2:
            group2.push(checkbox);
            break;
          case 3:
            group3.push(checkbox);
            break;
          case 4:
            group4.push(checkbox);
            break;
          case 5:
            group5.push(checkbox);
            break;
          case 6:
            group6.push(checkbox);
            break;
          case 7:
            group7.push(checkbox);
            break;
          case 8:
            group8.push(checkbox);
            break;
          case 9:
            group9.push(checkbox);
            break;
          case 10:
            group10.push(checkbox);
            break;
          case 11:
            group11.push(checkbox);
            break;
          case 12:
            group12.push(checkbox);
            break;
          case 13:
            group13.push(checkbox);
            break;
          case 14:
            group14.push(checkbox);
            break;
          default:
            break;
          }         
        }       
      });
    
  
    merged = merged.concat(group1);
    
    /*If games are similar, only one (of each kind) will remain.*/
    function goAwaySimilar(groupname) {
      if (groupname.length > 0) {
        merged = merged.concat(groupname[Math.floor(Math.random() * groupname.length)]);
      }
    }

    goAwaySimilar(group2);
    goAwaySimilar(group3);
    goAwaySimilar(group4);
    goAwaySimilar(group5);
    goAwaySimilar(group6);
    goAwaySimilar(group7);
    goAwaySimilar(group8);
    goAwaySimilar(group9);
    goAwaySimilar(group10);
    goAwaySimilar(group11);
    goAwaySimilar(group12);
    goAwaySimilar(group13);
    goAwaySimilar(group14);

    if (merged.length < document.getElementById("showtime").value) {
      document.getElementById("result").innerHTML = "Sorry, ale nic z tego nie ulepię.";
    } else {
      for (var i = 0; i < merged.length; i++) {
        if (allGames[parseInt(merged[i])].dynamic === true) {
          dynamic.push(merged[i]);
        } else {
          slow.push(merged[i]);
        }
      }
      
      function randomize(groupname) {
        var ctr = groupname.length, temp, index;
        while (ctr > 0) {
          index = Math.floor(Math.random() * ctr);
          ctr--;
          temp = groupname[ctr];
          groupname[ctr] = groupname[index];
          groupname[index] = temp;
        }
      }
      randomize(dynamic);
      randomize(slow);

      

      if (dynamic.length < slow.length) {
        var dif = slow.length - dynamic.length;
        for (var j = 0; j < dif; j++) {
          slow.pop();
        }
      }

      if (slow.length + dynamic.length < document.getElementById("showtime").value) {
        document.getElementById("result").innerHTML = "Sorry, ale nic z tego nie ulepię.";
      } else {
        if (slow.length + dynamic.length > document.getElementById("showtime").value) {
          var finDif = slow.length + dynamic.length - document.getElementById("showtime").value;
          for (var k = 0; k < finDif; k++) {
            if (slow.length >= dynamic.length) {
              slow.pop();
            } else {
              dynamic.pop();
            }
          }
        }
        if (dynamic.length === slow.length) {
          for (var l = 0; l < slow.length; l++) {      
              final.push("<br>" + allGames[parseInt(slow[l])].name);
              final.push("<br>" + allGames[parseInt(dynamic[l])].name);
            }
        } else {
          for (var m = 0; m < dynamic.length; m++) {      
            final.push("<br>" + allGames[parseInt(dynamic[m])].name);
            if (m < slow.length) {
              final.push("<br>" + allGames[parseInt(slow[m])].name);
            }          
          }         
        }
        document.getElementById("result").innerHTML = final;
      }

    }
  
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  

  render() {
    return (
      <div className="container">
      Wybierz gry, które wasza grupa umie zagrać oraz określ warunki, w jakich gracie.
      Improlister "odcedzi" gry podobne oraz te, do których brakuje wam osób i pozostałe poprzeplata pod kątem dynamiki występu.
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <div className="form-group mt-2">
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.selectAll}
                >
                  Zaznacz wszystkie
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.deselectAll}
                >
                  Odznacz wszystkie
                </button>
      
                <Filters />
            
                <button type="submit" className="btn btn-primary">
                  Wygeneruj listę
                </button>
              </div>
            </form>
            <div id="result"></div>
          </div>
        </div>
       
        <div>
        </div>
      </div>

    );
  }
}

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="form-check col-sm-4">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {allGames[label].name}
    </label>
  </div>
);


ReactDOM.render(<App />, document.getElementById('root'))