import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', (val) => {
  if (val.indexOf('/') > 0) {
    const p = val.split('/')
    return moment('2020-01-01 ' + p[1]).format('h:mm A')
  }
  return moment(val).format('h:mm A')
})

Vue.filter('date', (val) => {
  if (val.indexOf('/') > 0) {
    const p = val.split('/')
    if (p[0] === 'yesterday') {
      return 'Yesterday'
    } else if (p[0] === 'today') {
      return 'Today'
    }
  }
  return moment(val).format('dddd, MMMM Do')
})
