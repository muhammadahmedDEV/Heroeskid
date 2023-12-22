// MAIN MODULES
import React from 'react'
import { Route, Redirect } from 'react-router'

interface ComponentProps {
  component?: any
  path: string,
  exact?: boolean
}

const PublicRoute = ({
  exact,
  component: Component,
  ...rest
}: ComponentProps) => {
  const flag: boolean = false
  const View = (props: any) =>
    flag ? <Redirect to='/' /> : <Component {...props} />
  return (
    <Route
      exact
      {...rest}
      component={View}
    />
  )
}

export default PublicRoute
