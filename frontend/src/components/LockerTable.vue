<template>
  <div>
    <b-table
      :data="filterLockers"
      :loading="isLoading"
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
        field="locker_size"
        label="Size"
        width="50"
        sortable
      >
        {{ props.row.locker_size }}
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
            <b-table-column
        v-slot="props"
        field="locker_status"
        label="Locker Status"
      >
        {{ props.row.locker_status }}
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

    <!--<LockerEditModal v-model="isEditModalActive" :currentLocker/>-->

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
          <b-field label="Patron Name">
            <b-input :value="currentLocker.patron_name"></b-input>
          </b-field>
          <b-field label="Current Code">
            <b-input :value="currentLocker.current_code" type="number" min="1000" max="9999"></b-input>
          </b-field>
          <b-field label="Status">
            <b-input :value="currentLocker.locker_status" type="textarea"></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button type="is-success" @click="save">
            Save
          </b-button>
          <b-button type="is-danger" @click="isEditModalActive = false">
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
    },
    isLoading: {
      type: Boolean
    }
  },
  data() {
    return {
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
    },
    save() {
      this.isEditModalActive = false
      this.$buefy.notification.open({
        message: 'Locker info has been saved',
        type: 'is-success',
        position: 'is-top',
        hasIcon: true,
        indefinite: true
      })
      this.$root.$emit('locker-info-save')
    }
  }
}
</script>
<style lang="scss" scoped>
    
</style>