import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './dropdown-component.scss'

export default class DropdownComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            options: [],
            selectedText: this.props.default ? this.props.default.name : this.props.placeholder,
        }
        console.log(this.state)
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            placeholder: nextProps.placeholder,
            default: nextProps.default,
            options: nextProps.options
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { className } = this.props

        return (
            <div className="f-dropdown">
                <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                    <DropdownToggle className={`f-dropdown-toggle ${className}`} caret>
                        {this.state.selectedText}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.state.options.map((item, index) => (
                            <DropdownItem 
                                onClick={() => {
                                    this.setState({
                                        selectedText: item.name
                                    }, () => this.props.onChange(item))
                                }}
                            >{item.name}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>

        )
    }
}