import React from 'react'
import { Route, IndexRoute } from 'react-router'
// import { environment } from './services'
// const { ENV } = environment

import Template from './views/Template/Template'
/*
CODE SPLITTING:
This weird hackery is the most clean way to split components into different JS
files that are loaded async. Router does not officially support this.
Please note, migration to v4 is a BREAKING change.
https://github.com/reactGo/reactGo/pull/841/files
*/
const SplitFrontPage = (l, c) => require.ensure([], () => c(null, require('./views/FrontPage/FrontPage').default))
const SplitNotFound = (l, c) => require.ensure([], () => c(null, require('./views/NotFound/NotFound').default))

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  // const loginRoute = ENV === 'production' ? '/auth/google' : '/auth/google'
  // const requireAuth = (nextState, replace, callback) => {
  //   const { user } = store.getState()
  //   const authenticated = user.authenticated || false
  //   if (typeof window === 'object' && !authenticated) {
  //     try {
  //       window.location = loginRoute
  //     } catch (err) {
  //       console.error(err)
  //     }
  //     replace({ state: { nextPathname: nextState.location.pathname } })
  //   }
  //   callback()
  // }
  /*
  BUG: Auth provider is redirecting many users to /login/undefined after successful auth.
  This is a client (thus server because SSR) sided redirect to address the issue as I find the root cause.
  */
  const LoginCallbackRoute = () => <div>Redirecting...</div>
  const loginCallbackPatch = (nextState, replace, callback) => {
    if (typeof window === 'object') {
      try {
        window.location = '/'
      } catch (err) {
        console.error(err)
      }
      replace({ state: { nextPathname: nextState.location.pathname } })
    }
    callback()
  }

  /*
  Router Props:
  component: Pages included in the core JS bundle.
  getComponent: JS bundles for dynamically loading pages (users who visit the SPA only get the components needed for their route, and the bundle expands as necessary during their session)
  (read up on Code Splitting if this is confusing)
  onEnter: Auth / Permissions enforcement. Redirects unauthorized users
  */
  return (
    <Route path='/' component={Template} >
      <IndexRoute getComponent={SplitFrontPage} />
      {/* <Route path='/config' onEnter={requireAdmin} getComponent={SplitConfig} /> */}

      <Route path='/login/:redirect' onEnter={loginCallbackPatch} component={LoginCallbackRoute} />

      <Route path='*' getComponent={SplitNotFound} />
    </Route>
  )
}
