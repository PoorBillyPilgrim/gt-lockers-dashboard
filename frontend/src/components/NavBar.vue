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
          <router-link
            to="/login"
            class="navbar-item"
          >
            Log Out
          </router-link>
        </div>
      </div>
      <!--<b-navbar-item tag="div">
          <div class="icon-text">
            <span>Hello, User</span>
            <b-icon
              icon="account"
            ></b-icon>
          </div>
      </b-navbar-item>-->
      <!--<b-navbar-dropdown label="Hello, User"></b-navbar-dropdown>-->
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
