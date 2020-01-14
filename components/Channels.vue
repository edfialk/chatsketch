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
        <div>11</div>
      </div>
      <ul class="channels-block__items">
        <li class="active">#general</li>
        <li>#support</li>
        <li>#marketing</li>
        <li>#thailand</li>
        <li>#bali</li>
        <li>#poland</li>
        <li>#australia</li>
        <li>#jobs</li>
        <li>#startups</li>
        <li>#italy</li>
        <li>#freelance</li>
      </ul>
    </div>
    <div class="channels-block">
      <div class="channels-block__title flex-spaced">
        <div>FRIENDS</div>
        <div>82</div>
      </div>
      <ul class="channels-block__items friends__list">
        <li>
          <div class="friend__icon friend__icon--active" />
          <img src="https://i.pravatar.cc/32?img=68">
          <span>Orlando Diggs</span>
        </li>
        <li>
          <div class="friend__icon friend__icon--active" />
          <img src="https://i.pravatar.cc/32?img=47">
          <span>Carmen Velasco</span>
        </li>
        <li>
          <div class="friend__icon" />
          <img src="https://i.pravatar.cc/32?img=49">
          <span>Marie Jensen</span>
        </li>
        <li>
          <div class="friend__icon" />
          <img src="https://i.pravatar.cc/32?img=33">
          <span>Alex Lee</span>
        </li>
        <li>
          <div class="friend__icon" />
          <img src="https://i.pravatar.cc/32?img=18">
          <span>Leo Gill</span>
        </li>
        <li>
          <div class="friend__icon" />
          <img src="https://i.pravatar.cc/32?img=9">
          <span>Britney Cooper</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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

  & .active {
    font-weight: 700;
    @apply text-white rounded;
    background-color: rgba(255, 255, 255, 0.2);
  }
}
.friends__list {
  div {
    @apply inline-block;
  }
  img {
    @apply rounded inline-block ml-1 mr-3;
  }
}
.friend__icon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #666;
}
.friend__icon--active {
  background-color: #70CC16;
}
</style>
