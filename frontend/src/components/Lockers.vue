<template>
  <div class="container is-max-widescreen mt-5">
    <router-view 
      :lockers="lockers"
      :schema="schema"
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
      lockers: [],
      schema: {},
      urls: [
        'http://localhost:4000/lockers',
        'http://localhost:4000/lockers/schema'
      ],
      requests: []
    }
  },
  created: function() {
    this.getLockerData()
    this.$root.$on('update', () => this.getLockers())
  },
  methods: {
    async getLockerData() {
      try {
        this.makeRequests()
        const [lockers, schema] = await Promise.all(this.requests)
        this.parseLockers(lockers)
        this.schema = schema
        this.isLoading = false
      } catch (err) {
        console.error(err)
        this.$buefy.notification.open({
          indefinite: true,
          message: `Oh no!! An error connecting to the database has occurred. Please reload your browser or contact Library IT to resolve.`,
          position: 'is-top',
          type: 'is-danger',
          hasIcon: true
        })
      }
    },
    async getData(url) {
      try {
        let {data} = await axios.get(url)
        return data
      } catch (err) {
        console.error(err)
      }
    },
    makeRequests() {
      this.requests = this.urls.map(url => this.getData(url)) 
    },
    parseLockers(lockers) {
      lockers.forEach(locker => {
        locker.building = this.capitalize(locker.building)
        locker.locker_group = this.capitalize(locker.locker_group)
        locker.locker_size = this.capitalize(locker.locker_size)
      })
      this.lockers = lockers
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