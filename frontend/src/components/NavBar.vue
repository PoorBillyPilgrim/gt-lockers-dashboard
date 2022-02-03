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
      <b-navbar-item
        tag="router-link"
        :to="{path: '/settings'}"
      >
        Settings
      </b-navbar-item>
    </template>
    <template #end>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          <div class="icon-text">
            <span>Hello, User</span>
            <b-icon
              icon="account"
            />
          </div>
        </a>
        <div class="navbar-dropdown">
          <a class="navbar-item">Test 1</a>
          <a class="navbar-item">Test 2</a>
          <hr class="navbar-divider">
          <a
            class="navbar-item"
            @click="$emit('logout')"
          >
            Log Out
          </a>
        </div>
      </div>
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
