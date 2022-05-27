<template>
  <div>
    <TheHeader />
    <Nuxt />
  </div>
</template>

<script>
import Cookie from 'js-cookie';

import TheHeader from '~/components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader
  },

  mounted() {
    console.log('default.vue mounted is running')
    // console.log(`expiration date from cookie : ${Cookie.get('expiryDate')}`)
    this.$store.dispatch('auth/autoLogout', Cookie.get('expiryDate') - new Date().getTime())
  }
}
</script>
