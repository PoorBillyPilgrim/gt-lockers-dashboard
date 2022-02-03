<template>
  <div>
    <h1 class="title has-text-centered">
      {{ title }}
    </h1>
      <div v-if="isLoading">
          <b-loading v-model="isLoading"/>
      </div>
      <div class="box" v-else>
        <b-field label="Status">
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
        </b-field>
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
  }
}
</script>