import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Row from 'pages/admin/ingredients'


export default class GridActions extends Component {
    render() {
        return (
            <Wrapper>
                <Action onClick={this.props.onDelete}><i class="far fa-trash-alt"></i></Action>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    height: 100%;
    width: min-content;
    border-radius: 3px;
    padding: 3px;
    background-color: #eaeaea;
    &:hover {
        box-shadow: 0px 1px 3px rgba(199, 199, 199, 0.97);
    }
`
const Action = styled.div`
    height: 100%;
    width: min-content;
    margin: 0 5px;
    cursor: pointer;
    font-size: 13px;
    &:hover {
        .far.fa-trash-alt {
            color: #dc3545;
        }
    }
`



GridActions.propTypes = {
    onDelete: propTypes.func,
}