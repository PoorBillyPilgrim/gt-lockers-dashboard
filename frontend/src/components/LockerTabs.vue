<template>
  <div>
    <h1 class="title">
      {{ title }}
    </h1>
    <b-tabs
      type="is-boxed"
      size="is-medium"
    >
      <div v-if="isLoading">
        <b-loading
          v-model="isLoading"
          :is-full-page="true"
        />
      </div>
      <template 
        v-for="(totals,group,groupIdx) in groupStatuses" 
        v-else
      >
        <b-tab-item
          :key="groupIdx"
          :label="group"
        >
          <div class="columns">
            <div class="column is-one-quarter">
              <div
                v-for="(total,status,statusIdx) in totals"
                :key="statusIdx"
                class="columns"
              >
                <p class="column">
                  {{ status }}
                </p>
                <div class="column" />
                <div class="column">
                  <b-tag :type="statusType(status)">
                    {{ total }}
                  </b-tag>
                </div>
              </div>
            </div>
            <LockerTable
              class="column"
              :lockers="lockers"
              :group="group"
              :is-loading="isLoading"
            />
          </div>
        </b-tab-item>
      </template>
    </b-tabs>
  </div>
</template>
<script>
import LockerTable from '@/components/LockerTable.vue'
export default {
  name: 'LockerTabs',
  components: {
    LockerTable
  },
  props: {
    title: {
      type: String,
      default: 'Lockers'
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    lockers: {
      type: Array,
      default: () => []
    },
    schema: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tabs: ['All', 'General', 'Graduate', 'Faculty'],
      groups: {}
    }
  },
  computed: {
    groupStatuses() {
      this.tabs.forEach(tab => {
        this.groups[tab] = {}
        this.schema.locker_status.forEach(status => {
          this.groups[tab][status] = 0
        })
      })
      
      this.lockers.forEach(locker => {
        let tab = locker.locker_group
        let status = locker.locker_status
        this.groups['All'][status]++
        this.groups[tab][status]++
      })
      return this.groups
    }
  },
  methods: {
    statusType(status) {
      if (status === 'available') return 'is-success'
      return 'is-danger'
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
</script>