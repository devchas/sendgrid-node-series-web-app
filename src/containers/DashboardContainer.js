import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSeries, getSeriesById, getSGTemplates } from '../actions';
import Dashboard from '../components/Dashboard';
import CreateSeries from '../components/CreateSeries';

class DashboardContainer extends Component {
  componentWillMount() {
    this.props.getAllSeries();
    this.props.getSGTemplates();
  }

  render() {
    const { sgTemplates } = this.props;

    return (
      <div className="series-list-container">
        <CreateSeries />
        {this.props.seriesList.map((props, index) => {
          const backgroundColor = (index%2 === 0) ? 'white' : '#f2f2f2';
          const sgTemplateID = (sgTemplates.length > 0) ? sgTemplates[0].id : null;
          props = Object.assign({}, props, { sgTemplateID });

          return (
            <div key={props.id} className="dashboard-container" style={{ backgroundColor }}>
              <Dashboard {...props} />
            </div>
          );
        })}
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { series: { seriesList, emailSeries, sgTemplates } } = state;
  return { seriesList, emailSeries, sgTemplates };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllSeries: () => dispatch(getAllSeries()),
    getSeriesById: id => dispatch(getSeriesById(id)),
    getSGTemplates: () => dispatch(getSGTemplates())
  }
}

DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
export default DashboardContainer;