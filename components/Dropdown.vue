<template>
  <div class="dropdown relative inline-block">
    <button @click="isOpen = !isOpen" :class="{ open: isOpen }" class="dropdown__trigger">
      <slot />
    </button>
    <transition name="slide">
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
  }
}
</script>

<style lang="scss">
.dropdown__trigger {
  @apply relative z-10 block overflow-hidden p-3;
  &:focus {
    @apply outline-none border-white;
  }
  &.open {
    @apply bg-white text-black rounded-t-lg border-b shadow;
  }
}
.dropdown__popup {
  @apply text-black text-sm absolute w-full bg-white rounded-b-lg shadow-xl;
  & *:last-child {
    @apply rounded-b-lg;
  }
}
</style>
