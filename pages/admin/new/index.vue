<template>
  <UserNew />
</template>

<script>
import UserNew from '~/components/admin/UserNew.vue';

export default {
  components: {
    UserNew
  },

  middleware: ['check-auth', 'check-admin'],
}
</script>

<style lang="scss" scoped>

</style>