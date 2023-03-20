<template>
  <div
    class="root mdl-textfield mdl-js-textfield"
    :class="{'mdl-textfield--floating-label': floatingLabel, 'is-dirty': isDirty}"
  >
    <input
      class="mdl-textfield__input"
      :type="type"
      :id="id"
      :readonly="readonly"
      @input="fireInputEvent"
      :value="modelValue"
      :style="{cursor: cursor}"
    />
    <label class="mdl-textfield__label" :for="id">{{label}}</label>
  </div>
</template>

<script>
  export default {
    name: 'Textfield',
    props: {
      id: {
        type: String,
        default: ''
      },
      modelValue: {
        type: String,
        default: ''
      },
      label:{
        type: String,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      },
      floatingLabel:{
        type: Boolean,
        default: false
      },
      type:{
        type: String,
        default: 'text'
      },
      cursor:{
        type: String,
        default: 'auto',
        required: false
      }
    },
    emits: ['update:modelValue'],
    computed: {
      isDirty () {
        return this.modelValue ? true : false
      }
    },
    methods: {
      fireInputEvent (event) {
        this.$emit('update:modelValue', event.target.value)
      },
    },
    mounted () {
      componentHandler.upgradeElement(this.$el)
    }
  }
</script>

<style lang="scss" src="./TextField.scss" scoped></style>
