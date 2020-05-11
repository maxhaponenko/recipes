import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openModal, closeModal } from 'store/shared/modal/modals.actions'
import modalsMap from 'services/modals-map';


class ModalContainer extends Component {
    render() {
        const modals = this.props.modals.map((item, i) => {
            return (
                <Modal
                    item={item}
                    key={i}
                    zIndex={i}
                    onClose={(item) => {
                        this.props.dispatch(closeModal(item))
                    }}
                >
                    {React.createElement(modalsMap[item.id], item.payload)}
                </Modal>
            )
        })
        return (
            <div className={modals.length > 0 ? "modals" : ""}>
                {modals}
            </div>
        );
    }
}

class Modal extends Component {
    onClose() {
        if (this.props.item.onClose) {
            this.props.item.onClose();
            this.props.onClose(this.props.item);
        } else {
            this.props.onClose(this.props.item);
        }
    }
    onConfirm() {
        if (this.props.item.onConfirm) {
            this.props.item.onConfirm();
            this.props.onClose(this.props.item);
        }
    }
    render() {
        return (
            <div className={`modal is-active`}>
                <div className="modal-background" onClick={() => this.onClose()}></div>
                <div className="modal-card">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    modals: state.modals
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);