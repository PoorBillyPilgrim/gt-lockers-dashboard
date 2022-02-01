<template>
  <form
    class="box"
    @submit.prevent="login"
  >
    <b-field label="Email">
      <b-input
        v-model="email"
        placeholder="Please enter your GT email"
      />
    </b-field>
    <b-field label="Password">
      <b-input
        v-model="password"
        type="password"
      />
    </b-field>
    <b-button native-type="submit">
      Login
    </b-button>
  </form>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (this.email === 'test@test.com' && this.password === 'test') {
        this.$emit('login')
      }
    }
  }
}
</script>