<template>
  <div class="chatroom__body">
    <div v-for="message in messages" :key="message.date">
      <div class="message">
        <div class="message__avatar">
          <img :src="message.user.icon" alt="">
        </div>
        <div>
          <div class="message__info">
            <span class="message__info__name">{{ message.user.name }}</span>
            <span class="message__info__date">{{ message.date }}</span>
          </div>
          <div v-html="parse(message.text)" class="message__text" />
          <div v-if="message.image" class="message__image">
            <span class="message__image__link">{{ message.image.name }}</span>
            <img :src="message.image.src" alt="user image">
          </div>
        </div>
      </div>
    </div>
    <div class="chatroom__date">
      <span>Monday, October 22nd</span>
    </div>
    <div class="chatroom__date">
      <span>Yesterday</span>
    </div>
    <div class="chatroom__date">
      <span>Today</span>
    </div>
  </div>
</template>

<script>
export default {

  computed: {
    messages () {
      const user = this.$store.state.user
      const server = user.server
      const channel = user.channel
      const servers = this.$store.state.servers
      if (server && channel && servers[server.name]) {
        return servers[server.name][channel]
      }
      return []
    }
  },

  methods: {
    parse (message) {
      /* eslint-disable */
      const replacements = [
        { '<[^>]+>[^<]+<[^>]+>': '' }, // remove user html
        { '@[^\\s]+': '<span class="message__ping">$&</span>' },
        { 'emoji__[^\\s]+': '<span class="$&" />' }
      ]
      /* eslint-enable */

      const res = replacements.reduce((f, s) => {
        const re = new RegExp(Object.keys(s)[0], 'gi')
        return f.replace(re, s[Object.keys(s)[0]])
      }, message)

      return res
    }
  }

}
</script>

<style lang="scss">
.chatroom__body {
  @apply p-5 flex-1;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  border-top: 1px solid rgba(0,0,0,0.12);
  overflow: auto;
}
.message {
  @apply flex items-start mb-3;
}
.message__avatar {
  width: 32px;
  height: 32px;
  @apply mr-3 flex-none;
  img {
    @apply rounded;
  }
}
.message__info {
  font-size: 12px;
  .message__info__name {
    font-weight: 700;
    @apply mr-1;
  }
  .message__info__date {
    color: #8D8D8D;
  }
}
.message__ping {
  color: #3577EF;
}
.chatroom__date {
  text-align: center;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  line-height: 0.1em;
  margin: 12px 0 20px;
  color: #8D8D8D;
  span {
    background: #fff;
    padding: 0 18px;
  }
}
.message__image__link {
  color: #3577EF;
}
</style>
