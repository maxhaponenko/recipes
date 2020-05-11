import React, { Fragment } from 'react';
import Tooltip from 'components/tooltip/tooltip';
import { validator } from 'services/validator';
import { connect } from 'react-redux';
import { processLogin } from 'store/auth/auth.actions';


class Login extends React.Component {

    state = {
        didTryToProcess: false,
        inputs: {
            email: '',
            password: ''
        },
        hidePassword: true,
        validationRules: {
            email: [
                {
                    rule: validator.isNotEmpty,
                    message: 'Please, enter your email'
                }
            ],
            password: [
                {
                    rule: validator.isNotEmpty,
                    message: 'Please, fill your password'
                }
            ]
        },
        validationResult: {}
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

    isValid() {
        let result = []
        for (var key in this.state.validationResult) {
            this.state.validationResult[key] === true ? result.push(true) : result.push(false)
        }
        if (result.some(item => item !== true)) {
            return false
        } else {
            return true
        }
    }

    processLogin() {
        this.validateForm(() => {
            if (this.isValid()) {
                this.props.processLogin(this.state.inputs.email, this.state.inputs.password)
            }
        })
    }

   

    render() {
        
        const {
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
                <div className="form__heading">Welcome Back!</div>
                <form className="auth-form">
                    <div className={"auth-form__input-container ".concat(isNotValid('email') ? "onError" : "")}>
                        <input 
                            type="email"
                            autoFocus
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
                    <div className={"auth-form__input-container ".concat(isNotValid('password') ? "onError" : "")} style={{ marginBottom: 55 }}>
                        <input 
                            type={this.state.hidePassword ? 'password' : 'text'}
                            placeholder="Set A Password*"
                            value={password}
                            ref={ref => this.password = ref}
                            onChange={(e) => this.onInputChange('password', e.target.value)}
                            onKeyPress={this.handleKeyPress}
                            />
                        <label>Set A Password<span style={{ color: '#3BA28A' }}>*</span></label>
                        {showTooltip('password') && (
                            <Tooltip className="form-tooltip">{validationResult.password[0]}</Tooltip>
                        )}
                        {password.length > 0 && (
                            <span className="icon-refresh-locked" onClick={() => this.setState({
                                hidePassword: !this.state.hidePassword
                            })}></span>
                        )}
                    </div>
                    <span className="forgot-password">Forgot Password?</span>
                    <div className="btn-signUp" onClick={this.processLogin.bind(this)}><span>LOG IN</span></div>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    processLogin: (email, password) => processLogin(email, password)
}

export default connect (mapStateToProps, mapDispatchToProps)(Login)