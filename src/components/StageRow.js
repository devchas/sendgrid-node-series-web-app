import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStage, updateStage, deleteStage, toggleModal } from '../actions';
import _ from 'lodash';
import './Dashboard.css';

class StageRow extends Component {
  constructor() {
    super();
    this.state = {
      isEditable: false,
      id: '',
      label: '',
      daysToSend: '',
      selectedTemplateId: '',
      labelErr: false,
      daysToSendErr: false,
      isSelectingTemplate: false
    };
  }

  componentWillMount() {
    const { id, label, daysToSend, isEditable, sgTemplateID } = this.props;
    var initialState = { id, label, daysToSend, isEditable, selectedTemplateId: sgTemplateID };
    if (isEditable) {
      initialState = Object.assign({}, initialState, {
        labelErr: true,
        daysToSendErr: true
      });
    }
    this.setState(initialState);
  }

  componentWillReceiveProps(nextProps) {
    const { id, label, daysToSend } = nextProps;
    this.setState({ id, label, daysToSend });    
  }

  componentWillUpdate(nextProps, nextState) {
    this.checkForErrors(nextState);
  }

  checkForErrors(nextState) {
    if (this.state.label !== nextState.label) {
      if (nextState.label.length === 0) { 
        this.setState({ labelErr: true })
      } else {
        this.setState({ labelErr: false })
      }
    }

    if (this.state.daysToSend !== nextState.daysToSend) {
      if (nextState.daysToSend.length === 0 || isNaN(nextState.daysToSend/1)) { 
        this.setState({ daysToSendErr: true });
      } else {
        this.setState({ daysToSendErr: false });
      }
    }  
  }

  areErrorsPending() {
    const { labelErr, daysToSendErr, isSelectingTemplate } = this.state;

    if (!labelErr && !daysToSendErr && !isSelectingTemplate) {
      return false;
    } else {
      return true;
    }
  }

  handleClickSave(isNew) {
    if (!this.areErrorsPending()) {
      const { emailSeryId } = this.props;
      const { id, label, daysToSend, selectedTemplateId } = this.state;

      if (isNew) {
        this.props.createStage({ emailSeryId, label, daysToSend, 
          sgTemplateID: selectedTemplateId
        });
        this.props.removeNewStage();
      } else {
        this.setState({ isEditable: false });
        this.props.updateStage({ emailSeryId, id, label, daysToSend,
          sgTemplateID: selectedTemplateId
        });
      }
    }
  }

  handleClickCancel() {
    const { id, label, daysToSend } = this.props;
    this.setState({ id, label, daysToSend, isEditable: false, isSelectingTemplate: false });
  }

  handleClickDelete() {
    this.props.toggleModal(() => this.handleDelete());
  }

  handleDelete() {
    const { emailSeryId } = this.props;
    const { id } = this.props;
    this.props.deleteStage({ emailSeryId, id });
  }

  handleTemplateClick(selectedTemplateId) {
    this.setState({ selectedTemplateId, isSelectingTemplate: false });
  }

  render() {
    const { isEditable, label, daysToSend, labelErr, daysToSendErr } = this.state;
    const { backgroundColor } = this.props;
    const saveClass = (!this.areErrorsPending()) ? "save-button" : 'save-button inactive';

    if (isEditable) {
      return (
        <tr className="new-stage-row edit" style={{ backgroundColor }}>
          <td className="table-cell-left">
            <input value={label} onChange={e => this.setState({ label: e.target.value })} />
            {labelErr && <div className="error">Enter a value</div>}
          </td>
          <td>
            <input 
              className="days-to-send"
              value={daysToSend} 
              onChange={e => this.setState({ daysToSend: e.target.value })} />
            {daysToSendErr && <div className="error">Enter a number</div>}  
          </td>
          {this.renderTemplateDropDown()}
          <td className="button-container-cell">
            <button className={`${saveClass} button-1`} onClick={() => this.handleClickSave(this.props.isNew)}>
              SAVE
            </button>   
            {!this.props.isNew && 
            <button className="button-1" onClick={() => this.handleClickCancel()}>
              Cancel
            </button>}   
          </td>
        </tr>
      );
    } else {
      return (
        <tr style={{ backgroundColor }}>
          <td className="table-cell-left">{label}</td>
          <td>{daysToSend}</td>
          <td className="table-cell-left">{this.selectedTemplateName()}</td>
          <td className="button-container-cell">
            <button className="edit-button button-1" 
              onClick={() => this.setState({ isEditable: true })}>Edit</button>
            <button 
              onClick={() => this.handleClickDelete()} className="remove-button button-1">Delete</button>
          </td>
        </tr>      
      );
    }
  }

  selectedTemplateName() {
    const { selectedTemplateId } = this.state;
    const { sgTemplates } = this.props;
    const selectedTemplate = _.find(sgTemplates, { 'id': selectedTemplateId });
    return (selectedTemplate) ? selectedTemplate.name : 'Loading...';
  }

  renderTemplateDropDown() {
    const { selectedTemplateId } = this.state;
    const { sgTemplates } = this.props;

    const selectedTemplate = [_.find(sgTemplates, { 'id': selectedTemplateId })];
    const nonSelectedTemplates = _.filter(sgTemplates, o => o.id !== selectedTemplateId);
    const templateList = selectedTemplate.concat(nonSelectedTemplates);

    return (
      <td className="table-cell-left">
        <select onChange={e => this.handleTemplateClick(e.target.value)}>
          {templateList.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
        </select>
      </td>
    );
  }
}

function mapStateToProps(state) {
  const { series: { sgTemplates } } = state;
  return { sgTemplates };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: params => dispatch(toggleModal(params)),
    createStage: params => dispatch(createStage(params)),
    updateStage: params => dispatch(updateStage(params)),
    deleteStage: params => dispatch(deleteStage(params))
  }
}

StageRow = connect(mapStateToProps, mapDispatchToProps)(StageRow);
export default StageRow;