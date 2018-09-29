import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import * as moment from 'moment';
const EVENTS = ['ProductPacked', 'ProductShipped', 'ProductBought'];

class ProductTimePoints extends Component {
  state = { timePoints: undefined, formattedTimePoints: undefined };
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    let descTimePoints = [];
    const srcTimePoints = this.props.timePoints;
    const timePoints = srcTimePoints.split('==========');
    timePoints.map((timePointStr, index) => {
      const timePoint = [];
      const splittedTimePoint = timePointStr.split(';');
      if (splittedTimePoint[0]) {
        timePoint.push(splittedTimePoint[0]);
      }
      if (splittedTimePoint[1]) {
        timePoint.push(moment.unix(splittedTimePoint[1]).format());
      } else {
        timePoint.push('N/A');
      }
      timePoint.push(EVENTS[index]);
      descTimePoints.push(timePoint);
    });
    this.setState({formattedTimePoints: descTimePoints});
  }

  render() {
    if (typeof this.state.formattedTimePoints === 'undefined') {
      return (
        <div></div>
      );
    }
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Event</th>
              <th>RecordedBy</th>
              <th>UpdatedAt</th>
            </tr>
          </thead>
          <tbody>
            {this.state.formattedTimePoints.map((timePoint, index) => <tr key={index}><td>{timePoint[2]}</td><td>{timePoint[0]}</td><td>{timePoint[1]}</td></tr>)}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ProductTimePoints;