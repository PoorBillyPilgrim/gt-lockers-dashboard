<template>
    <b-table :data="data" :columns="columns"></b-table>
</template>
<script>
export default {
    name: 'Lockers',
    data() {
        return {
            data: [
                {'id': 1, 'patron': 'Tyler', 'locker_number': 1234},
                {'id': 2, 'patron': 'Sarah', 'locker_number': 5678}
            ],
            columns: [
                {
                    field: 'id',
                    label: 'ID',
                    numeric: true
                },
                {
                    field: 'patron',
                    label: 'Patron'
                },
                                {
                    field: 'locker_number',
                    label: 'Locker Number',
                    numeric: true
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>