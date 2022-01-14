import { extend } from 'vee-validate'
import { required, alpha, alpha_spaces, email, max } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: ' This field is required'
})

extend('alpha', {
  ...alpha,
  message: ' This field accepts only letters'
})

extend('alpha_spaces', {
  ...alpha_spaces,
  message: ' This field accepts only letters and spaces'
})

extend('email', {
  ...email,
  message: ' This field accepts only correct email addresses'
})

extend('max', {
  ...max,
  message: ' This field can containt up to 100 characters'
})
