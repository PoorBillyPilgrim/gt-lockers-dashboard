<template>
  <div>
    <h1>{{ isLoading }}</h1>
    <h2> {{ currentLocker }}</h2>
  </div>
</template>
<script>
export default {
  name: 'LockersAssign',
  props: {
    isLoading: {
      type: Boolean,
      default: true
    },
    lockers: {
      type: Array,
      default: () => []
    },
    currentLocker: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>

</style>