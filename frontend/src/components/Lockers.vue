<template>
  <b-table
    :data="data"
    :columns="columns"
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
      columns: [
        {
          field: 'id',
          label: 'ID',
          numeric: true
        },
        {
          field: 'locker_number',
          label: 'Locker Number',
          numeric: true
        },
        {
          field: 'building',
          label: 'Building',
          numeric: true
        },
        {
          field: 'floor',
          label: 'Floor',
          numeric: true
        },
        {
          field: 'locker_group',
          label: 'Locker Group'
        },
        {
          field: 'patron_name',
          label: 'Patron'
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
            let { data } = await axios.get('http://localhost:4000/lockers')
            for (let i = 0; i < 5; i++) {
                this.data.push(data[i])
            }
        } catch (err) {
            console.error(err)
        }
      }
  }
}
</script>
<style lang="scss" scoped>
    
</style>