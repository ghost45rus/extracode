export class Settings {
  constructor (params) {
    this.id = params.id
    this.cols = [
      { value: params.lastName, type: 'string' },
      { value: params.firstName, type: 'string' },
      { value: params.secondName, type: 'string' },
      { value: params.email, type: 'string' },
      { value: params.role, type: 'string' },
      { value: params.status, type: 'string' }
    ]
  }
}
