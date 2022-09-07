import { Component } from 'react'
import { connect } from 'react-redux'
import { bitcoinService } from '../services/bitcoinService'
import { logout } from '../store/actions/authActions'
import { utilService } from '../services/utilService'

class _Home extends Component {
  state = {
    bRate: null,
  }

  async componentDidMount() {
    await this.getBitcoinRate()
  }

  async getBitcoinRate() {
    try {
      const { loggedInUser } = this.props
      const bRate = await bitcoinService.getRate(loggedInUser.coins)
      this.setState({ bRate })
    } catch (err) {
      console.log('err:', err)
    }
  }

  render() {
    const onSubmit = utilService.onSubmit
    const { loggedInUser } = this.props
    const { bRate } = this.state
    if (!loggedInUser) return <div>Loading...</div>
    return (
      <section className="home">
        <div>Welcome {loggedInUser.username}!</div>
        <div>You have {loggedInUser.coins} coins</div>
        <div>BTC: {bRate}</div>
        <button onClick={(e) => onSubmit(e, this, 'logout')}>Logout</button>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.authModule.loggedInUser,
  }
}

const mapDispatchToProps = {
  logout,
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)
