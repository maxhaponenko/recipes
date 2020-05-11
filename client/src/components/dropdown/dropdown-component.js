import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './dropdown-component.scss'

const types = [
    {id: 1, name: 'Milk'},
    {id: 2, name: 'Meat'},
    {id: 3, name: 'Vegetables'},
    {id: 4, name: 'Other'},
]

export default class DropdownComponent extends Component {

    state = {
        isOpen: false,
        options: [],
        placeholder: this.props.placeholeder ? this.props.placeholeder : 'Placeholder',
        selected: this.props.placeholeder,
    }

    static getDerivedStateFromProps(nextProps) {
        return {
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
                        {this.props.placeholder}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.state.options.map((item, index) => (
                            <DropdownItem>{item.name}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>

        )
    }
}