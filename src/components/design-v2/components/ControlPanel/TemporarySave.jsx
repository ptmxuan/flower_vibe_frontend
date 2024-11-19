import { SaveOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'

import './TemporarySave.sass'

export const TemporarySave = () => {
  return (
    <div className='temporary_save'>
        <Tooltip className='temporary_save__tooltip' placement="bottom" title={'Lưu lại để hoàn thành sau'}>
          <Button className='temporary_save__button' size='large' icon={<SaveOutlined />}>Lưu lại</Button>
        </Tooltip>
    </div>
  )
}
