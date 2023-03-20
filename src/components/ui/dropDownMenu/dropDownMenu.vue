<template>

  <div :class="'dropdown'" @click="showDropdown = !showDropdown" v-click-outside="closeDropDown">
    <a class="mdl-navigation__link"><slot name="title"></slot></a>
    <div id="myDropdown" :class="['dropdown_content', {'show': showDropdown}]">
      <slot name="links"></slot>
    </div>
  </div>
</template>

<script>
  import vClickOutside from 'click-outside-vue3'
  export default {
    name: "dropDownMenu",
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
      }
    },
  }
</script>

<style lang="scss" src="./dropDownMenu.scss">

</style>
