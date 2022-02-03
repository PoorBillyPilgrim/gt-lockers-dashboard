<template>
  <div>
    <h1 class="title has-text-centered">
      {{ title }}
    </h1>

    <div v-if="isLoading">
      <b-loading
        v-model="isLoading"
        :is-full-page="true"
      />
    </div>
    <div v-else>
      <div class="columns box">
        <section class="column is-3">
          <h2 class="title is-4">
            Specify Locker Type
          </h2>
          <b-field
            v-for="(filter,key,filterIndex) in findAvailableLocker"
            :key="filterIndex"
            :label="key.replace('_', ' ')"
          >
            <b-select
              :placeholder="`Select a ${key.replace('_', ' ')}`"
              expanded
              @input.native="setLockerOptions(key, $event)"
            >
              <option
                v-for="(option,optionKey) in filter"
                :key="optionKey"
                :value="option"
              >
                {{ option }}
              </option>
            </b-select>
          </b-field>
          <b-button @click="submit">
            Submit
          </b-button>
        </section>
        <div class="column is-1" />
        <section class="column">
          <h2 class="title is-4">
            Locker
          </h2>
          <LockerTable 
            :lockers="availableLocker"
            :is-loading="isLoading"
            :schema="schema"
            :group="currentGroup"
            :is-paginated="false"
            :is-hoverable="true"
            :can-search-patron="false"
            :empty-message="availableLockerMessage"
          />
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import LockerTable from '@/components/LockerTable.vue'
export default {
  name: 'LockersAssign',
  components: {
    LockerTable
  },
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
      currentGroup: '',
      availableRoute: '/lockers/available',
      query: '',
      filteredLockerSize: '',
      filteredLockerGroup: '',
      isLockerAvailable: false,
      availableLocker: [],
      availableLockerMessage: 'Please select a locker group.'
    }
  },
  computed: {
    findAvailableLocker: function() {
      this.filterLockerOptions()
      return {
        locker_group: this.filteredLockerGroup,
        locker_size: this.filteredLockerSize
      }
    }
  },
  methods: {
    async submit() {
      try {
        this.query = `?locker_group=${this.options.locker_group}`
        if (this.options.locker_size !== 'any') this.query += `&locker_size=${this.options.locker_size}`
        this.currentGroup = this.options.locker_group
        const {data} = await axios.get(this.availableLockerQuery())
        if (data.length === 0) {
          if (this.options.locker_size === '' || this.options.locker_size === 'any') {
            this.availableLockerMessage = `Sorry, no ${this.currentGroup} locker is currently available.`
          } else {
            this.availableLockerMessage = `Sorry, no ${this.options.locker_size}-sized ${this.currentGroup} locker is currently available.`
          }
        }
        this.availableLocker = data
        this.isLockerAvailable = true
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
  .box {
    padding: 2rem;
  }
</style>