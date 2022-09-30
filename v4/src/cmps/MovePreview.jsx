export const MovePreview = ({ move }) => {
  return (
    <div className="move-preview">
      <h2>To: {move.to.name}</h2>
      {/* <h4>At: {move.at}</h4> */}
      <h5>Amount: {move.amount}</h5>
    </div>
  )
}
