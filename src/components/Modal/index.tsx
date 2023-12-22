// MAIN MODULES
import React from 'react'
import ReactDOM from 'react-dom'

// STYLES
import './styles.scss'

const modalRoot = document.getElementById('modal-root') as HTMLElement


class Modal extends React.Component {
  el: HTMLElement
  constructor(props: any) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
}

export default Modal
