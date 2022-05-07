import React from 'react'
import PropTypes from 'prop-types'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core'

import { yesNo } from '../lib/constants'
import { MyRadioGroup } from './MyRadioGroup'
import { MyTextField } from './MyTextField'

const Round = ({
  values,
  roundLabel,
  roundName,
  busName,
  lunchName,
  disabled,
  clearField,
}) => {
  const registeredForThisRound = values[roundName] === 'Y'
  return (
    <Accordion
      elevation={4}
      expanded={registeredForThisRound}
      style={{ marginBottom: '20px' }}
    >
      <AccordionSummary>
        <MyRadioGroup
          label={roundLabel}
          name={roundName}
          items={yesNo}
          disabled={disabled}
        />

        {(roundName === 'thirdRound' || roundName === 'secondRound') && (
          <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            מחזור שלישי מלא. לרישום לרשימת המתנה צרו קשר עם 052-3670576
          </span>
        )}
      </AccordionSummary>
      <AccordionDetails style={{ display: 'block' }}>
        <MyRadioGroup
          label="הסעה"
          name={busName}
          items={yesNo}
          disabled={disabled}
          required={registeredForThisRound}
          onChange={(value) => clearField(value, `${busName}Comments`)}
        />
        <MyTextField
          label="הערות"
          name={`${busName}Comments`}
          disabled={disabled || values[busName] !== 'Y'}
          helperText="למשל: רק הלוך"
        />
        <MyRadioGroup
          label="צהרון"
          name={lunchName}
          items={yesNo}
          disabled={disabled}
          required={registeredForThisRound}
        />
      </AccordionDetails>
    </Accordion>
  )
}

Round.propTypes = {
  values: PropTypes.object.isRequired,
  roundLabel: PropTypes.string.isRequired,
  roundName: PropTypes.string.isRequired,
  busName: PropTypes.string.isRequired,
  lunchName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  clearField: PropTypes.func.isRequired,
}

export { Round }
