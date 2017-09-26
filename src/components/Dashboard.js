import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSeries, deleteSeries } from '../actions';
import StageRow from './StageRow';
import './Dashboard.css';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      isEditingLabel: false,
      labelValue: '', 
      addStage: false 
    };
  }

  componentWillMount() {
    this.setState({ labelValue: this.props.label });
  }

  handleClickSave() {
    if (this.state.labelValue.length > 0) {
      const { id } = this.props;
      const label = this.state.labelValue;
      this.props.updateSeries({ id, label });
      this.setState({ isEditingLabel: false });
    }
  }

  handleClickDelete() {
    const { id } = this.props;
    this.props.deleteSeries({ id });
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-header">  
          {this.renderLabel()}
          {this.renderLabelButtons()}
        </div>
        <table>
          <thead>
            <tr>
              <th>Email Name</th>
              <th style={{ width: '100px' }}>Days to Send</th>
              <th>SendGrid Template Name</th>
              <th style={{ width: '150px' }}></th>
            </tr>
          </thead>
          <tbody>
            {this.renderStages()}
          </tbody>
        </table>
        {this.newStageButton()}
      </div>
    );
  }

  renderLabel() {
    if (this.state.isEditingLabel) {
      return (
        <div style={{ width: '100%'}}>
          <input value={this.state.labelValue} 
            onChange={e => this.setState({ labelValue: e.target.value })} />
          {(this.state.labelValue.length === 0) && <div className="error">Enter a value</div>}
        </div>
      );
    } else {
      return <h3>{this.state.labelValue}</h3>;
    }
  }

  renderLabelButtons() {
    if (this.state.isEditingLabel) {
      const saveClass = (this.state.labelValue.length > 0) ? "save-button" : 'save-button inactive';

      return (
        <div className="dashboard-header-options">
          <button onClick={() => this.handleClickSave()}
            className={`${saveClass} button-1 label-button`}>Save</button>
          <button onClick={() => this.setState({
            isEditingLabel: false,
            labelValue: this.props.label
          })} className="button-1 label-button">Cancel</button>
        </div>
      );
    } else {
      return (
        <div className="dashboard-header-options">
          <button onClick={() => this.setState({ isEditingLabel: true })}
            className="label-button edit-button button-1">Edit</button>
          <button onClick={() => this.handleClickDelete()}
            className="label-button remove-button button-1">Delete</button>
        </div>
      );
    }    
  }

  renderStages() {
    if (!this.props.stages) { return null; }

    let nextIndex;
    let nextBackground;

    const series = this.props.stages.map(({ id, label, daysToSend, sgTemplateID }, index) => {
      const backgroundColor = (index%2 === 0) ? 'white' : '#f2f2f2';
      const props = { id, label, daysToSend, backgroundColor, sgTemplateID, 
        emailSeryId: this.props.id 
      };
      nextIndex = index + 1;
      nextBackground = (backgroundColor === 'white') ? '#e6e6e6' : 'white';

      return <StageRow key={id} {...props} />
    });

    if (this.state.addStage) {
      const props = {
        id: '',
        label: '',
        daysToSend: '',
        sgTemplateID: this.props.sgTemplateID,
        backgroundColor: nextBackground,
        isEditable: true,
        isNew: true,
        emailSeryId: this.props.id,
        removeNewStage: () => this.setState({ addStage: false })
      }

      series.push(<StageRow key={nextIndex + 12903432098423048} {...props} />)
    }

    return series;
  }

  renderNewStage() {
    return (
      <tr className="new-stage-row">
        <td className="table-cell-left"><input /></td>
        <td><input className="days-to-send" /></td>
        <td className="table-cell-left"><input /></td>
        <td>
          <button className="save-button button-1" onClick={() => this.setState({ addStage: false })}>
            SAVE
          </button>   
        </td>
      </tr>
    );
  }

  newStageButton() {
    if (this.state.addStage) {
      return (
        <button className="remove-button button-1" onClick={() => this.setState({ addStage: false })}>
          <i className="material-icons remove">remove_circle</i>
          Remove New Email Series
        </button>        
      );
    } else {
      return (
        <button className="add-button button-1" onClick={() => this.setState({ addStage: true })}>
          <i className="material-icons add">add_circle</i>
          Add Email to Series
        </button>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSeries: params => dispatch(updateSeries(params)),
    deleteSeries: params => dispatch(deleteSeries(params))
  }
}

Dashboard = connect(null, mapDispatchToProps)(Dashboard);
export default Dashboard
