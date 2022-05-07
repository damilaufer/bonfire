import * as Yup from 'yup'

function isValidPhone() {
  // Do not use ES6 arrow functions here
  return this.test({
    name: 'isValidPhone',
    // eslint-disable-next-line object-shorthand
    test: function (value) {
      const n = (value || '').trim()
      if (!n) {
        return true
      }
      const finalN = n.replaceAll(/\D/gi, '')

      if (finalN.startsWith('0')) {
        if (finalN.length < 9 || finalN.length > 10) {
          return this.createError({
            message: 'המספר חייב להיות בין 9 או 10 ספרות',
          })
        }
        return true
      }

      return this.createError({
        message: 'המספר חייב להתחיל עם 0',
      })
    },
  })
}

Yup.addMethod(Yup.string, 'isValidPhone', isValidPhone)

export { isValidPhone }
