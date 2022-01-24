<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <b-field grouped>
      <b-select placeholder="Select a locker group">
      </b-select>
      <b-select placeholder="Select a locker size"></b-select>
    </b-field>
  </div>
</template>
<script>
export default {
  name: 'LockersAssign',
  props: {
    title: {
      type: String,
      default: 'Lockers'
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    lockers: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped>

</style>