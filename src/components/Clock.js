import React from 'react';

import moment from 'moment';
import { Col, Row } from 'react-bootstrap';

const styles = {
  container: {},
  clock: {
    color: 'white',
    fontSize: '6.3em',
    lineHeight: 1,
    lineWidth: 1,
  },
  clockSeconds: {
    color: 'white',
    fontSize: '0.4em',
    verticalAlign: 'top',
    paddingLeft: 1,
    textAlign: 'left',
  },
  smallText: {
    color: 'white',
    fontSize: '2.7em',
  },
};

export default class Clock extends React.Component {

  static defaultProps = {
    visible: true,
    showTemperature: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      date: new moment(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onEvent(event) {
    console.log(event);
  }

  tick() {
    this.setState({
      date: new moment(),
    });
  }

  render() {
    let day = this.state.date.format('dddd, LL');
    day = day.charAt(0).toUpperCase() + day.slice(1);

    return (
      <div hidden={!this.props.visible} style={styles.container}>
        <Row>

          <div style={styles.smallText}> {day}</div>

        </Row>
        <Row>
          <div style={styles.clock}>
            {this.state.date.format('HH:mm')}
            <span style={styles.clockSeconds}>{this.state.date.format('ss')}</span>
          </div>
        </Row>
        <Row>
          <p style={styles.smallText}>
            {this.props.temperature} °F
      </p>
        </Row>


      </div>
    );
  }
}