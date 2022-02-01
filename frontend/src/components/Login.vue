<template>
  <form
    class="box"
    @submit.prevent="submit"
  >
    <b-field label="Email">
      <b-input value="Please enter your GT email" />
    </b-field>
    <b-field label="Password">
      <b-input
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
  methods: {
    submit() {
      console.log('submitted!')
    }
  }
}
</script>