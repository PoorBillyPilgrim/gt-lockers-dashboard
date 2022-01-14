<template>
  <b-table
    :data="lockers"
    :columns="columns"
    :paginated="isPaginated"
    :per-page="perPage"
    :current-page.sync="currentPage"
  />
</template>
<script>
export default {
  name: 'LockerTable',
  props: {
    lockers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isLoading: true,
      isPaginated: true,
      perPage: 20,
      currentPage: 1,
      columns: [
        {
          field: 'id',
          label: 'ID',
          numeric: true,
          width: '40'
        },
        {
          field: 'locker_number',
          label: 'Locker Number',
          numeric: true
        },
        {
          field: 'patron_name',
          label: 'Patron',
          searchable: true
        },
        {
          field: 'building',
          label: 'Building'
        },
        {
          field: 'floor',
          label: 'Floor',
          numeric: true
        },
        {
          field: 'locker_group',
          label: 'Locker Group'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
    
</style>