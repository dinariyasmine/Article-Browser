import React from 'react'
import './Sign.css'
import { Link } from 'react-router-dom';


const Sign = (Props) => {
  return (
    <p>
      {Props.account} <Link to={{ pathname: `/sign${Props.sign}` }}><span>Sign {Props.sign}</span></Link>
    </p>
  )
}

export default Sign