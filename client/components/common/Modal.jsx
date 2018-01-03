import React, { Component } from 'react';
import PropTypes from 'prop-types';
import setupModal from './setupModal';


/**
 * a modal Component
 *
 * @extends Component
 */
class Modal extends Component {
  /**
   * lifecycle method called when component mounts the DOM
   *
   * @returns {undefined} no return value
   */
  componentDidMount() {
    setupModal();
  }

  /**
   * renders a Modal to the DOM
   *
   * @member Modal
   *
   * @return {JSX} JSX representation of the Component
   */
  render() {
    return <div id="confirm-modal" className="modal admin-form">
      <div className="modal-content center">
        <h4 className="blue-border-bottom bold-text">{this.props.title}</h4>
        <h5 className="grey-text text-lighten-2">{this.props.question}</h5>
        <p className="bold-text">
          {this.props.subText}
        </p>
      </div>
      <div className="modal-footer admin-form center s12">
        <button
          className={`modal-action btn darken-4 white-text modal-close
            action-btn waves-effect waves-red btn-flat
            ${this.props.confirmColor}`}
          onClick={() => this.props.modalAction()}
        >
          {this.props.confirmText}
        </button>
        <button
          className={`modal-action darken-4 white-text waves-effect btn-flat
            modal-close action-btn btn waves-green ${this.props.cancelColor}`}
        >
          {this.props.cancelText}
        </button>
      </div>
    </div>;
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  confirmColor: PropTypes.string.isRequired,
  cancelColor: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  modalAction: PropTypes.func.isRequired
};

export default Modal;
