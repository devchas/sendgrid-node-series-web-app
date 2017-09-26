import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

class SeriesUsers extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users) { this.setState({ users: nextProps.users }); }
  }

  componentWillMount() {
    if (this.props.users) { this.setState({ users: this.props.users }); }
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Current / Next Email</th>
            <th>Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {this.renderUsers()}
        </tbody>
      </table>
    );
  }

  renderUsers() {
    return this.state.users.map(({ id, email, firstName, lastName, startDate }, index) => {
      const nextEmail = this.getNextEmail(startDate);

      const backgroundColor = (index%2 === 0) ? 'white' : '#f2f2f2';
      return (
        <tr key={id} style={{ backgroundColor }}>
          <td className="table-cell-left">{email}</td>
          <td className="table-cell-left">{`${firstName} ${lastName}`}</td>
          <td className="table-cell-left">{nextEmail.label}</td>
          <td className="table-cell-left">{nextEmail.deliveryDate}</td>
        </tr>
      );
    });
  }

  getNextEmail(startDate) {
    let date = new Date(startDate).getTime();
    let today = new Date().getTime();
    let timeDelta = today - date;
    timeDelta = Math.floor(timeDelta / (1000 * 3600 * 24));

    const stagesToReceive = _.filter(this.props.stages, o => o.daysToSend >= timeDelta);
    const nextStage = _.minBy(stagesToReceive, o => o.daysToSend);

    if (nextStage) {
      let deliveryDate = today + (nextStage.daysToSend * 1000 * 3600 * 24);
      deliveryDate = new Date(deliveryDate);
      deliveryDate = moment(deliveryDate).format("MMMM Do, YYYY");
      return { label: nextStage.label, deliveryDate }
    } else {
      return { label: "Completed Series", deliveryDate: "NA" }
    }
  }
}

export default SeriesUsers;