<template>
  <div class="chatroom__body">
    <div class="message">
      <div class="message__avatar">
        <img src="https://i.pravatar.cc/32?img=68">
      </div>
      <div>
        <div class="message__info">
          <span class="message__info__name">Jeshua Stout</span>
          <span class="message__info__date">6:38PM</span>
        </div>
        <div class="message__text">
          <span class="message__ping">@pierrhack</span> I did for 6 days in Iceland
        </div>
      </div>
    </div>
    <div class="chatroom__date">
      <span>Monday, October 22nd</span>
    </div>
    <div class="message">
      <div class="message__avatar">
        <img src="https://i.pravatar.cc/32?img=70">
      </div>
      <div>
        <div class="message__info">
          <span class="message__info__name">Harold Adams</span>
          <span class="message__info__date">5:02 PM</span>
        </div>
        <div class="message__text">
          Which country to visit next? This is a photo with my friends - celeberating in Bali <span class="emoji__sunglasses" />
          <div class="message__image">
            <span class="message__image__link">my-top-places.png</span>
            <img src="../assets/images/my-top-places.png">
          </div>
        </div>
      </div>
    </div>
    <div class="chatroom__date">
      <span>Yesterday</span>
    </div>
    <div class="message">
      <div class="message__avatar">
        <img src="https://i.pravatar.cc/32?img=47">
      </div>
      <div>
        <div class="message__info">
          <span class="message__info__name">Aada Laine</span>
          <span class="message__info__date">11:54 PM</span>
        </div>
        <div class="message__text">
          <span class="message__ping">@har_adams</span> wow it's amazing, I want to buy a van and travel next year <span class="emoji__bus" />
        </div>
      </div>
    </div>
    <div class="chatroom__date">
      <span>Today</span>
    </div>
    <div class="message">
      <div class="message__avatar">
        <img src="https://i.pravatar.cc/32?img=48">
      </div>
      <div>
        <div class="message__info">
          <span class="message__info__name">Nala Hester</span>
          <span class="message__info__date">11:54 AM</span>
        </div>
        <div class="message__text">
          Working from a van in Australia isn't feasible if you need internet. It may have improved over the last years but I spent some time in a camper van around Tasmania and internet was a real problem (and Tasmania is tiny compared to the rest of the country).
        </div>
      </div>
    </div>
    <div class="message">
      <div class="message__avatar">
        <img src="https://i.pravatar.cc/32?img=51">
      </div>
      <div>
        <div class="message__info">
          <span class="message__info__name">Ramon Bateman</span>
          <span class="message__info__date">11:59 AM</span>
        </div>
        <div class="message__text">
          <span class="message__ping">@aa_da</span> What's the reason for the van? Saving money or just like to get outside? If you've got a stable source of income you could always do some short term Airbnbs + buy a truck/topper, build a platform in the back. That way you can always convert it back to a truck and sleep in an apartment if you want.
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.chatroom__body {
  @apply p-5 flex-1;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  border-top: 1px solid rgba(0,0,0,0.12);
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
