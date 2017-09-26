import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSeries } from '../actions';

class CreateSeries extends Component {
  constructor() {
    super();
    this.state = { 
      isEditing: false,
      value: '',
      error: true
    };
  }

  handleChange(e) {
    const value = e.target.value;
    const error = (value === '') ? true : false;

    this.setState({ value, error });
  }

  handleSave() {
    if (!this.state.error) {
      this.props.createSeries({ 
        series: {
          label: this.state.value,
          stages: []
        }
      });
      this.setState({
        isEditing: false,
        value: '',
        error: true
      });
    }
  }

  render() {
    if (this.state.isEditing) {
      return <div>{this.renderForm()}</div>;  
    } else {
      return (
        <div className="create-series-container">
          <div>
            <button onClick={() => this.setState({ isEditing: true })} className="add-button button-1">
              <i className="material-icons add">add_circle</i>
              Create New Series
            </button>
          </div>
        </div>
      );
    }


  }

  renderForm() {
    const saveClass = (!this.state.error) ? "save-button" : 'save-button inactive';

    return (
      <div className="create-series-container">
        <div className="create-series">
          <b>Create New Series</b>
          <div>
            <input className="create-series-input" 
              value={this.state.value} 
              onChange={e => this.handleChange(e)} />
            {this.state.error && <div className="error">Enter a value</div>}
          </div>
          <button className={`${saveClass} button-1`} onClick={() => this.handleSave()}>Save</button>         
        </div>
        <div>
          <button className="remove-button button-1" onClick={() => this.setState({ isEditing: false })}>
            <i className="material-icons remove">remove_circle</i>
            Remove New Email Series
          </button>
        </div>
      </div>
    );    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createSeries: params => dispatch(createSeries(params))
  }
}
  
CreateSeries = connect(null, mapDispatchToProps)(CreateSeries);
export default CreateSeries;
