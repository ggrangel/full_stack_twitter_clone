import $ from 'jquery'
import { createUser } from './requests.js'

$(document).ready(function () {
  $(document).on('click', '#sign-up-btn', function (e) {
    e.preventDefault()
    var usernameInput = $('#su-username').val()
    var emailInput = $('#su-email').val()
    var passwordInput = $('#su-password').val()
    createUser(usernameInput, emailInput, passwordInput, function () {
      // signInUser(usernameInput, passwordInput, function () {
      //   authenRedirect()
      // })
    })
  })
})
