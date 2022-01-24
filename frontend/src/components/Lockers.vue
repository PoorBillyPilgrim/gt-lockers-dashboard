<template>
  <div class="container is-max-widescreen mt-5">
    <router-view 
      :lockers="lockers"
      :is-loading="isLoading"
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
      lockers: []
    }
  },
  created: function() {
    this.getLockers()
    this.$root.$on('update', () => this.getLockers())
  },
  methods: {
    async getLockers() {
      try {
        this.isLoading = true
        let {data} = await axios.get('http://localhost:4000/lockers')
        data.forEach(locker => {
          locker.building = this.capitalize(locker.building)
          locker.locker_group = this.capitalize(locker.locker_group)
          locker.locker_size = this.capitalize(locker.locker_size)
        })
        this.lockers = data
        this.isLoading = false
      } catch (err) {
        console.error(err)
      }
    },
    capitalize(word) {
      word = word.split('_')
      if (word[0][0] === undefined) return // for blank values, need to refactor
      return word.length === 1 ? 
        `${word[0][0].toUpperCase()}${word[0].substring(1)}` :
        `${word[0][0].toUpperCase()}${word[0].substring(1)} ${word[1][0].toUpperCase()}${word[1].substring(1)}`
    }
  }
}
</script>
<style lang="scss" scoped>
    
</style>