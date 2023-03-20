<template>
  <div
    class="root mdl-textfield mdl-js-textfield"
    :class="{'mdl-textfield--floating-label': floatingLabel, 'is-dirty': isDirty}"
  >
    <textarea
      class="mdl-textfield__input"
      :id="id"
      :readonly="readonly"
      @input="fireInputEvent"
      :value="changedValue"
      :style="{cursor: cursor}"
      :rows="rows"
    />
    <label class="mdl-textfield__label" :for="id">{{label}}</label>
  </div>
</template>

<script>
  export default {
    name: 'TextfieldArea',
    props: {
      changedValue:{
        type: String,
        required: true,
        default: '',
      },
      id: {
        type: String,
        default: ''
      },
      modelValue: {
        type: String,
        default: ''
      },
      rows:{
        type: Number,
        default: 5,
        required: false
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
      cursor:{
        type: String,
        default: 'auto',
        required: false
      }
    },
    emits: ['update:modelValue', 'update:changedValue'],
    computed: {
      isDirty () {
        return this.modelValue ? true : false
      }
    },

    methods: {
      fireInputEvent (event) {
        this.$emit('update:changedValue', event.target.value)
      },
    },
    mounted () {
      componentHandler.upgradeElement(this.$el)
    }
  }
</script>

<style lang="scss" src="./TextField.scss" scoped></style>
