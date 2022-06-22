<template>
  <UserDetails :id="$route.params.id" />
</template>

<script>
import UserDetails from '~/components/admin/UserDetails.vue';

export default {
  components: {
    UserDetails
  },

  middleware: ['check-auth', 'check-admin'],
}
</script>

<style lang="scss" scoped>

</style>