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
      <b-table-column
        v-slot="props"
        field="id"
        label="ID"
        width="40"
        numeric
      >
        {{ props.row.id }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="locker_number"
        label="Locker Number"
        numeric
      >
        {{ props.row.locker_number }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="current_code"
        label="Current Code"
        numeric
      >
        {{ props.row.current_code }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="patron_name"
        label="Patron Name"
        searchable
      >
        {{ props.row.patron_name }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="building"
        label="Building"
      >
        {{ props.row.building }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="floor"
        label="Floor"
        numeric
      >
        {{ props.row.floor }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="locker_group"
        label="Locker Group"
      >
        {{ props.row.locker_group }}
      </b-table-column>
      <b-table-column v-slot="props">
        <b-button
          type="is-success"
          @click="edit(props.row.id)"
        >
          Edit
        </b-button>
      </b-table-column>
    </b-table>
    <b-modal
      v-model="isEditModalActive"
      has-modal-card
      :locker="currentLocker"
    >
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Locker #{{ currentLocker.locker_number }}, {{ currentLocker.building }}
          </p>
        </header>
        <section class="modal-card-body">
          <p>Patron: {{ currentLocker.patron_name }}</p>
          <p>Code: {{ currentLocker.current_code }}</p>
        </section>
        <footer class="modal-card-foot">
          <b-button type="is-success">
            Save
          </b-button>
          <b-button type="is-danger">
            Cancel
          </b-button>
        </footer>
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
      currentLocker: {},
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
  },
  methods: {
    edit(id) {
      this.isEditModalActive = true
      this.currentLocker = this.lockers.find(locker => locker.id === id)
    }
  }
}
</script>
<style lang="scss" scoped>
    
</style>