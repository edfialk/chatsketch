<template>
  <div class="sidebar">
    <img src="../assets/images/dots-os.png">
    <div class="server__list">
      <div v-for="(server, name) in servers" :key="name">
        <img
          :src="getImage(server)"
          :alt="name"
          :class="{ active: name === active }"
          @click="onClickServer(name)"
        >
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
    },
    onClickServer (name) {
      this.$store.dispatch('changeServer', name)
    }
  }

}
</script>

<style lang="scss">
.sidebar {
    background: rgba(0,0,0,0.7);
    height: 100vh;
    width: 75px;
    @apply p-3 flex flex-col items-center;
}
.server__list {
    @apply flex flex-col items-center py-5 flex-grow;
}
.server__list div {
  @apply py-2;
}
.server__list img {
  opacity: 0.5;
  cursor: pointer;
}
.server__list img:hover {
  opacity: 0.8;
}
.server__list img.active {
  opacity: 1;
}
</style>
