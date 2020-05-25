import Vue from 'vue'

export const state = Vue.observable({
  token: '',
  user: {},
})

export const mutations = {
  setToken: (token) => (state.token = token),
  setUser: (user) => (state.user = user),
}
