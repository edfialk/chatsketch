<template>
  <div ref="room" class="chatroom__body">
    <div v-for="(message, index) in messages" :key="message.date">
      <div v-if="index > 0 && isNewDay(index)" class="chatroom__date">
        <span>{{ message.date | date }}</span>
      </div>
      <Message :message="message" />
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
import { mapState } from 'vuex'
import Message from './Message'

export default {

  components: { Message },

  computed: {

    ...mapState({
      server: state => state.user.server,
      channel: state => state.user.channel,
      rooms: state => state.rooms
    }),

    messages () {
      const server = this.rooms[this.server]
      if (server) {
        return server[this.channel]
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

    if (this.server && this.server.name && this.channel) {
      this.$store.dispatch('messages', {
        server: this.server.name,
        channel: this.channel
      })
    }
  },

  methods: {
    isNewDay (index) {
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
