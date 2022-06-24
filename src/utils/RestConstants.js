const API_ROOT = '/api/v1'
const AUTH_ROOT = API_ROOT + '/auth'
const REGISTER_ROOT = AUTH_ROOT + '/register'
const CONFIRMATION_ROOT = API_ROOT + '/verification'
const CONTACTS_ROOT = API_ROOT + '/contacts'
const CONTACTS_IMAGES_ROOT = CONTACTS_ROOT + '/images'

const UPDATE_CONTACT_AND_IMAGE = API_ROOT + '/contact-image'

const LOGIN = AUTH_ROOT + '/login'
const LOGOUT = AUTH_ROOT + '/logout'
const CHECK = AUTH_ROOT + '/check'
const ME = AUTH_ROOT + '/me'

const REGISTER_USER = REGISTER_ROOT + '/user'

const CONFIRM_EMAIL = CONFIRMATION_ROOT + '/email'

const RESEND_CONFIRM_EMAIL = CONFIRM_EMAIL + '/resend'

export {
    LOGIN,
    LOGOUT,
    CHECK,
    ME,
    REGISTER_USER,
    RESEND_CONFIRM_EMAIL,
    CONTACTS_ROOT,
    CONTACTS_IMAGES_ROOT,
    UPDATE_CONTACT_AND_IMAGE,
    CONFIRM_EMAIL
}