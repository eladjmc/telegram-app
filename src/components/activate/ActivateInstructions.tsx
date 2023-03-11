import React from 'react'
import './ActivateInstructions.scss'
const ActivateInstructions = () => {
  return (
    <div className='instructions-container'>
      <h2>Getting Started:</h2>
      <ul>
        <li>Connect at least one phone to the app</li>
        <li>Create at least one group</li>
        <li>Select your target group</li>
        <li>Set the time intervals between requests</li>
      </ul>
      <h2>Note:</h2>
      <ul>
        <li>The minimum interval between requests is 60 seconds for each phone</li>
        <li>If you have multiple phones connected, the time interval will be adjusted accordingly</li>
      </ul>
    </div>
  )
}

export default ActivateInstructions