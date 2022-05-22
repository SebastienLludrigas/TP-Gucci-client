<template>
  <section>
    <client-only>
      <LoginForm />
    </client-only>
  </section>
</template>

<script>
import LoginForm from '../components/login/LoginForm'

export default {
  components: {
    LoginForm
  }
}
</script>

<style>

</style>
