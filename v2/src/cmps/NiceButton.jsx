export const NiceButton = ({ Icon, children, ...restOfProps }) => {
  return (
    <button {...restOfProps}>
      {Icon && <Icon />}
      {Icon && <span>&nbsp;</span>}
      {children}
    </button>
  )
}
