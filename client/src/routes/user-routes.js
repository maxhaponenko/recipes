import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PageWrapper from 'components/page-wrapper/page-wrapper'

import AuthUser from 'pages/auth/auth.entry'
// import AuthAdmin from 'pages/admin/login/login'
import AdminHome from 'pages/admin/home'
import AdminUsers from 'pages/admin/users'
import AdminIngredients from 'pages/admin/ingredients'
import AdminRecipes from 'pages/admin/recipes'
import AdminActivity from 'pages/admin/activity'

import Dashboard from 'pages/dashboard/dashboard'

export const UserRoutes = ({isAuthenticated}) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <PageWrapper>
                    <Route exact path="/" component={Dashboard} />
                    <Redirect to="/" />
                </PageWrapper>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <PageWrapper>
                    <Route exact path="/" component={AuthUser} />
                    {/* <Route exact path="/admin" component={AuthAdmin} /> */}
                    <Redirect to="/" />
                </PageWrapper>
            </Switch>
        )
    }
}

export const AdminRoutes = ({isAuthenticated}) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route exact path="/" component={AdminHome} />
                <Route path="/users" component={AdminUsers} />
                <Route path="/ingredients" component={AdminIngredients} />
                <Route path="/recipes" component={AdminRecipes} />
                <Route path="/activity" component={AdminActivity} />
                <Redirect to="/" />
            </Switch>
        )
    }
} 