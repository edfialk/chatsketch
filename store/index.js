import Vue from 'vue'

export const state = () => ({
  user: {
    name: '',
    icon: '',
    friends: [],
    servers: [],
    server: '',
    channel: ''
  },
  rooms: {}
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_SERVER (state, server) {
    state.user.server = server
  },
  SET_CHANNEL (state, channel) {
    state.user.channel = channel
  },
  SET_ROOMS (state, { server, rooms }) {
    Vue.set(state.rooms, server, rooms)
  },
  ADD_MESSAGE (state, message) {
    const server = state.rooms[state.user.server] || {}
    const channel = server[state.user.channel]
    if (channel) {
      channel.push(message)
    }
  }
}

export const actions = {
  fetchUser ({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch('/seeds/user.json')
      const user = await response.json()
      commit('SET_USER', user)
      resolve()
    })
  },

  fetchServer ({ commit }, server) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(`/seeds/${server}.json`)
      const rooms = await response.json()
      commit('SET_ROOMS', { server, rooms })
    })
  },

  submit ({ commit, state }, text) {
    return new Promise((resolve, reject) => {
      const message = {
        user: {
          name: state.user.name,
          icon: state.user.icon
        },
        date: new Date().toISOString(),
        text
      }

      commit('ADD_MESSAGE', message)
      resolve()
    })
  },

  changeChannel ({ commit, state }, channel) {
    return new Promise((resolve, reject) => {
      if (channel) {
        commit('SET_CHANNEL', channel)
      }
      resolve()
    })
  },

  changeServer ({ commit }, server) {
    return new Promise((resolve, reject) => {
      if (server) {
        commit('SET_SERVER', server)
      }
      resolve()
    })
  }
}

export const getters = {
  channels: state => state.rooms[state.user.server] ? Object.keys(state.rooms[state.user.server]) : []
}
