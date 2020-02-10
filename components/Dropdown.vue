<template>
  <div class="dropdown relative inline-block">
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
        :class="{
          'left-0': pos == 'left',
          'right-0': pos == 'right'
        }"
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
      const width = getComputedStyle(element).width

      element.style.width = width
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
        this.$refs.trigger.classList.add('open')
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
      this.$refs.trigger.classList.remove('open')
    }
  }

}
</script>

<style lang="scss" scoped>
// try and force hardware acceleration
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
.dropdown__trigger {
  // transition: background-color .5s ease;
  @apply relative z-10 block overflow-hidden p-3;
  &:focus {
    @apply outline-none border-white;
  }
  &.open {
    @apply bg-white text-black rounded-t-lg shadow;
  }
}
.dropdown__popup {
  @apply border-b text-black text-sm absolute w-full bg-white rounded-b-lg shadow-xl;
}
.dropdown-enter-active, .dropdown-leave-active {
  transition: height .3s ease-in-out;
  overflow: hidden;
}
.dropdown-enter, .dropdown-leave-to {
  height: 0;
}
</style>
