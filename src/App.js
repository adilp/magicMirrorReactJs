import React, { Component } from 'react';


import logo from './logo.svg';
import './App.css';
import Moment from 'react-moment';
import moment from 'moment';
import { Col, Row, Container } from 'react-bootstrap';
import OurGroceriesClient from 'our-groceries-client';

import Clock from './components/Clock'

//import Clock from "./components/Clock"

class App extends Component {

  state = {
    temp: undefined,
    ayahArabic: 'empty',
    ayahEnglish: 'empty',
    ayahNumber: 'empty',

  }

  json = {
    "dt": "1566533882",
    "main": {
      "humidity": "19",
      "pressure": "1017",
      "temp": "299.08",
      "temp_max": "300.37",
      "temp_min": "297.59"
    },
    "name": "Detroit",
    "weather": [{
      "description": "clear sky",
      "icon": "01n",
      "id": "800",
      "main": "Clear"
    }]
  }





  componentDidMount() {

    // this.getWeather();
    this.convertfromKelvin(this.json.main.temp)
    this.randomQuranVerse()
  }


  // getWeather = async () => {
  //   var Api_Key = "7f37a2b9f7482193ae5615e23950a168";

  //   const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=4990729&appid=${Api_Key}`);
  //   //const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=4990729&appid=${Api_Key}`);


  //   const response = await api_call.json();

  //   console.log(response);

  //   //this.weatherList.push(response.list[0], response.list[1], response.list[2]);

  // }

  convertfromKelvin(temp) {
    var finalTemp = (temp - 273.15) * (9 / 5) + 32
    this.setState({ temp: finalTemp })
  }

  randomQuranVerse() {
    var aya = Math.floor(Math.random() * (6237 - 1 + 1)) + 1;

    fetch('http://api.alquran.cloud/ayah/' + aya + '/editions/quran-uthmani,en.pickthall')
      .then(response => response.json())
      //.then(data => this.setState({ ayah: data }));
      .then(data => {
        console.log("Ayah ", data.data[1])
        var ayahEnglishRes = data.data[1].text + ' (' + data.data[1].juz + ':' + data.data[1].number + ')'
        this.setState({ ayahArabic: data.data[0].text, ayahEnglish: ayahEnglishRes })
      });


  }

  groceries() {
    // var OurGroceriesClient = require('our-groceries-client');
    // or import OurGroceriesClient from 'our-groceries-client' 

    var username = "<adilpatel420@gmail.com>"
      , password = "<slowtrumpet>"
      , listName = "Shopping Lists"
      , itemName = "Apples"
      , quantity = 1;

    var client = new OurGroceriesClient();

    var handlers = {
      // Called when authentication completes, either success or failure 
      authComplete: function (result) {
        if (result.success) {
          client.getLists(handlers.getListsComplete);
        } else {
          console.log("Authentication Failed: " + result.error);
        }
      },
      // Called when fetching the list of lists completes, either success or failure 
      getListsComplete: function (result) {
        if (result.success) {
          var list = client.findList(result.response.shoppingLists, listName);
          console.log("this is the list: ", list)
          if (list) {
            client.getList(list.id, handlers.getListComplete);
          } else {
            console.log("Unable to find list: " + listName);
          }
        } else {
          console.log("Unable to get lists: " + result.error);
        }
      },
      // Called when fetching a single list completes, either success or failure 
      getListComplete: function (result) {
        var list = result.response.list;
        client.addToList(list.id, itemName, quantity, handlers.addToListComplete);
      },
      // Called after adding the item completes
      addToListComplete: function (result) {
        if (result.success) {
          console.log("Successfully added to list.");
        } else {
          console.log("Unable to add to list: " + result.error);
        }
      }
    }

    // Authenticate
    client.authenticate(username, password, handlers.authComplete);
  }


  render() {

    const AppStyles = {

      backgroundColor: 'black',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      fontFamily: 'Sawasdee',
      fontWeight: 500,
      textScale: '0.8em', // relative font-size of text. 1em ~= 16px
      paddingTop: '5%', // space from the top edge
      paddingLeft: '7%', // space from the left edge
      paddingRight: '6%', // space from the right edge
      paddingBottom: '0%', // space from the bottom edge
    };

    const textStyle = {

      color: 'white',
      fontSize: '1.5em',
    }

    const containerStyle = {

      alignSelf: 'flex-end',
      position: 'absolute',
      backgroundColor: 'black',
      fontFamily: 'Sawasdee',
      fontWeight: 500,
      textScale: '0.8em', // relative font-size of text. 1em ~= 16px

    }

    const containerStyle2 = {
      top: 0,
      left: 0,
      right: 0,
      flex: 1,
      alignSelf: 'flex-start',
      backgroundColor: 'black',
      fontFamily: 'Sawasdee',
      fontWeight: 500,
      textScale: '0.8em', // relative font-size of text. 1em ~= 16px
      paddingTop: '5%', // space from the top edge

      paddingBottom: '0%', // space from the bottom edge
    }

    //console.log("Next three days weather ", this.weatherList)
    console.log("Next three days weather ", this.json.main.temp)
    console.log("Icon ", this.json.weather[0].icon)
    // './components/icons' + this.json.weather[0].icon + '.png')



    return (
      <div style={AppStyles} className="App">


        <Row>
          <Col>
            <Clock
              temperature={this.state.temp}
            />
          </Col>

          <Col>
            <Row>
             
                
              <Col style={styles.symbol} class="col justify-content-end">
              <Row>
              <Row style={styles.highLow}>
                <Col xs={10}>
                  High: 85
                </Col>
                <Col xs={10}>
                  
                  Low: 45
                </Col>
                  
                  
              </Row>
                
              </Row>
                <img
                class="float-right"
                  style={styles.weatherImg}
                  role="presentation"
                  src={require('./components/icons/' + this.json.weather[0].icon + ".png")}
                />
              </Col>
            </Row>
          </Col>


        </Row>

        <Row className="Container">
          <Col xs={3}>
            <p style={textStyle}>{this.state.ayahArabic}</p>
            <p style={textStyle}>{this.state.ayahEnglish}</p>
          </Col>
          <Col xs={4} />
          
        </Row>
        <Row style={{ height: '1%' }} />
        <Row style={{ marginBottom: 100, marginTop: 50 }}>
          Message
    </Row>
        <Row
          style={{
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            width: '100%',
            padding: 60,
            paddingBottom: 0,
          }}>
          news
    </Row>
      </div>
    );
  }
}

export default App;


const styles = {
  container: {
    backgroundColor: 'black'
  },
  weatherImg: {
    maxWidth: '20%',
    height: 'auto',
  },
  highLow: {
    paddingLeft: 400,
    color: 'white',
      fontSize: '1.5em',
  },
  symbol: {
    width: 10
  }

};