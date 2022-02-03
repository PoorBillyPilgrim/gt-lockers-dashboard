<template>
  <form
    class="modal-card"
    @submit.prevent="save"
  >
    <div v-if="isLoading">
      <b-loading v-model="isLoading" />
    </div>
    <header
      v-else
      class="modal-card-head"
    >
      <p class="modal-card-title">
        Locker #{{ currentLocker.locker_number }}, {{ currentLocker.building }}
      </p>
    </header>
    <section class="modal-card-body">
      <b-field label="Patron Name">
        <b-input v-model="updatedLocker.patron_name" />
      </b-field>
      <b-field label="Current Code">
        <b-input
          v-model="updatedLocker.current_code"
          type="number"
          min="0"
          max="9999"
        />
      </b-field>
      <b-field label="Status">
        <b-select
          v-model="updatedLocker.locker_status"
          :placeholder="currentLocker.locker_status"
        >
          <option 
            v-for="(status,index) in schema.locker_status" 
            :key="index"
            :value="status"
          >
            {{ status }}
          </option>
        </b-select>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <b-button
        type="is-success"
        native-type="submit"
      >
        Save
      </b-button>
      <b-button
        type="is-danger"
        @click="$emit('close')"
      >
        Cancel
      </b-button>
    </footer>
  </form>
</template>
<script>
import axios from 'axios'
export default {
  name: 'LockerEditModal',
  props: {
    currentLocker: {
      type: Object,
      default: () => {}
    },
    isLoading: {
      type: Boolean
    },
    schema: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      statusOptions: ['available', 'checked_out', 'disabled', 'needs_repair']
    }
  },
  computed: {
    updatedLocker: function() {
      return {
        id: this.currentLocker.id,
        patron_name: this.currentLocker.patron_name,
        current_code: this.currentLocker.current_code,
        locker_status: this.currentLocker.locker_status
      }
    }
  },
  methods: {
    async save() {
      const options = {
        url: 'http://localhost:4000/lockers/locker',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(this.updatedLocker)
      }

      const response = await axios(options)
      console.log(response)
      this.$parent.close()
      this.$buefy.notification.open({
        message: 'Locker info has been saved',
        type: 'is-success',
        position: 'is-top',
        hasIcon: true,
        indefinite: true
      })
      this.$root.$emit('update')
    }
  }
}
</script>