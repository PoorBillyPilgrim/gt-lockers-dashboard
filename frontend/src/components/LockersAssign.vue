<template>
  <h1>{{ isLoading }}</h1>
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
    }
  }
}
</script>
<style scoped>

</style>