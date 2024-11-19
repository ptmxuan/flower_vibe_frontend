import React from 'react'

import { SendButton } from './SendButton'
import { TemporarySave } from './TemporarySave'

import './ControlPanel.sass'

export const ControlPanel = () => {
  return (
    <div className='control_panel hidden-element'>
        <TemporarySave/>
        <SendButton/>
    </div>
  )
}
