<template>
  <div>
    <h1 class="title">{{ title }}</h1>
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