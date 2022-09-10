import { MovePreview } from './MovePreview'

export function MoveList({ moves, lastMoves }) {
  return (
    <div className="move-list simple-cards-grid">
      <div>Your {lastMoves ? `last ${lastMoves}` : ''} Moves</div>
      {moves.map((move) => (
        <MovePreview key={move._id} move={move} />
      ))}
    </div>
  )
}
