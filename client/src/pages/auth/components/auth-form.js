import React from 'react'
import './auth-form.scss'
import { TabContent, TabPane } from 'reactstrap';
import Tab from 'components/tab/tab';
import SignUp from './forms/sign-up';
import Login from './forms/login';

class AuthForm extends React.Component {

    state = {
        tabs: {
            signUp: 'signUp',
            login: 'login'
        },
        activeTab: 'signUp',
    }

    toggle(tab) {
        this.setState({
            activeTab: tab
        })
    }

    render() {

        return (
            <div className="panel">
                <div className="panel__header">
                    <div className="row no-gutters">
                        <Tab
                            className="tab"
                            isActive={this.state.tabs.signUp === this.state.activeTab}
                            toggle={() => this.toggle(this.state.tabs.signUp)}>SIgnUp</Tab>

                        <Tab
                            className="tab"
                            isActive={this.state.tabs.login === this.state.activeTab}
                            toggle={() => this.toggle(this.state.tabs.login)}>Login</Tab>
                    </div>
                </div>
                <div className="panel__body">
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId={this.state.tabs.signUp}>
                            <SignUp />
                        </TabPane>
                        <TabPane tabId={this.state.tabs.login}>
                            <Login />
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        )
    }
}

export default AuthForm