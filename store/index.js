export const state = () => ({
  user: {
    name: '',
    icon: '',
    friends: [],
    servers: [],
    server: null,
    channel: null
  },
  servers: {}
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
  SET_MESSAGES (state, { server, channel, messages }) {
    if (!state.servers[server]) {
      state.servers = { ...state.servers, [server]: {} }
    }

    if (!state.servers[server][channel]) {
      state.servers[server] = { ...state.servers[server], [channel]: {} }
    }

    state.servers[server][channel] = messages
  },
  ADD_MESSAGE (state, message) {
    if (state.servers[state.user.server.name] && state.servers[state.user.server.name][state.user.channel]) {
      state.servers[state.user.server.name][state.user.channel].push(message)
    }
  }
}

export const actions = {
  load ({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch('/seeds/user.json')
      const user = await response.json()
      commit('SET_USER', user)
      resolve()
    })
  },

  messages ({ commit }, { server, channel }) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(`/seeds/${server}.${channel}.json`)
      const { data } = await response.json()
      commit('SET_MESSAGES', { server, channel, messages: data })
      resolve()
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
  }
}

export const getters = {
  channels: state => state.user.server ? state.user.server.channels : []
}
