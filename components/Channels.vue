<template>
  <div class="channels">
    <div class="flex-spaced">
      <div class="channels__title">
        <span class="channels__title__text">Nomad List</span>
        <span class="channels__title__icon"><font-awesome-icon :icon="['fas', 'chevron-down']" /></span>
      </div>
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
export default {

  computed: {
    channels () {
      return this.$store.getters.channels
    },

    active () {
      return this.$store.state.user.channel
    },

    friends () {
      return this.$store.state.user.friends
    }
  },

  methods: {
    loadImage ($event) {
      $event.target.classList.add('loaded')
    },

    join (channel) {
      this.$store.dispatch('join', channel)
    }
  }

}
</script>

<style lang="scss">

.channels {
  padding: 35px 30px;
  color: #B5B5B5;
  & > div {
    @apply mb-6;
  }
}
.channels__title {
  .channels__title__text {
    font-size: 20px;
    font-weight: 700;
    @apply text-white;
  }
  .channels__title__icon {
    font-size: 14px;
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
  cursor: pointer
}
.channels__list .active {
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
