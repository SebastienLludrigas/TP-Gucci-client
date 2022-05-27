<template>
  <client-only>
    <UserList />
  </client-only>
</template>

<script>
import UserList from '~/components/admin/UserList';

export default {
  components: {
    UserList
  }
}
</script>

<style lang="scss" scoped>

</style>