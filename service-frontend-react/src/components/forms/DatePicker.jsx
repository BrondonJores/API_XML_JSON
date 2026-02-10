import Input from './Input'
import { forwardRef } from 'react'

const DatePicker = forwardRef((props, ref) => {
  return <Input ref={ref} type="date" {...props} />
})

DatePicker.displayName = 'DatePicker'

export default DatePicker
