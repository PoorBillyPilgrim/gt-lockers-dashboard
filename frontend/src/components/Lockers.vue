<template>
  <div class="container">
    <h1 class="is-size-2">
      Lockers
    </h1>
    <router-view :lockers="data" :tabs="tabs" :is-loading="isLoading"/>
    <!--<LockersDashboard
      :lockers="data"
      :tabs="tabs"
      :is-loading="isLoading"
    />-->
    <!--<b-tabs
      type="is-boxed"
      size="is-medium"
    >
      <template v-for="(tab,index) in tabs">
        <b-tab-item
          :key="index"
          :label="tab.group"
        >
          <LockerTable 
            :lockers="data"
            :group="tab.group"
            :is-loading="isLoading"
          />
        </b-tab-item>
      </template>
    </b-tabs>-->
  </div>
</template>
<script>
import axios from 'axios'
//import LockerTable from '@/components/LockerTable.vue'
//import LockersDashboard from '@/components/LockersDashboard.vue'


export default {
  name: 'Lockers',
  components: {
    //LockersDashboard
  },
  data() {
    return {
      isLoading: true,
      data: [],
      tabs: [
        {group: 'All'},
        {group: 'General'},
        {group: 'Graduate'},
        {group: 'Faculty'}
      ]
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
        this.data = data
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