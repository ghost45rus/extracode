import AuthService from 'api/auth/auth.service'

class IntroduceTypesService {
  getIntroduceTypesAll () {
    return AuthService.middleware('GET', 'introduce-type/show-all').then(res => res.data)
  }
}

export default new IntroduceTypesService()
