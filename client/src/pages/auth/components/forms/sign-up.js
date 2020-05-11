import React, { Fragment } from 'react';
import Tooltip from 'components/tooltip/tooltip';
import ReactHtmlParser from 'react-html-parser';
import { validator } from 'services/validator';
import { connect } from 'react-redux';
import { processSignUp } from 'store/auth/auth.actions';

class SignUp extends React.Component {

    state = {
        didTryToProcess: false,
        inputs: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        hidePassword: true,
        
        validationRules: {
            firstName: [
                {
                    rule: validator.isNotEmpty,
                    message: 'This field is required'
                },
                {
                    rule: validator.isNotBig,
                    message: 'Second Name is too big. It should be less than 21 characters'
                }
            ],
            lastName: [
                {
                    rule: validator.isNotEmpty,
                    message: 'This field is required'
                },
                {
                    rule: validator.isNotBig,
                    message: 'Second Name is too big. It should be less than 21 characters'
                }
            ],
            email: [
                {
                    rule: validator.isNotEmpty,
                    message: 'This field is required'
                },
                {
                    rule: validator.isEmail,
                    message: 'Please, enter real email address'
                }
            ],
            password: [
                {
                    rule: validator.isNotEmpty,
                    message: 'This field is required'
                },
                {
                    rule: validator.isNotAllowedPasswordCharacters,
                    message: 'Password should pass the following rules: <ul><li>6 to 20 characters</li><li>Must contain at least one digit</li><li>Must contain at least one letter (case insensitive)</li><li>Can contain the following characters: ! @ # $ % & *</li></ul>'
                }
            ]
        },
        validationResult: {},
    }

    onInputChange(name, value) {
        this.setState( prevState => ({
            inputs: {
                ...prevState.inputs,
                [name]: value
            }
        }), () => {
            if (this.state.didTryToProcess) {
                this.validateForm()
            }
        })
        
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.validateForm()
        }
    }

    validateForm(callback) {
        let validationResult = {}
        for (var inputName in this.state.validationRules) {
            let result = validator.validate(this.state.inputs[inputName], this.state.validationRules[inputName])
            validationResult[inputName] = result
        }
        
        this.setState({
            didTryToProcess: true,
            validationResult: validationResult
        }, () => {
            if (typeof callback === 'function') {
                callback()
            }
        })
    }

    isValid = () => {
        let result = [];
        for (var key in this.state.validationResult) {
            this.state.validationResult[key] === true ? result.push(true) : result.push(false)
        }
        if (result && result.some(item => item !== true)) {
            return false
        } else {
            return true
        }
    }

    signUp() {
        this.validateForm(() => {
            if (this.isValid()) {
                this.props.processSignUp(
                    this.state.inputs.firstName,
                    this.state.inputs.lastName,
                    this.state.inputs.email,
                    this.state.inputs.password,
                )
            }
        })
    }

    render() {

        const {
            firstName,
            lastName,
            email,
            password
        } = this.state.inputs

        const { 
            validationResult,
            didTryToProcess
        } = this.state
        
        
        const isNotValid = (inputName) => {
            if (
                didTryToProcess 
                && validationResult[inputName] !== true
                && validationResult[inputName][0] !== undefined
                ) return true
            return false
        }
        const isFirstNotValidInput = (inputName) => {
            let inputPosition = Object.keys(this.state.validationResult).indexOf(inputName)
            let previousKey = Object.keys(this.state.validationResult)[inputPosition - 1]
            let previousRuleValue = this.state.validationResult[previousKey]
            if (inputPosition === 0 || previousRuleValue === true) {
                let noInputInFocus = () => {
                    let rules = Object.keys(this.state.validationRules)
                    let length = rules.length
                    let result = []
                    for (let i = length; i >= 0; i--) {
                        this[rules[i]] === document.activeElement ? result.push(true) : result.push(false)
                    }
                    if (result.some(i => i === true)) return false
                    return true   
                }
                if (this[inputName] && noInputInFocus()) {
                    this[inputName].focus();
                }
                return true
            } return false
        }

        const showTooltip = (inputName) => {
            if (isNotValid(inputName) && isFirstNotValidInput(inputName)) return true
        }

        return (
            <Fragment>
                <div className="form__heading">Sign Up for Free</div>
                <form className="auth-form">
                    <div className="auth-form__row">
                        <input id="email" style={{display: 'none'}} type="email" name="fakeusernameremembered"/>
                        <input id="password" style={{display: 'none'}} type="password" name="fakepasswordremembered"/>
                        <div className={"auth-form__input-container ".concat(isNotValid('firstName') ? "onError" : "")}>
                            <input
                                type="text"
                                name="firstName"
                                autoFocus
                                placeholder="First Name*"
                                value={firstName}
                                ref={ref => this.firstName = ref}
                                onChange={(e) => this.onInputChange('firstName', e.target.value)}
                                onKeyPress={this.handleKeyPress}
                                />
                            <label>First Name<span style={{ color: '#3BA28A' }}>*</span></label>
                            {showTooltip('firstName') && (
                                <Tooltip className="form-tooltip">{validationResult.firstName[0]}</Tooltip>
                            )}
                            <span className="icon-file-user"></span>
                        </div>
                        <div className={"auth-form__input-container ".concat(isNotValid('lastName') ? "onError" : "")}>
                            <input 
                                type="text"
                                name="lastName"
                                placeholder="Last Name*"
                                value={lastName}
                                ref={ref => this.lastName = ref}
                                onChange={(e) => this.onInputChange('lastName', e.target.value)}
                                onKeyPress={this.handleKeyPress}
                                />
                            <label>Last Name<span style={{ color: '#3BA28A' }}>*</span></label>
                            {showTooltip('lastName') && (
                                <Tooltip className="form-tooltip">{validationResult.lastName[0]}</Tooltip>
                            )}
                        </div>
                    </div>
                    <div className={"auth-form__input-container ".concat(isNotValid('email') ? "onError" : "")}>
                        <input 
                            type="email"
                            name="email"
                            autoComplete="new-password"
                            placeholder="Email Address*"
                            value={email}
                            ref={ref => this.email = ref}
                            onChange={(e) => this.onInputChange('email', e.target.value)}
                            onKeyPress={this.handleKeyPress}
                            />
                        <label>Email Address<span style={{ color: '#3BA28A' }}>*</span></label>
                        {showTooltip('email') && (
                            <Tooltip className="form-tooltip">{validationResult.email[0]}</Tooltip>
                        )}
                    </div>
                    <div className={"auth-form__input-container ".concat(isNotValid('password') ? "onError" : "")}>
                        <input 
                            type={this.state.hidePassword ? 'password' : 'text'}
                            name="password"
                            autoComplete="new-password"
                            placeholder="Set A Password*"
                            value={password}
                            ref={ref => this.password = ref}
                            onChange={(e) => this.onInputChange('password', e.target.value)}
                            onKeyPress={this.handleKeyPress}
                            />
                        <label>Set A Password<span style={{ color: '#3BA28A' }}>*</span></label>
                        {showTooltip('password') && (
                            <Tooltip className="form-tooltip"><span>{ReactHtmlParser(validationResult.password[0])}</span></Tooltip>
                        )}
                        {password.length > 0 && (
                            <span className="icon-refresh-locked" onClick={() => this.setState({
                                hidePassword: !this.state.hidePassword
                            })}></span>
                        )}
                    </div>
                    <div className="btn-signUp" onClick={() => this.signUp()}><span>GET STARTED</span></div>
                </form>
            </Fragment>
        )
    }
}

const mapDIspatchToProps = {
    processSignUp: processSignUp
}

export default connect(null, mapDIspatchToProps)(SignUp)