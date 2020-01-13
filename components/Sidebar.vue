<template>
  <div class="sidebar">
    <img src="../assets/images/dots-os.png">
    <div class="server-list">
      <div v-for="server in servers" :key="server.name">
        <img :src="serverImage(server)" :alt="server.name">
      </div>
    </div>
    <font-awesome-icon :icon="['fas', 'plus-circle']" color="#454444" style="font-size: 40px;" />
  </div>
</template>

<script>

export default {
  computed: {
    servers () {
      return this.$store.state.servers.list
    }
  },
  methods: {
    addServer (e) {
      this.$store.commit('servers/add', e.target.value)
      e.target.value = ''
    },
    serverImage (server) {
      return require(`../assets/images/${server.image}`)
    }
  }
}
</script>
