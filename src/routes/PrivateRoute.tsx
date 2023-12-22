// MAIN MODULES
import React from 'react'
import { Route, Redirect } from 'react-router'

interface ComponentProps {
  component?: any
  path: string
  rest: any
}

const PrivateRoute = ({
  component: Component,
  ...rest
}: ComponentProps) => {
  const flag: boolean = true
  const View = (props: any) =>
    flag ? <Component {...props} /> : <Redirect to='/login' />
  return (
    <Route
      {...rest}
      component={View}
    />
  )
}

export default PrivateRoute
