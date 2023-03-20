<template>
  <header class="mdl-layout__header" v-if="isLoggedIn">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">Ex Mark</span>
      <router-link class="mdl-layout-title" :class="'mdl_layout_сhapter'" to="/"><span>Главная</span></router-link>
      <div class="mdl-layout-spacer"></div>
      <nav class="mdl-navigation mdl-layout--large-screen-only">
        <div :class="'mdlNavigtaionPersonalAccount'">
          <span :class="['material-icons', 'mdlNavigtaionPersonalAccount__icon']">
            account_circle
          </span>
          <span class="mdl-navigtaion-personal_account__data">{{FIO}}</span>
          <div class="bar">
            <context-Menu-Button>
              <template v-slot:menu_item>
                <li @click="logout">Выход</li>
              </template>
            </context-Menu-Button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "navbar",
        data(){
          return{
          }
        },
        computed : {
          ...mapGetters('auth', { isLoggedIn: 'isLoggedIn' }),
          ...mapGetters('auth', { FIO: 'userName' })
        },
        methods: {
          logout(){
            this.$store.dispatch('auth/logout');
            this.$router.push('/login')
          }
        },
    }
</script>

<style lang="scss" src="./Navbar.scss">
</style>
