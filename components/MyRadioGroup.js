import React from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core'

const MyRadioGroup = ({ label, name, items, disabled, required, onChange }) => {
  const [{}, { error, value }, { setValue }] = useField(name)

  const handleChange = (ev) => {
    const value = ev.target.value
    setValue(value)
    if (onChange) {
      onChange(value)
    }
  }

  const finalLabel = required ? `${label}*` : label
  return (
    <FormControl
      component="fieldset"
      fullWidth
      style={{ marginBottom: '20px' }}
    >
      <FormLabel component="legend">{finalLabel}</FormLabel>
      <RadioGroup name={name} value={value} onChange={handleChange} row>
        {items.map((x) => (
          <FormControlLabel
            key={x.id}
            value={x.id}
            control={<Radio disabled={disabled} />}
            label={x.name}
          />
        ))}
      </RadioGroup>
      <span className="MuiFormHelperText-root Mui-error Mui-required">
        {error}
      </span>
    </FormControl>
  )
}

MyRadioGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
}

export { MyRadioGroup }
