import React, { Component } from 'react';

import './Modal.css';

export default class Modal extends Component {
    constructor(props) {
        super(props);

        this.handleEscPress = this.handleEscPress.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEscPress, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscPress, false);        
    }

    handleEscPress(event) {
        if (event.keyCode === 27 && this.props.isOpen) {
            this.props.close();
        }
    }

    handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            this.props.close();
        }
    }

    render() {
        return (
            <div className={`modal-overlay ${this.props.isOpen ? 'open' : ''}`}
                onClick={e => this.handleOverlayClick(e)}>

                <div className="Modal">
                    <div className="Modal__header">
                        {this.props.header}
                    </div>
                    <div className="Modal__content">
                        {this.props.children}
                    </div>
                    {this.props.actions ? <div className="Modal__actions">
                        {this.props.actions}
                    </div> : null}
                </div>
            </div>
        );
    }
}