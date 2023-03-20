import AuthService from 'api/auth/auth.service'

class UserSettingsService {
  getAllUsersSettings () {
    return AuthService.middleware('GET', 'users')
  }
}

export default new UserSettingsService()
