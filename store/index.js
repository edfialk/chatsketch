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
  SET_SERVER_MESSAGES (state, { server, channels }) {
    Vue.set(state.rooms, server, channels)
  },
  ADD_MESSAGE (state, message) {
    const server = state.servers[state.server.name] || {}
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
      const messages = await response.json()
      commit('SET_SERVER_MESSAGES', { server, messages })
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

  join ({ commit, state }, channel) {
    return new Promise((resolve, reject) => {
      if (channel) {
        commit('SET_CHANNEL', channel)
      }
      resolve()
    })
  }
}

export const getters = {
  channels: state => state.rooms[state.user.server] ? Object.keys(state.rooms[state.user.server]) : []
}
