import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ( { userData, component: Component, path }) => (
    <Route path={path} render={() => (
      userData.user
        ? <Component />
        : <Redirect to='/login' />
    )} />
  )

  export default PrivateRoute;