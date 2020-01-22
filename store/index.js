export const state = () => ({
  user: {
    name: '',
    friends: [],
    servers: [],
    server: null,
    channel: null
  },
  servers: {}
})

export const mutations = {
  user (state, user) {
    state.user = user
  },
  server (state, server) {
    state.user.server = server
  },
  channel (state, channel) {
    state.user.channel = channel
  },
  messages (state, { server, channel, messages }) {
    if (!state.servers[server]) {
      state.servers = { ...state.servers, [server]: {} }
    }

    if (!state.servers[server][channel]) {
      state.servers[server] = { ...state.servers[server], [channel]: {} }
    }

    state.servers[server][channel] = messages
  }
}

export const actions = {
  load ({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch('/seeds/user.json')
      const user = await response.json()
      commit('user', user)
      resolve()
    })
  },

  messages ({ commit }, { server, channel }) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(`/seeds/${server}.${channel}.json`)
      const { data } = await response.json()
      commit('messages', { server, channel, messages: data })
      resolve()
    })
  }
}

export const getters = {
  channels: state => state.user.server ? state.user.server.channels : []
}
