<template>
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
</template>

<script>

export default {

  props: {
    message: {
      type: Object,
      default: () => ({
        user: {
          icon: '',
          name: ''
        },
        date: null
      })
    }
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
    }
  }

}

</script>
