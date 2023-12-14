import React from 'react'
import './Sign.css'

const Sign = (Props) => {
  return (
    <p>
      {Props.account} <span>Sign {Props.sign}</span>
    </p>
  )
}

export default Sign