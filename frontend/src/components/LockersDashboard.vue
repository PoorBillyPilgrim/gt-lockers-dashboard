<template>
  <b-tabs
    type="is-boxed"
    size="is-medium"
  >
    <template v-for="(tab,index) in tabs">
      <b-tab-item
        :key="index"
        :label="tab.group"
      >
        <LockerTable 
          :lockers="lockers"
          :group="tab.group"
          :is-loading="isLoading"
        />
      </b-tab-item>
    </template>
  </b-tabs>
</template>
<script>
import LockerTable from '@/components/LockerTable.vue'
export default {
  name: 'LockersDashboard',
  components: {
    LockerTable
  },
  props: {
    isLoading: {
      type: Boolean,
      default: true
    },
    tabs: {
      type: Array,
      default: () => []
    },
    lockers: {
      type: Array,
      default: () => []
    }
  }
}
</script>