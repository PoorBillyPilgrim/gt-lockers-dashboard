<template>
  <div class="container">
    <h1 class="is-size-2">
      Lockers
    </h1>
    <b-table
      :data="data"
      :columns="columns"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
    />
  </div>
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
  },
  created: function() {
    this.getLockers()
  },
  methods: {
    async getLockers() {
      try {
        let {data} = await axios.get('http://localhost:4000/lockers')
        data.forEach(locker => {
          locker.building = this.capitalize(locker.building)
          locker.locker_group = this.capitalize(locker.locker_group)
        })
        this.data = data
      } catch (err) {
        console.error(err)
      }
    },
    capitalize(word) {
      word = word.split('_')
      return word.length === 1 ? 
        `${word[0][0].toUpperCase()}${word[0].substring(1)}` :
        `${word[0][0].toUpperCase()}${word[0].substring(1)} ${word[1][0].toUpperCase()}${word[1].substring(1)}`
    }
  }
}
</script>
<style lang="scss" scoped>
    
</style>