export const state = () => ({
  list: [
    {
      name: 'Nomad List',
      image: 'logo.png'
    },
    {
      name: 'Channel 2',
      image: 'layer-20.png'
    }
  ]
})

export const mutations = {
  add (state, channel) {
    state.list.push(channel)
  },
  remove (state, { name }) {
    state.list.splice(state.list.map(item => item.name).indexOf(name), 1)
  }
}
