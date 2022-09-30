import { memo } from 'react'

export const NiceButton = memo(({ Icon, children, ...restOfProps }) => {
  return (
    <button {...restOfProps}>
      {Icon && <Icon />}
      {Icon && <span>&nbsp;</span>}
      {children}
    </button>
  )
})
