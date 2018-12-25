import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mandalActions from '../redux/actions'
import { StoreState } from '../redux/reducer'
import MainStep from '../components/MainStep'

type ListType = {
  todo: string
}

type Props = {
  list: ListType[][],
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
      <MainStep list={this.props.list} />
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
