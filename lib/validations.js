import * as Yup from 'yup'

import { otherSchoolId, modiinSettlementId } from '../lib/constants'
import { hasBus } from '../lib/utils'
import './validationFunctions'

const getValidationSchema = () => {
  const validationSchema = {
    firstName: Yup.string().required('שדה חובה'),
    lastName: Yup.string().required('שדה חובה'),
    sex: Yup.string().required('שדה חובה'),
    motherCellPhone: Yup.string().required('שדה חובה').isValidPhone(),
    fatherCellPhone: Yup.string().required('שדה חובה').isValidPhone(),
    phone: Yup.string().isValidPhone(),
    emergencyPhone: Yup.string().isValidPhone(),
    email: Yup.string().required('שדה חובה').email('כתובת לא חוקית'),
    address: Yup.string().when(
      [
        'busForth',
        'secondRoundBus',
        'thirdRoundBus',
        'firstRound',
        'secondRound',
        'thirdRound',
      ],
      {
        is: hasBus,
        then: Yup.string().required('שדה חובה'),
      },
    ),
    settlementId: Yup.string().when(
      [
        'busForth',
        'secondRoundBus',
        'thirdRoundBus',
        'firstRound',
        'secondRound',
        'thirdRound',
      ],
      {
        is: hasBus,
        then: Yup.string().required('שדה חובה'),
      },
    ),
    neighbourhoodId: Yup.string().when(
      [
        'busForth',
        'secondRoundBus',
        'thirdRoundBus',
        'firstRound',
        'secondRound',
        'thirdRound',
        'settlementId',
      ],
      {
        is: (
          busForth,
          secondRoundBus,
          thirdRoundBus,
          firstRound,
          secondRound,
          thirdRound,
          settlementId,
        ) =>
          hasBus(
            busForth,
            secondRoundBus,
            thirdRoundBus,
            firstRound,
            secondRound,
            thirdRound,
          ) && settlementId === modiinSettlementId,
        then: Yup.string().required('שדה חובה'),
      },
    ),
    classId: Yup.string().required('שדה חובה'),
    schoolId: Yup.string().required('שדה חובה'),
    otherSchool: Yup.string().when('schoolId', {
      is: otherSchoolId,
      then: Yup.string().required('שדה חובה'),
    }),
    vegetarianComments: Yup.string().when('vegetarian', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    swims: Yup.string().required('שדה חובה'),
    firstRound: Yup.string().required('שדה חובה'),
    secondRound: Yup.string().required('שדה חובה'),
    thirdRound: Yup.string().required('שדה חובה'),
    medicalCommentsYesNo: Yup.string().required('שדה חובה'),
    medicalComments: Yup.string().when('medicalCommentsYesNo', {
      is: 'N',
      then: Yup.string().required('שדה חובה'),
    }),

    // First round
    busForth: Yup.string().when('firstRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    lunchId: Yup.string().when('firstRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    // seconds round
    secondRoundBus: Yup.string().when('secondRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    secondRoundLunchId: Yup.string().when('secondRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    // Third round
    thirdRoundBus: Yup.string().when('thirdRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    thirdRoundLunchId: Yup.string().when('thirdRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    termsAndConditions: Yup.boolean().oneOf([true], 'חובה לקרוא ולאשר'),

    roundSelected: Yup.string().when(
      ['firstRound', 'secondRound', 'thirdRound'],
      {
        is: (firstRound, secondRound, thirdRound) =>
          firstRound === 'N' && secondRound === 'N' && thirdRound === 'N',
        then: Yup.string().required('צריך לבחור מחזור אחד לפחות'),
      },
    ),
  }

  return Yup.object(validationSchema)
}

export { getValidationSchema }
