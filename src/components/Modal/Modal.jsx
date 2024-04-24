import { Component } from 'react';
import { createPortal } from 'react-dom';

import css from 'styles.module.css';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    console.log('componentDidMount Modal');
    window.addEventListener('keydown', e => {
      // console.log(e.code);
      if (e.code === 'Escape') {
        e.preventDefault();
        console.log('Close modal');
        // console.log(this.props);
        return this.props.onClose();
      }
    });
  }

  toogleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal } = this.state;
    return (
      showModal &&
      createPortal(
        <div className={css.Overlay}>
          <div className={css.Modal}>
            <img src={this.props.image} alt="" />
          </div>
        </div>,
        modalRoot
      )
    );
  }
}
