<template>
  <div>
    <b-table
        :data="filterLockers"
        :striped="true"
        :hoverable="true"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
      >
    <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
      {{props.row.id}}
    </b-table-column>
    <b-table-column field="locker_number" label="Locker Number"  numeric v-slot="props">
      {{props.row.locker_number}}
    </b-table-column>
    <b-table-column field="patron_name" label="Patron Name" searchable v-slot="props">
      {{props.row.patron_name}}
    </b-table-column>
    <b-table-column field="building" label="Building" v-slot="props">
      {{props.row.building}}
    </b-table-column>
    <b-table-column field="floor" label="Floor" numeric v-slot="props">
      {{props.row.floor}}
    </b-table-column>
    <b-table-column field="locker_group" label="Locker Group" v-slot="props">
      {{props.row.locker_group}}
    </b-table-column>
    <b-table-column v-slot="props">
      <b-button type="is-success" @click="edit(props.row.id)">Edit</b-button>
    </b-table-column>
  </b-table>
  <b-modal v-model="isEditModalActive" :locker="currentLocker" :width="500">
    <div class="card">
      <div class="card-content">
        <div class="content">
          {{currentLocker}}
        </div>
      </div>
    </div>
  </b-modal>
  </div>
</template>
<script>

export default {
  name: 'LockerTable',
  props: {
    lockers: {
      type: Array,
      default: () => []
    },
    group: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      isLoading: true,
      isPaginated: true,
      perPage: 20,
      currentPage: 1,
      currentLocker: null,
      isEditModalActive: false
    }
  },
  methods: {
    edit(id) {
      this.isEditModalActive = true
      this.currentLocker = this.lockers.find(locker => locker.id === id)
    }
  },
  computed: {
    filterLockers: function() {
      if (this.group !== 'All') {
        return this.lockers.filter(locker => locker.locker_group === this.group)
      }
      return this.lockers
    }
  }
}
</script>
<style lang="scss" scoped>
    
</style>