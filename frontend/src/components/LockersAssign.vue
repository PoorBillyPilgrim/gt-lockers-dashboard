<template>
  <div>
    <h1 class="title">
      {{ title }}
    </h1>

    <div v-if="isSchemaLoading">
      <b-loading v-model="isSchemaLoading" :is-full-page="true"></b-loading>
    </div>
    <div v-else>
      <b-field grouped>
        <b-select v-for="(filter,key,filterIndex) in findAvailableLocker" :key="filterIndex" :placeholder="`Select a ${key.replace('_', ' ')}`">
          <option v-for="(option,optionKey) in filter" :key="optionKey" :value="option">
            {{option}}
          </option>
        </b-select>
      </b-field>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LockersAssign',
  props: {
    title: {
      type: String,
      default: 'Lockers'
    },
    isSchemaLoading: {
      type: Boolean,
      default: true
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
  computed: {
    findAvailableLocker: function() {
      let filteredLockerSize = this.schema.locker_size.filter(size => size !== '')
      filteredLockerSize.splice(0, 0, 'any')
      return {
        locker_group: this.schema.locker_group.filter(group => group !== 'clp'),
        locker_size: filteredLockerSize
      }
    }
  }
}
</script>
<style scoped>

</style>