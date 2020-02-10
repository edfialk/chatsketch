<template>
  <div class="channels">
    <div class="flex-spaced">
      <Dropdown class="channels__title">
        {{ server }}
        <font-awesome-icon :icon="['fas', 'chevron-down']" size="sm" class="ml-2" />
        <template v-slot:options>
          <button
            v-for="server in otherServers"
            :key="server"
            @click="onClickServer(server)"
            class="dropdown__options"
          >
            {{ server }}
          </button>
        </template>
      </Dropdown>
      <font-awesome-icon :icon="['fas', 'cog']" />
    </div>
    <div>
      <font-awesome-icon :icon="['fas', 'comment-dots']" style="margin-right: 10px;" /> All threads
    </div>
    <div class="channels-block">
      <div class="channels-block__title flex-spaced">
        <div>CHANNELS</div>
        <div>{{ channels.length }}</div>
      </div>
      <ul class="channels-block__items channels__list">
        <li
          v-for="channel in channels"
          :key="channel"
          :class="{ active: active == channel}"
          @click="join(channel)"
        >
          #{{ channel }}
        </li>
      </ul>
    </div>
    <div class="channels-block">
      <div class="channels-block__title flex-spaced">
        <div>FRIENDS</div>
        <div>{{ friends.length }}</div>
      </div>
      <ul class="channels-block__items friends__list">
        <li
          v-for="friend in friends"
          :key="friend.name"
          :class="{ active: friend.active }"
        >
          <div class="friend__icon" />
          <img
            :src="friend.icon"
            @load="loadImage($event)"
          >
          <span>{{ friend.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Dropdown from './Dropdown'

export default {

  components: { Dropdown },

  computed: {
    channels () {
      return this.$store.getters.channels
    },

    ...mapState({
      active: state => state.user.channel,
      friends: state => state.user.friends,
      server: state => state.user.server,
      servers: state => state.user.servers
    }),

    otherServers () {
      return Object.keys(this.servers).filter(k => k !== this.server)
    }
  },

  methods: {
    loadImage ($event) {
      $event.target.classList.add('loaded')
    },

    join (channel) {
      this.$store.dispatch('changeChannel', channel)
    },

    onClickServer (server) {
      this.$store.dispatch('changeServer', server)
    }
  }

}
</script>

<style lang="scss">

.channels {
  width: 262px;
  background: rgba(37,39,42,0.6);
  padding: 35px 30px;
  color: #B5B5B5;
  & > div {
    @apply mb-6;
  }
}
.channels__title {
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  @apply text-white;
}
.dropdown__options {
  @apply block p-3 w-full text-left;
  &:hover {
    @apply bg-gray-300;
  }
  &:last-child {
    @apply rounded-b-lg;
  }
}
.channels-block {
  font-size: 14px;
}
.channels-block__title {
  font-size: 12px;
  @apply mb-3;
}
.channels-block__items {
  line-height: 17px;
  li {
    @apply p-2;
  }
}
.channels__list li:hover {
  cursor: pointer;
   background-color: rgba(255, 255, 255, 0.1);
}
.channels__list li.active {
  font-weight: 700;
  @apply text-white rounded;
  background-color: rgba(255, 255, 255, 0.2);
}
.friends__list {
  li {
    height: 48px;
    @apply flex items-center;
  }
  div {
    @apply inline-block;
  }
  img {
    width: 32px;
    opacity: 0;
    transition: opacity 1s;
    @apply rounded inline-block ml-2 mr-3;
  }
  img.loaded {
    opacity: 1;
  }
  .active .friend__icon {
    background-color: #70CC16;
  }
}
.friend__icon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #666;
}
</style>
