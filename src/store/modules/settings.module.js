import UserSettingsService from 'api/user_settings.service'
import {Settings} from 'models/settings'

export default {
  namespaced: true,
  state: {
    users_settings: {
      settings: []
    },
  },
  actions: {
    async UsersSettings({ commit, dispatch }) {
      return await UserSettingsService.getAllUsersSettings().then(
        users_settings => {
          commit('usersSettingsSuccess', users_settings.data.data);
        }
      ).catch(err => {
        dispatch('setMessage', err.message ? err.message : '', {root: true})
      });
    },
  },
  mutations: {
    usersSettingsSuccess(state, data) {
      state.users_settings.settings = data
    },
  },
  getters: {
    getUserSettings: (state) => {
      return {
        rows: state.users_settings.settings.map((setting) => {
          return new Settings(setting)
        })
      }
    }
  }
}
