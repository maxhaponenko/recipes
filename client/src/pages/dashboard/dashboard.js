import React from 'react';
import { connect } from 'react-redux';
import { loadDashboardData } from 'store/dashboard/dashboard.actions'

class Dashboard extends React.Component {

    componentDidMount() {
        // this.props.loadDashboardData(this.props.auth.userId)
    }

    saveToLocalStorage = () => {
        localStorage.setItem('Some Item', 'xxxx123123xxx')
    }

    render() {
        return (
            <>
                <h1 onClick={() => this.props.loadDashboardData(this.props.auth.userId)}>Dashboard page</h1>
                <button onClick={this.saveToLocalStorage}>Save to Local Storage</button>
            </>

        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    data: state.dashboard.data
})

const mapDispatchToProps = {
    loadDashboardData
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)