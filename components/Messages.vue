<template>
  <div ref="room" @scroll="updateScrollPosition" class="chatroom__body">
    <div v-for="(message, index) in messages" :key="message.date">
      <div v-if="index > 0 && messageIsNewDay(index)" class="chatroom__date">
        <span>{{ message.date | date }}</span>
      </div>
      <div class="message">
        <div class="message__avatar">
          <img :src="message.user.icon" alt="">
        </div>
        <div>
          <div class="message__info">
            <span class="message__info__name">{{ message.user.name }}</span>
            <span class="message__info__date">{{ message.date | time }}</span>
          </div>
          <div v-html="parse(message.text)" class="message__text" />
          <div v-if="message.image" class="message__image">
            <span class="message__image__link">{{ message.image.name }}</span>
            <img :src="message.image.src" alt="user image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require('moment')

export default {

  filters: {
    date (value) {
      if (value.indexOf('/') > 0) {
        const p = value.split('/')
        if (p[0] === 'yesterday') {
          return 'Yesterday'
        } else if (p[0] === 'today') {
          return 'Today'
        }
      }
      return moment(value).format('dddd, MMMM Do')
    },

    time (value) {
      if (value.indexOf('/') > 0) {
        const p = value.split('/')
        return moment('2020-01-01 ' + p[1]).format('h:mm A')
      }
      return moment(value).format('h:mm A')
    }
  },

  data: () => ({
    scrollPos: 0,
    observer: null
  }),

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

  mounted () {
    const el = this.$refs.room
    this.observer = new MutationObserver((e) => {
      if (el.scrollTop <= (el.scrollHeight - el.offsetHeight - 63)) { // client has scrolled up
        return
      }
      el.scrollTop = el.scrollHeight
    })
    this.observer.observe(el, { childList: true, subtree: true })
  },

  methods: {
    parse (message) {
      /* eslint-disable */
      const replacements = [
        { '<[^>]+>[^<]+<[^>]+>': '' }, // remove user html
        { '@[^\\s]+': '<span class="message__ping">$&</span>' }, // user pings
        { 'emoji__[^\\s]+': '<span class="$&" />' } // emojis
      ]
      /* eslint-enable */

      return replacements.reduce((f, s) => {
        const re = new RegExp(Object.keys(s)[0], 'gi')
        return f.replace(re, s[Object.keys(s)[0]])
      }, message)
    },

    messageIsNewDay (index) {
      const prev = this.messages[index - 1]
      const curr = this.messages[index]

      if (!prev || !curr) {
        return false
      }

      const prevDate = prev.date
      const currDate = curr.date

      // I want dates to show up as yesterday/today like design, which I can't do from static date
      // so I store it as "yesterday"/"today"
      if (currDate.includes('yesterday') && !prevDate.includes('yesterday')) {
        return true
      }

      if (prevDate.includes('yesterday') && currDate.includes('today')) {
        return true
      }

      if (prevDate.includes('today')) {
        return false // only for demo, timestamps will be out of order with new msgs
      }

      return moment(currDate).isAfter(moment(prevDate), 'day')
    },

    updateScrollPosition () {
      this.scrollPos = this.$refs.room.scrollTop
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
