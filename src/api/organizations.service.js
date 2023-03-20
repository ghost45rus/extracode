import AuthService from 'api/auth/auth.service'

class OrganizationsService {
  getOrganizations (isExternal) {
    return AuthService.middleware('GET', `org-divisions?isExternal=${isExternal}`).then(res => res.data)
  }

  getObjects () {
    return AuthService.middleware('GET', 'org-divisions/objects').then(res => res.data)
  }
}

export default new OrganizationsService()
