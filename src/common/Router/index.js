import React, { Suspense, useEffect } from 'react'
import routes from '../../constants/routes'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import FirstRenderLoading from '../FirstRenderLoading'
import SideMenu from '../SideMenu'

const Routes = () => {
  return (
    <Switch>
      <Route
        path={routes.CLIENTS.PATH}
        exact={routes.CLIENTS.EXACT}
        component={routes.CLIENTS.COMPONENT}
      />
      <Route
        path={routes.CONTRIBUTORS.PATH}
        exact={routes.CONTRIBUTORS.EXACT}
        component={routes.CONTRIBUTORS.COMPONENT}
      />
      <Route
        path={routes.DASHBOARD.PATH}
        exact={routes.DASHBOARD.EXACT}
        component={routes.DASHBOARD.COMPONENT}
      />
      <Route
        path={routes.OS.PATH}
        exact={routes.OS.EXACT}
        component={routes.OS.COMPONENT}
      />
      <Route
        path={routes.LOCATION.PATH}
        exact={routes.LOCATION.EXACT}
        component={routes.LOCATION.COMPONENT}
      />
      <Route
        component={() => <h1>Página não encontrada</h1>}
      />
    </Switch>
  )
}
const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<FirstRenderLoading />}>
        <Switch>
          <Route
            path={routes.WELCOME.PATH}
            exact={routes.WELCOME.EXACT}
            component={routes.WELCOME.COMPONENT}
          />
          <SideMenu>
            <Routes />
          </SideMenu>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
export default Router
