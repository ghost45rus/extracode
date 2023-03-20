import settingsService from 'config/settingsService'

class AuthService {
  login (user) {
    return settingsService.gateway
      .post('auth/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data.data))
        }
        return response.data.data
      })
  }

  getRefreshToken (user) {
    return settingsService.gateway
      .post('auth/refresh_token', {
        refreshToken: user.refreshToken
      })
      .then(response => {
        if (response.data.data.accessToken) {
          return response.data.data.accessToken
        }
      })
  }

  async middleware (type, URL, data = null, service = 'gateway') {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'))
    if (new Date() > new Date(userLocalStorage.accessToken.expiryDate)) {
      await this.getRefreshToken(userLocalStorage).then(res => {
        const user = Object.assign(userLocalStorage, { accessToken: res })
        localStorage.setItem('user', JSON.stringify(user))
      })
    }
    switch (service) {
      case 'gateway':
        switch (type) {
          case 'GET':
            return await settingsService.gateway.get(URL, { headers: this.authHeader() })
          case 'POST':
            return await settingsService.gateway.post(URL, data, { headers: this.authHeader() })
        }
        break
    }
  }

  authHeader () {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.accessToken) {
      return { Authorization: user.accessToken.token }
    }
    return {}
  }

  logout () {
    localStorage.removeItem('user')
    localStorage.removeItem('filters')
  }
}
export default new AuthService()
