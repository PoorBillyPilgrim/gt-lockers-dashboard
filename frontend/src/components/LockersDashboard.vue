<template>
  <div>
    <h1 class="title">
      {{ title }}
    </h1>
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
  </div>
</template>
<script>
import LockerTable from '@/components/LockerTable.vue'
export default {
  name: 'LockersDashboard',
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
    }
  },
  data() {
    return {
      tabs: [
        {group: 'All'},
        {group: 'General'},
        {group: 'Graduate'},
        {group: 'Faculty'}
      ],
    }
  }
}
</script>