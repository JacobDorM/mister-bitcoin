import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bitcoinService } from '../services/bitcoinService'
import { logout } from '../store/actions/authActions'
import { MoveList } from '../cmps/MoveList'

export const Home = () => {
  const [bRate, setBRate] = useState(null)
  const { loggedInUser } = useSelector((state) => state.authModule)
  const dispatch = useDispatch()

  const lastMoves = 3

  useEffect(() => {
    const getBitcoinRate = async () => {
      try {
        const bRate = await bitcoinService.getRate(loggedInUser.coins)
        setBRate(bRate)
      } catch (err) {
        console.log('err:', err)
      }
    }

    getBitcoinRate()
  }, [loggedInUser.coins])

  const getLoggedInUserMoves = (lastMoves) => {
    return loggedInUser.moves ? loggedInUser.moves.slice(-lastMoves) : []
  }

  if (!loggedInUser) return <div>Loading...</div>

  return (
    <main>
      <section className="home">
        <div>Welcome {loggedInUser.username}!</div>
        <div>You have {loggedInUser.coins} coins</div>
        <div>BTC: {bRate}</div>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </section>
      <section>
        <MoveList moves={getLoggedInUserMoves()} lastMoves={lastMoves} />
      </section>
    </main>
  )
}
