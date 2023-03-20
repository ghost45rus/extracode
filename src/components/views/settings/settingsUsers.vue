<template>
  <div class="grid_card">
    <gridLayout>
      <template v-slot:gridName>
        Пользователи
      </template>
      <template v-slot:grid>
        <tableCustom :selected="true" :headers="usersHeaders" :rows="users.rows" :loading="loading" :pagination="true"></tableCustom>
      </template>
    </gridLayout>
  </div>
</template>

<script>

  export default {
    name: "settingsUsers",
    data(){
      return{
        loading: false
      }
    },

    async mounted() {
      this.loading = true
      await this.$store.dispatch('settings/UsersSettings')
      this.loading = false
    },
    computed: {
      users(){
        return this.$store.getters["settings/getUserSettings"]
      },
      usersHeaders(){
        return this.$store.getters['headers/usersHeaders']
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
