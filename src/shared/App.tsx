import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mandalActions from '../redux/actions'
import axios from 'axios'
import { StoreState } from '../redux/reducer'
import { withDone } from 'react-router-server'
import MainStep from '../client/components/MainStep'
// import './style.css'

type Props = {
  list: object[],
  MandalActions: typeof mandalActions,
  done: any
}
type State = {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  UNSAFE_componentWillMount() {
    const { MandalActions, done } = this.props
    const endpoint = 'http://localhost:9999/graphql'
    const query = `{
      mandals {
        goal
        mainSteps
      }
    }`
    axios({
      method: 'post',
      url: endpoint,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ query })
    })
    .then((res) => {
      MandalActions.successMandal(res.data.data)
    })
    .then(done, done)
    .catch(error => console.log(error))
  }

  render() {
    return (
      <Fragment>
        <div>Hello, SSR</div>
        <MainStep list={this.props.list} />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ mandal }: StoreState) => ({
  list: mandal.list
})

export default withDone(connect(
  mapStateToProps,
  dispatch => ({
    MandalActions: bindActionCreators(mandalActions, dispatch)
  })
)(App) as any) as any
