import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mandalActions from '../redux/actions'
import { StoreState } from '../redux/reducer'
import MainStep from '../client/components/MainStep'
// import './style.css'

type Props = {
  list: object[],
  MandalActions: typeof mandalActions
}
type State = {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  UNSAFE_componentWillMount() {
    const { MandalActions } = this.props
    const endpoint = 'http://localhost:9999/graphql'
    const query = `{
      mandals {
        goal
        mainSteps
      }
    }`

    MandalActions.requestMandal({
      params: {
        method: 'post',
        url: endpoint,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ query })
      }
    })
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

export default connect(
  mapStateToProps,
  dispatch => ({
    MandalActions: bindActionCreators(mandalActions, dispatch)
  })
)(App) as any
