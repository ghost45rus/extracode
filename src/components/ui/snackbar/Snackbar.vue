<template>
    <div class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>
</template>

<script>
export default {
  name: 'Snackbar',
  props: {
    timeout:{
      type: Number,
      required: false,
      default: 2000
    },
    message: {
      type: String,
      required: true
    },
  },
  updated () {
    if (this.message !== ''){
      let data = {
        message: this.message,
        timeout: this.timeout
      };
      componentHandler.upgradeElement(this.$el, 'MaterialSnackbar')
      this.$el.MaterialSnackbar.showSnackbar(data)
      this.$store.dispatch('setMessage', '')
    }
  }
}
</script>
