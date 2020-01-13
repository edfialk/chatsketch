<template>
  <div class="flex">
    <Sidebar />
    <Channels />
    <Chat />
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar'
import Channels from '../components/Channels'
import Chat from '../components/Chat'

export default {
  components: { Sidebar, Channels, Chat }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
