<template>
  <div
    :class="{
      'left': pos == 'left',
      'right': pos == 'right'
    }"
    class="dropdown relative inline-block"
  >
    <button ref="trigger" @click="isOpen = !isOpen" class="dropdown__trigger">
      <slot />
    </button>
    <transition
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
      name="dropdown"
    >
      <div
        v-if="isOpen"
        class="dropdown__popup"
      >
        <slot name="options" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {

  props: {
    pos: {
      type: String,
      default: 'left'
    }
  },

  data: () => ({
    isOpen: false
  }),

  created () {
    const handleEscape = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false
      }
    }

    addEventListener('keydown', handleEscape)

    this.$once('hook:beforeDestroy', () => {
      removeEventListener('keydown', handleEscape)
    })
  },

  methods: {
    enter (element) {
      const trigger = this.$refs.trigger
      this.$el.style.height = getComputedStyle(trigger).height

      const optionsWidth = getComputedStyle(element).width

      element.style.width = optionsWidth
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0

      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line
      getComputedStyle(element).height

      // Trigger the animation.
      // We use `setTimeout` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      setTimeout(() => {
        element.style.height = height

        this.$el.classList.add('open')

        const triggerStyle = getComputedStyle(trigger)
        const offset = parseFloat(triggerStyle.height) -
                       parseFloat(triggerStyle.paddingBottom) -
                       parseFloat(triggerStyle.borderBottomWidth)
        element.style.top = offset + 'px'

        if (parseFloat(optionsWidth) > parseFloat(triggerStyle.width)) {
          trigger.style.width = optionsWidth
          element.style.width = optionsWidth
        } else {
          element.style.width = triggerStyle.width
          trigger.style.width = triggerStyle.width
        }
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
    },
    leave (element) {
      const height = getComputedStyle(element).height

      element.style.height = height

      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line
      getComputedStyle(element).height

      setTimeout(() => {
        element.style.height = 0
      })
    },
    afterLeave (element) {
      const trigger = this.$refs.trigger
      this.$el.classList.remove('open')
      trigger.style.width = null
    }
  }

}
</script>

<style lang="scss" scoped>
try and force hardware acceleration
* {
  will-change: height, width;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
