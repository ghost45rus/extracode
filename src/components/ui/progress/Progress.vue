<template>
  <div class="mdl-progress mdl-js-progress"
       :class="{ 'mdl-progress__indeterminate': indeterminate }"
       :id="id"
  >
  </div>
</template>

<script>
  export default {
    name: 'Progress',
    props: {
      id: {
        type: String,
        default: ''
      },
     indeterminate: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      componentHandler.upgradeElement(this.$el, 'MaterialProgress')
    }
  }
</script>
