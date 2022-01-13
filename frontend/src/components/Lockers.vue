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
      data: [
        {'id': 1, 'patron': 'Tyler', 'locker_number': 1234},
        {'id': 2, 'patron': 'Sarah', 'locker_number': 5678}
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          numeric: true
        },
        {
          field: 'patron',
          label: 'Patron'
        },
        {
          field: 'locker_number',
          label: 'Locker Number',
          numeric: true
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
            let data = await axios.get('http://localhost:4000/lockers')
            console.log(data)
        } catch (err) {
            console.error(err)
        }
      }
  }
}
</script>
<style lang="scss" scoped>
    
</style>