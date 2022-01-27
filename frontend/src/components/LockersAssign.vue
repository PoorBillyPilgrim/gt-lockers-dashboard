<template>
  <div>
    <h1 class="title">
      {{ title }}
    </h1>

    <div v-if="isLoading">
      <b-loading
        v-model="isLoading"
        :is-full-page="true"
      />
    </div>
    <div v-else>
      <div class="columns">
        <section class="column is-3 box">
          <h2>Select Locker Criteria</h2>
          <b-field
            v-for="(filter,key,filterIndex) in findAvailableLocker"
            :key="filterIndex"
            :label="key.replace('_', ' ')"
            label-position="inside"
          >
            <b-select v-on:input.native="setLockerOptions(key, $event)" :placeholder="`Select a ${key.replace('_', ' ')}`">
              <option
                v-for="(option,optionKey) in filter"
                :key="optionKey"
                :value="option"
              >
                {{ option }}
              </option>
            </b-select>
          </b-field>
          <b-button @click="submit">Submit</b-button>
        </section>
        <div class="column">
          <p>{{availableLockerMessage}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'LockersAssign',
  props: {
    title: {
      type: String,
      default: 'Lockers'
    },
    isLoading: {
      type: Boolean
    },
    api: {
      type: String,
      default: 'http://localhost:4000/'
    },
    lockers: {
      type: Array,
      default: () => []
    },
    schema: {
      type: Object,
      default: () => {
        return {
          "locker_number": "",
          "locker_size": [
            "",
            "cubby",
            "mid",
            "full"
          ],
          "locker_group": [
            "general",
            "graduate",
            "faculty",
            "clp"
          ],
          "building": [
            "crosland",
            "price_gilbert",
            "clough"
          ],
          "floor": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "patron_name": "",
          "previous_code": "",
          "current_code": "",
          "locker_status": [
            "available",
            "unavailable",
            "checked_out",
            "disabled",
            "needs_repair"
          ]
        }
      }
    }
  },
  data() {
    return {
      options: {
        locker_group: '',
        locker_size: ''
      },
      availableRoute: '/lockers/available',
      query: '',
      filteredLockerSize: '',
      filteredLockerGroup: '',
      isLockerAvailable: false,
      availableLocker: []
    }
  },
  computed: {
    findAvailableLocker: function() {
      this.filterLockerOptions()
      return {
        locker_group: this.filteredLockerGroup,
        locker_size: this.filteredLockerSize
      }
    },
    availableLockerMessage: function() {
      return (this.availableLocker.length < 1) ? 'No locker available fitting that description' : this.availableLocker
    }
  },
  methods: {
    async submit() {
      try {
        this.isLoading = true
        this.query = `?locker_group=${this.options.locker_group}`
        const {data} = await axios.get(this.availableLockerQuery())
        this.availableLocker = data
        this.isLockerAvailable = true
        this.isLoading = false
      } catch (error) {
        console.error(error.response.data)
      }
    },
    availableLockerQuery() {
      return this.api + this.availableRoute + this.query
    },
    setLockerOptions(key, event) {
      
      this.options[key] = event.target.value
    },
    filterLockerOptions() {
      this.filteredLockerSize = this.schema.locker_size.filter(size => size !== '')
      this.filteredLockerSize.splice(0, 0, 'any')
      this.filteredLockerGroup = this.schema.locker_group.filter(group => group !== 'clp')
    }
  }
}
</script>
<style scoped>

</style>