import AuthService from 'api/auth/auth.service'

class ProductGroupsService {
  getProductGroupsAll () {
    return AuthService.middleware('GET', 'product-groups/show-all').then(res => res.data)
  }
}

export default new ProductGroupsService()
