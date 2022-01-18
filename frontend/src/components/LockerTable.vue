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
    <b-table-column field="id" label="ID" width="40" :td-attrs="columnTdAttrs" numeric v-slot="props">
      {{props.row.id}}
    </b-table-column>
    <b-table-column field="locker_number" label="Locker Number"  :td-attrs="columnTdAttrs" numeric v-slot="props">
      {{props.row.locker_number}}
    </b-table-column>
    <b-table-column field="patron_name" label="Patron Name" :td-attrs="columnTdAttrs" searchable v-slot="props">
      {{props.row.patron_name}}
    </b-table-column>
    <b-table-column field="building" label="Building" :td-attrs="columnTdAttrs" v-slot="props">
      {{props.row.building}}
    </b-table-column>
    <b-table-column field="floor" label="Floor" :td-attrs="columnTdAttrs" numeric v-slot="props">
      {{props.row.floor}}
    </b-table-column>
    <b-table-column field="locker_group" label="Locker Group" :td-attrs="columnTdAttrs" v-slot="props">
      {{props.row.locker_group}}
    </b-table-column>
    <b-table-column :td-attrs="columnTdAttrs">
      <b-button type="is-success" @click="isEditModalActive = true">Edit</b-button>
    </b-table-column>
  </b-table>
  <b-modal v-model="isEditModalActive" :width="500">
    <div class="card">
      <div class="card-content">
        <div class="content">
          TEST
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
      isEditModalActive: false
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