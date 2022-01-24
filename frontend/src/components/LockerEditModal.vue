<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Locker #{{ currentLocker.locker_number }}, {{ currentLocker.building }}
      </p>
    </header>
    <section class="modal-card-body">
      <b-field label="Patron Name">
        <b-input :value="currentLocker.patron_name" />
      </b-field>
      <b-field label="Current Code">
        <b-input
          :value="currentLocker.current_code"
          type="number"
          min="1000"
          max="9999"
        />
      </b-field>
      <b-field label="Status">
        <b-select :placeholder="currentLocker.locker_status">
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
        @click="save"
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
  </div>
</template>
<script>
export default {
  name: 'LockerEditModal',
  props: {
    currentLocker: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      statusOptions: ['available', 'checked_out', 'disabled', 'needs_repair']
    }
  },
  methods: {
    save() {
      this.$emit('close')
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