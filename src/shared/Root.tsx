import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Mandal } from '../pages'

class Root extends Component {
  render() {
    return (
      <Fragment>
        <h1>Hello, Universal Component</h1>
        <Switch>
          <Route exact path="/" component={Mandal} ></Route>
        </Switch>
      </Fragment>
    )
  }
}

export default Root
