<template>
  <div :class="'dropdown_input'" style="overflow: visible !important; width: 100%" v-click-outside="closeDropDown">
    <app-mdl-textfield :label="label" type="text" :id="id" floatingLabel readonly v-model="modelValue.name" @click="showDropdown = !showDropdown"></app-mdl-textfield>
    <div id="myDropdown" :class="['dropdown_input_content', {'show': showDropdown}]">
      <slot name="links"></slot>
      <div @click="select({id: null, name:'Нет значения'})">Нет значения</div>
      <div @click="select(value)" v-for="(value, index) in items" :key="index">{{value.name}}</div>

    </div>
  </div>
</template>

<script>
  import vClickOutside from 'click-outside-vue3'
  import AppMdlTextfield from "components/ui/textfield/Textfield"

  export default {
    name: "dropDownMenuInput",
    directives: {
      clickOutside: vClickOutside.directive
    },
    data(){
      return{
        showDropdown: false
      }
    },
    methods:{
      closeDropDown(){
        this.showDropdown = false
      },
      select(value){
        this.$emit('update:modelValue', {...value})
        this.showDropdown = false
      },
    },
    props:{
      modelValue: {
        type: Object,
        default: () => ({})
      },
      items: {
        type: Array,
        default: () => ([])
      },
      id: {
        type: String,
        default: 'sample'
      },
      label: {
        type: String,
        default: ''
      }
    },

    components: {
      AppMdlTextfield
    },

    emits: ['update:modelValue'],
  }
</script>

<style lang="scss" src="./dropDownMenu.scss">

</style>
