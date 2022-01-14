<template>
  <div class="container">
    <h1 class="is-size-2">
      Lockers
    </h1>
    <LockerTable 
      :lockers="data"
    />
  </div>
</template>
<script>
import axios from 'axios'
import LockerTable from '@/components/LockerTable.vue'

export default {
  name: 'Lockers',
  components: {
    LockerTable
  },
  data() {
    return {
      isLoading: true,
      data: []
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