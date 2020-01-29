<template>
  <div class="sidebar">
    <img src="../assets/images/dots-os.png">
    <div class="server-list">
      <div v-for="(server, name) in servers" :key="name">
        <img :src="getImage(server)" :alt="name">
      </div>
    </div>
    <font-awesome-icon :icon="['fas', 'plus-circle']" color="#454444" style="font-size: 40px;" />
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {

  computed: {
    ...mapState({
      servers: state => state.user.servers,
      active: state => state.user.server
    })
  },

  watch: {
    active (server) {
      if (server) {
        this.$store.dispatch('fetchServer', server)
      }
    }
  },

  methods: {
    addServer (e) {
      this.$store.commit('servers/add', e.target.value)
      e.target.value = ''
    },
    getImage (server) {
      return require(`../assets/images/${server.image}`)
    }
  }

}
</script>
