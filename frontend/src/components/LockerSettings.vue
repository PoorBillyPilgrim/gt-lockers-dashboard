<template>
  <div>
    <h1 class="title has-text-centered">
      {{ title }}
    </h1>
    <div v-if="isLoading">
      <b-loading v-model="isLoading" />
    </div>
    <div
      v-else
      class="box"
    >
    <div class="columns is-justify-content-space-between">
      <div class="column">
        <h2 class="title">
          Locker Status
        </h2>
        <h3 class="subtitle">
          Add or remove different status options
        </h3>
      </div>
      <div class="column is-flex-grow-0">
        <b-button>Add</b-button>
      </div>
    </div>

      <b-table
        :data="lockerStatuses"
      >
        <b-table-column
          v-slot="props"
          field="locker_status"
          label="Locker Status"
        >
        {{props.row.locker_status}}
        </b-table-column>
        <b-table-column>
          <b-button type="is-primary">Edit</b-button>
        </b-table-column>
        <b-table-column>
          <b-button type="is-danger">Delete</b-button>
        </b-table-column>
      </b-table>
      <!--<b-field label="Status">
            <b-select
            v-model="schema.locker_status"
            :placeholder="schema.locker_status"
            >
            <option 
                v-for="(status,index) in schema.locker_status" 
                :key="index"
                :value="status"
            >
                {{ status }}
            </option>
            </b-select>
        </b-field>-->
    </div>
  </div>
</template>
<script>
export default {
  name: 'LockerSettings',
  props: {
    title: {
      type: String,
      default: 'Lockers'
    },
    schema: {
      type: Object,
      default: () => {}
    },
    isLoading: {
      type: Boolean
    }
  },
  data() {
    return {
      columns: [
        {
          field: 'locker_status',
          label: 'Locker Status'
        }
      ]
    }
  },
  computed: {
    lockerStatuses: function() {
      const arr = []
      this.schema.locker_status.forEach(status => {
        arr.push({
          "locker_status": status
        })
      })
      return arr
    }
  }
}
</script>