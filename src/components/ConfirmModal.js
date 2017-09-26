import React from 'react';
import './ConfirmModal.css';
import { connect } from 'react-redux';
import { toggleModal } from '../actions';

let ConfirmModal = (props) => {
  if (!props.isModalDisplayed) { return null; }

  return (
    <div className="modal-background">
      <div className="modal-box">
        <div className="modal-header">
          <div>Confirm Delete</div>
          <i className="material-icons clear" onClick={() => props.toggleModal()}>clear</i>
        </div>
        <div className="modal-body">
          <div>Are you sure you want to delete this item?</div>
          <div className="modal-button-container">
            <button className="modal-button confirm" 
              onClick={() => props.toggleModal(props.modalCallback())}>
              Yes Delete
            </button>
            <button className="modal-button" onClick={() => props.toggleModal()}>
              No Don't Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { modal: { isModalDisplayed, modalCallback } } = state;
  return { isModalDisplayed, modalCallback };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: params => dispatch(toggleModal(params))
  }
}

ConfirmModal = connect(mapStateToProps, mapDispatchToProps)(ConfirmModal)
export default ConfirmModal;