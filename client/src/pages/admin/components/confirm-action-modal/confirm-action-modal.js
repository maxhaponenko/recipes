import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal } from 'store/shared/modal/modals.actions'
import { ADMIN_CONFIRM_ACTION_MODAL } from 'constants/modals'
import styled from 'styled-components'

export class ConfirmActionModal extends Component {
    render() {
        return (
            <Wrapper>
                <WarningQuestion>
                    <span>Delete ingredient?</span>
                </WarningQuestion>
                <ActionsWrapper>
                    <BtnCancel onClick={this.props.closeModal} className="button is-light">Cancel</BtnCancel>
                    <BtnContinue className="button is-primary">Continue</BtnContinue>
                </ActionsWrapper>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) =>  ({
    closeModal: () => dispatch(closeModal({id: ADMIN_CONFIRM_ACTION_MODAL}))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmActionModal)




const Wrapper = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    width: 250px;
    height: 125px;
    display: flex;
    flex-direction: column;
`
const WarningQuestion = styled.div`
    font-size: 16px;
    position: relative;
    flex: 1 1 auto;
    span {
        position: absolute;
        text-align: center;
        width: max-content;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`
const ActionsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const BtnContinue = styled.button`
    padding: 10px 20px;
    font-size: 15px;
`
const BtnCancel = styled.button`
    padding: 10px 20px;
    font-size: 15px;
`
