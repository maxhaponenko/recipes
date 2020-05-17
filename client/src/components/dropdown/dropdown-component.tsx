import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './dropdown-component.scss'

interface IncomingOption {
    title: string
    [key: string]: any
}

interface OptionWithFlag {
    title: string;
    selected: boolean;
    [key: string]: any;
}

interface State {
    isOpen: boolean;
    options: Array<IncomingOption | OptionWithFlag>;
    value: IncomingOption | OptionWithFlag | null
    placeholder: string;
}

interface OwnProps {
    options: Array<IncomingOption | OptionWithFlag>
    value: IncomingOption | null
    onChange: (item: object) => void
    placeholder: string
    defaultValue?: IncomingOption | OptionWithFlag
    className?: string
}

export default class DropdownComponent extends Component<OwnProps, State> {

    constructor(props: OwnProps) {
        super(props);
        this.state = {
            isOpen: false,
            options: [],
            value: null,
            placeholder: '',
        }
    }

    _findFirstStringProperty(obj: object) {
        return Object.values(obj).find(i => typeof i === 'string')
    }

    _modifyOptions(options: Array<any>) {
        let optionsWithFlags = options.map((item) => {
            item.selected = false
            return item
        })
        if (!optionsWithFlags[0].hasOwnProperty('title')) {
            let optionsWithTitles = optionsWithFlags.map(i => {
                i.title = this._findFirstStringProperty(i)
                return i
            })
            this.setState({ options: optionsWithTitles }, () => console.log('optionsWithTitles in state'))
        } else {
            this.setState({ options: optionsWithFlags }, () => console.log('optionsWithFlags in state'))
        }

    }

    componentDidMount() {
        if (this.state.options.length > 0) {
            this._modifyOptions(this.state.options)
        }
    }
    componentDidUpdate(prevState: any, prevProps: any) {
        if (prevProps.options !== this.props.options) {
            this._modifyOptions(this.state.options)
        }
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any): any {
        if (prevState.options.length === 0) { // First get
            if (nextProps.defaultValue && !nextProps.value) {
                return {
                    placeholder: nextProps.placeholder,
                    value: nextProps.defaultValue,
                    options: nextProps.options
                }
            } else {
                return {
                    placeholder: nextProps.placeholder,
                    value: nextProps.value,
                    options: nextProps.options
                }
            }
        } else { // If value or options changed
            return {    
                value: nextProps.value,
                options: nextProps.options
            }
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    onSelect = (item: any) => {
        this.setState(prevState => {
            let newState: any = [];
            prevState.options.forEach(i => {
                if (item.title === i.title) {
                    i.selected = true
                } else {
                    i.selected = false
                }
                newState.push(i)
            })
            return {
                options: [...newState]
            }
        }, () => {
            let elem = { ...item }
            delete elem.selected
            this.props.onChange(elem)
        })
    }

    render() {
        const { className } = this.props

        const selectedOption = (this.state.value || {}).title || this.state.placeholder

        return (
            <div className="f-dropdown">
                <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                    <DropdownToggle className={`f-dropdown-toggle ${className}`} caret>
                        {selectedOption}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.state.options.map((item, index) => (
                            <DropdownItem
                                key={index}
                                onClick={() => {
                                    this.onSelect(item)
                                }}
                            >{item.title}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>

        )
    }
}