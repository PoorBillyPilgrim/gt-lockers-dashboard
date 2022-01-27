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
            :label="format(key)"
            label-position="inside"
          >
            <b-select v-on:input.native="setLockerOptions(key, $event)" :placeholder="`Select a ${format(key)}`">
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
          <p>LockerGroup: {{options.locker_group}}</p>
        </div>
        <div class="column">
          LockerSize: {{options.locker_size}}
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
      }
    }
  },
  methods: {
    async submit() {
      try {
        let {data} = await axios.get('http://localhost:4000/lockers/available?locker_group=graduate&locker_size=fdsf')
        console.log(data)
      } catch (error) {
        console.error(error.response.data)
      }
    },
    setLockerOptions(key, event) {
      this.options[key] = event.target.value
    }
  },
  computed: {
    findAvailableLocker: function() {
      let filteredLockerSize = this.schema.locker_size.filter(size => size !== '')
      filteredLockerSize.splice(0, 0, 'any')
      return {
        locker_group: this.schema.locker_group.filter(group => group !== 'clp'),
        locker_size: filteredLockerSize
      }
    },
    format(key) {
      return key.replace('_', ' ')
    }
  }
}
</script>
<style scoped>

</style>