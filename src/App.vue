<template>
  <div id="app" class="mdl-layout mdl-js-layout">
    <navbar></navbar>
    <navbar-Aside></navbar-Aside>
      <main class="mdl-layout__content">
          <router-view>
          </router-view>
      </main>
    <snackbar :message="message"></snackbar>
  </div>
</template>

<script>

import './assets/js/material'
import navbar from './components/views/navbar/Navbar'
import navbarAside from './components/views/navbar/NavbarAside'
import snackbar from '@/components/ui/snackbar/Snackbar'

export default {
  name: 'app',
  data () {
    return {}
  },

  computed: {
    message () {
      return this.$store.getters.message
    },
    user () {
      return this.$store.getters['auth/user']
    }
  },
  beforeMount () {
    this.$store.dispatch('filters/loadFiltersFromLocalStorage')
  },
  components: {
    navbar,
    navbarAside,
    snackbar
  }
}
</script>

<style lang="scss">
  ::-webkit-scrollbar{
    /*width: 5px;*/
  }
  .fade-enter-from
  .fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active
  .fade-leave-to{
    transition: opacity 0.5s ease-out;
  }
  .mdl-layout {
    background-color: rgb(250 250 250);
  }
</style>
