<template>
  <b-navbar
    :shadow="true"
    :spaced="true"
    :centered="true"
  >
    <template #start>
      <b-navbar-item>
        Dashboard
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{path: '/lockers'}"
      >
        Lockers
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{path: '/assign'}"
      >
        Find Available Locker
      </b-navbar-item>
      <b-navbar-item>
        Configure
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
