import React from 'react';
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom'
import { UserRoutes, AdminRoutes } from 'routes/user-routes'
import ModalContainer from 'components/modals/modal-container'
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
	
	render() {

		const isAdmin = this.props.userType === 2 ? true : false

		return (
			<>
				<BrowserRouter>
					{!isAdmin ? (
						<UserRoutes isAuthenticated={this.props.isAuthenticated} />
					) : (
						<AdminRoutes isAuthenticated={this.props.isAuthenticated} />
					)}
					
				</BrowserRouter>
				<ModalContainer />
				<ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />
			</>
		)
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	userType: state.auth.userType
})

export default connect(mapStateToProps, null)(App);
