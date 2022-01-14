<template>
  <b-table
    :data="data"
    :columns="columns"
    :paginated="isPaginated"
    :per-page="perPage"
    :current-page.sync="currentPage"
  />
</template>
<script>
import axios from 'axios'

export default {
  name: 'Lockers',
  data() {
    return {
      isLoading: true,
      data: [],
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
          field: 'building',
          label: 'Building',
          searchable: true
        },
        {
          field: 'floor',
          label: 'Floor',
          numeric: true
        },
        {
          field: 'locker_group',
          label: 'Locker Group',
          searchable: true
        },
        {
          field: 'patron_name',
          label: 'Patron',
          searchable: true
        }
      ]
    }
  },
  created: function() {
    this.getLockers()
  },
  methods: {
    async getLockers() {
      try {
        let {data} = await axios.get('http://localhost:4000/lockers')
        data.forEach(locker => {
          locker.building = locker.building.split('_')
          locker.building = locker.building.length === 1 ? 
            `${locker.building[0][0].toUpperCase()}${locker.building[0].substring(1)}` :
            `${locker.building[0][0].toUpperCase()}${locker.building[0].substring(1)} ${locker.building[1][0].toUpperCase()}${locker.building[1].substring(1)}`
        })
        this.data = data
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    
</style>