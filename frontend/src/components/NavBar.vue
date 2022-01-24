<template>
  <b-navbar
    :shadow="true"
    :spaced="true"
    :centered="true"
  >
    <template #start>
      <b-navbar-item
        tag="router-link"
        :to="{path: '/'}"
      >
        Dashboard
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{path: '/assign'}"
      >
        Find Available Locker
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  name: 'NavBar'
}
</script>
<style lang="scss" scoped>

</style>
