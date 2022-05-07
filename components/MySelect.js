import React from 'react'
import PropTypes from 'prop-types'
import { Field, useField } from 'formik'
import { FormControl, InputLabel, MenuItem } from '@material-ui/core'
import { Select } from 'formik-material-ui'

const MySelect = ({ label, name, items, disabled, required, onChange }) => {
  const [{}, { error }, { setValue }] = useField(name)

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
      fullWidth
      disabled
      style={{ height: '68px', marginBottom: '20px' }}
    >
      <InputLabel htmlFor={name}>{finalLabel}</InputLabel>
      <Field
        component={Select}
        name={name}
        disabled={disabled}
        inputProps={{ id: name }}
        required
        onChange={handleChange}
      >
        {items.map((x) => (
          <MenuItem key={x.id} value={x.id}>
            {x.name}
          </MenuItem>
        ))}
      </Field>
      <span className="MuiFormHelperText-root Mui-error Mui-required">
        {error}
      </span>
    </FormControl>
  )
}

MySelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
}

export { MySelect }
