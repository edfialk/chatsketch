<template>
  <div class="flex">
    <Servers />
    <Channels />
    <Room />
  </div>
</template>

<script>

import Servers from '../components/Servers'
import Channels from '../components/Channels'
import Room from '../components/Room'

export default {

  components: { Servers, Channels, Room },

  async created () {
    await this.$store.dispatch('load')

    this.$store.dispatch('messages', {
      server: this.$store.state.user.server.name,
      channel: this.$store.state.user.channel
    })
  }

}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
