export default async function handler(req, res) {
  const values = req.body.values

  const kid = {
    id: -1, // Some negative number for a new kid
    address: values.address,
    busStop: values.busStop,
    classId: Number(values.classId),
    comments: values.comments,
    email: values.email,
    emergencyPhone: values.emergencyPhone,
    fatherCellPhone: values.fatherCellPhone,
    firstName: values.firstName,
    friends: values.friends,
    lastName: values.lastName,
    medicalComments: values.medicalComments,
    medicalCommentsYesNo: values.medicalCommentsYesNo,
    motherCellPhone: values.motherCellPhone,
    neighbourhoodId: Number(values.neighbourhoodId || 0),
    otherSchool: values.otherSchool,
    parkHaMaimSubscriber: values.parkHaMaimSubscriber === 'Y',
    phone: values.phone,
    schoolId: Number(values.schoolId),
    settlementId: Number(values.settlementId),
    sex: values.sex,
    sportId: Number(values.sportId),
    swims: values.swims === 'Y',
    swimsComments: values.swimsComments,
    vegetarian: values.vegetarian === 'Y',
    vegetarianComments: values.vegetarianComments,
  }

  const round = {
    groupId: 29, // 2021
    amount: values.amount,
    busForth: values.busForth === 'Y',
    busForthComments: values.busForthComments,
    busPaid: values.busPaid,
    cashPaid: values.cashPaid,
    ccExpiration: values.ccExpiration,
    ccNumber: values.ccNumber,
    ccOwnerID: values.ccOwnerID,
    ccOwnerName: values.ccOwnerName,
    ccPaid: values.ccPaid,
    chequePaid: values.chequePaid,
    firstRound: values.firstRound === 'Y',
    lunchId: values.lunchId === 'Y',
    receiptNumber: values.receiptNumber,
    secondRound: values.secondRound === 'Y',
    secondRoundBus: values.secondRoundBus === 'Y',
    secondRoundBusComments: values.secondRoundBusComments,
    secondRoundLunchId: values.secondRoundLunchId === 'Y',
    thirdRound: values.thirdRound === 'Y',
    thirdRoundBus: values.thirdRoundBus === 'Y',
    thirdRoundBusComments: values.thirdRoundBusComments,
    thirdRoundLunchId: values.thirdRoundLunchId === 'Y',
  }

  try {
    const response = await fetch(
      'https://summer-camp-manager.herokuapp.com/api/kids',
      // 'http://localhost:5000/api/kids',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kid, round }),
      },
    )
    const contentType = response.headers.get('Content-Type')
    if (response.status !== 200) {
      let message
      if (contentType.startsWith('text/html')) {
        const text = await response.text()
        console.log(text)
        message = /<pre>(.*?)<br>/gm.exec(text)?.[1] || 'Unkown error'
      } else {
        const json = await response.json()
        message = json.statusCode
          ? ` ${json.statusCode}-${json.statusText}`
          : json.statusText
      }
      res.status(500).json({ message })
    } else {
      const json = await response.json() // parses JSON response into native JavaScript objects
      res.status(200).json(json)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ text: 'Some error!!!' })
  }
}
