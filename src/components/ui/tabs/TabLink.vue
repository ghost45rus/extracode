<template>
  <a class="mdl-tabs__tab"
     @click.prevent
     href="#"
  >{{tab.title}}
    <span ref="ripple"
          v-show="!noRippleEffect"
          class="mdl-tabs__ripple-container mdl-js-ripple-effect">
      <span class="mdl-ripple"></span>
    </span>
  </a>
</template>

<script>
  export default {
    name: 'TabLink',
    props: {
      tab: Object,
      noRippleEffect: {
        required: false
      }
    },
    mounted () {
      componentHandler.upgradeElement(this.$refs.ripple, 'MaterialRipple')
    },
  }
</script>
