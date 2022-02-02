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
        <b-input v-model="currentLocker.patron_name" />
      </b-field>
      <b-field label="Current Code">
        <b-input
          v-model="currentLocker.current_code"
          type="number"
          min="1000"
          max="9999"
        />
      </b-field>
      <b-field label="Status">
        <b-select
          v-model="currentLocker.locker_status"
          :placeholder="currentLocker.locker_status"
        >
          <option 
            v-for="(status,index) in statusOptions" 
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
    }
  },
  data() {
    return {
      statusOptions: ['available', 'checked_out', 'disabled', 'needs_repair']
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
        data: JSON.stringify(this.currentLocker)
      }

      const response = await axios(options)
      console.log(response)
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