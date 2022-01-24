<template>
  <div class="container">
    <h1 class="is-size-2">
      Lockers
    </h1>
    <router-view 
      :lockers="lockers"
      :current-locker="currentLocker"
      :tabs="tabs"
      :is-loading="isLoading"
      :is-edit-modal-active="isEditModalActive"
    />
    
    <b-modal
      v-model="isEditModalActive"
      has-modal-card
    >
      <template #default="props">
        <locker-edit-modal
          :current-locker="currentLocker"
          @close="props.close"
        />
      </template>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios'
import LockerEditModal from '@/components/LockerEditModal.vue'

export default {
  name: 'Lockers',
  components: {
    LockerEditModal
  },
  data() {
    return {
      isLoading: true,
      lockers: [],
      currentLocker: {},
      tabs: [
        {group: 'All'},
        {group: 'General'},
        {group: 'Graduate'},
        {group: 'Faculty'}
      ],
      isEditModalActive: false
    }
  },
  created: function() {
    this.getLockers()
    this.$root.$on('update', () => this.getLockers())
    this.$root.$on('edit', (id) => {
      this.currentLocker = this.lockers.find(locker => locker.id === id)
      this.isEditModalActive = true
    })
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