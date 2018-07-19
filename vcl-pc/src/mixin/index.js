import sessionStorage from '../../src/assets/js/storage/sessionStorage'

export const userMixin = {
  computed: {
    user () {
      return sessionStorage.getItem('user')
    }
  }
}
