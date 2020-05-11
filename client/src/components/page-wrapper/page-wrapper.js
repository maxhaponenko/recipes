import React from 'react'
import { connect } from 'react-redux'
import { processLogOut } from 'store/auth/auth.actions'
import AdminTopMenu from 'pages/admin/components/admin-top-menu/admin-top-menu'
import './page-wrapper.scss'

const PageWrapper = (props) => {
   return (
      <React.Fragment>
         <nav>
            {!props.auth.isAuthenticated && (
               <div style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  margin: '0 auto',
                  fontSize: 20,
                  
               }}>
                  <i className="fas fa-utensils"></i>
                  <div>Food & Good</div>
               </div>

            )}
            {props.auth.isAuthenticated && (
               <>
                  {props.auth.userType === 2 && (
                     <AdminTopMenu />
                  )}
                  <div style={{ color: 'rgb(170, 180, 178)', marginRight: 40 }}>
                     {props.auth.email}
                  </div>
                  <div
                     className="pw-logout"
                     onClick={() => props.processLogOut()}
                  >
                     <i className="fas fa-sign-out-alt"></i>
                     Log out
                  </div>
               </>
            )}
         </nav>
         <div className="page-frame">
            {props.children}
         </div>
      </React.Fragment>
   )
}

const mapStateToProps = (state) => ({
   auth: state.auth
})

const mapDispatchToProps = {
   processLogOut
}

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper)