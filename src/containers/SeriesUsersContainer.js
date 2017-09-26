import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSeriesUsers } from '../actions';
import SeriesUsers from '../components/SeriesUsers';
import _ from 'lodash';

class SeriesUserContainer extends Component {
  componentWillMount() {
    this.props.getSeriesUsers(this.props.emailSeryId);
  }

  render() {
    return <SeriesUsers {...this.props} />
  }
};

function mapStateToProps(state, ownProps) {
  const { series: { seriesUserList } } = state;
  let users = _.filter(seriesUserList, o => ownProps.emailSeryId === o.emailSeryId)[0];
  users = (users) ? users.users : users;
  return { users };
}

function mapDispatchToProps(dispatch) {
  return {
    getSeriesUsers: emailSeryId => dispatch(getSeriesUsers(emailSeryId))
  }
}

SeriesUserContainer = connect(mapStateToProps, mapDispatchToProps)(SeriesUserContainer);
export default SeriesUserContainer;