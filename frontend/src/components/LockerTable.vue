<template>
  <div>
    <b-table
      :data="filterLockers"
      :loading="isLoading"
      :hoverable="isHoverable"
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
      >
        {{ props.row.locker_size }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="current_code"
        label="Code"
        numeric
      >
        {{ props.row.current_code }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="patron_name"
        label="Patron Name"
        :searchable="canSearchPatron"
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
        searchable
      >
        {{ props.row.floor }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="locker_group"
        label="Group"
      >
        {{ props.row.locker_group }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="locker_status"
        label="Status"
        sortable
      >
        <span 
          class="tag" 
          :class="statusType(props.row.locker_status)"
        >
          {{ props.row.locker_status }}
        </span>
      </b-table-column>
      <b-table-column v-slot="props">
        <b-button
          type="is-primary"
          size="is-small"
          @click="edit(props.row.id)"
        >
          Edit
        </b-button>
      </b-table-column>

      <template #empty>
        <b-message
          type="is-info"
          has-icon
          size="is-medium"
        >
          {{ emptyMessage }}
        </b-message>
      </template>
    </b-table>
    
    <b-modal
      v-model="isEditModalActive"
      has-modal-card
    >
      <template #default="props">
        <locker-edit-modal
          :current-locker="currentLocker"
          :schema="schema"
          :is-loading="isLoading"
          @close="props.close"
        />
      </template>
    </b-modal>
  </div>
</template>
<script>
import LockerEditModal from '@/components/LockerEditModal.vue'
export default {
  name: 'LockerTable',
  components: {
    LockerEditModal
  },
  props: {
    lockers: {
      type: Array,
      default: () => []
    },
    schema: {
      type: Object,
      default: () => {}
    },
    group: {
      type: String,
      default: 'all'
    },
    isLoading: {
      type: Boolean
    },
    isPaginated: {
      type: Boolean
    },
    isHoverable: {
      type: Boolean
    },
    canSearchPatron: {
      type: Boolean
    },
    emptyMessage: {
      type: String,
      default: 'Sorry, no locker data currently available.'
    }
  },
  data() {
    return {
      perPage: 10,
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
      this.currentLocker = this.lockers.find(locker => locker.id === id)
      this.isEditModalActive = true
    },
    statusType(status) {
      if (status === 'available') return 'is-success'
      return 'is-danger'
    }
  }
}
</script>
<style lang="scss" scoped>
</style>