<template>
  <b-modal
    :active="isActive"
    :can-cancel="false"
    has-modal-card
  >
    <form @submit.prevent="login" class="modal-card">
      <header class="modal-card-head">Login</header>
      <section class="modal-card-body">
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
      </section>
      <footer class="modal-card-foot">
        <b-button native-type="submit">
          Login
        </b-button>
      </footer>
    </form>
  </b-modal>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      isActive: true,
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (this.email === 'test@test.com' && this.password === 'test') {
        this.isActive = false
        this.$emit('login')
      }
    }
  }
}
</script>