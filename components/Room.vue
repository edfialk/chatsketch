<template>
  <div class="chatroom">
    <header class="chatroom__header">
      <div class="chatroom__title">
        #{{ title }}
        <font-awesome-icon :icon="['far', 'star']" />
      </div>
      <div class="chatroom__header--right">
        <font-awesome-icon :icon="['far', 'user']" class="icon mr-1" />
        <span class="icon ml-1">{{ users }}</span>
        <div class="search mx-3">
          <input type="text" placeholder="Search..">
          <font-awesome-icon :icon="['fas', 'search']" />
        </div>
        <font-awesome-icon :icon="['far', 'bell']" class="has-alert icon mx-3" />
        <font-awesome-icon :icon="['fas', 'ellipsis-v']" class="icon mx-3" />
      </div>
    </header>
    <Messages />
    <div class="chatroom__footer">
      <div class="icon">
        <font-awesome-icon :icon="['fas', 'paperclip']" />
      </div>
      <div class="icon">
        <font-awesome-icon :icon="['fas', 'microphone']" />
      </div>
      <input
        :placeholder="`Message in #${title}`"
        v-model.trim="myMessage"
        @keyup.enter="submitMessage"
        class="chatbox"
        type="text"
      >
      <div class="icon">
        <font-awesome-icon :icon="['far', 'smile']" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Messages from './Messages'

export default {

  components: { Messages },

  data: () => ({
    myMessage: ''
  }),

  computed: {
    users () {
      return '1,093'
    },

    ...mapState({
      title: state => state.user.channel,
      server: state => state.user.server.name
    })
  },

  // watch: {
  //   title (newChannel) {
  //     this.$store.dispatch('fetchServer', this.server)
  //   }
  // },

  methods: {
    submitMessage () {
      if (this.myMessage === '') {
        return
      }

      this.$store.dispatch('submit', this.myMessage)
      this.myMessage = ''
    }
  }

}
</script>

<style lang="scss">

.chatroom {
    background: #fff;
    flex: 1;
    height: 100vh;
    @apply flex flex-col leading-loose;
}
.chatroom__header {
  @apply flex justify-between p-4;
  // border-bottom: 1px solid rgba(0,0,0,0.12);
}
.chatroom__title {
  @apply font-bold text-xl;
  // flex: 1;
}
.chatroom__footer {
  @apply px-5 flex items-center text-lg;
  // font-size: 14px;
  .icon {
    @apply mr-4;
  }
}
.icon {
  position: relative;
  color: #8D8D8D;
  // @apply mx-3;
  &:hover {
    cursor: pointer;
  }
}
.chatbox {
  flex: 1;
  @apply px-3 py-4;
  &:focus {
    @apply outline-none;
  }
}
.search {
  @apply border border-gray-500 rounded px-3 mx-3;
  color: #8D8D8D;
  input:focus {
    @apply outline-none;
  }
}
.chatroom__header--right {
  @apply flex items-center;
}

</style>
