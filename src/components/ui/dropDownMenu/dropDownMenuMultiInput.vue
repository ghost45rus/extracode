<template>
  <div :class="'dropdown_input'" style="overflow: visible !important; width: 100%" v-click-outside="closeDropDown">
    <app-mdl-textfield :label="label" type="text" :id="id" floatingLabel readonly :modelValue="inputString" @click="showDropdown = !showDropdown"></app-mdl-textfield>
    <div id="myDropdown" :class="['dropdown_input_content', {'show': showDropdown}]">
      <slot name="links">
        <div>
          <input type="hidden" id="null label" v-model="values">
          <label for="null label" @click="clear">
            Нет значения
          </label>
        </div>
        <div class="checkbox" v-for="(value, index) in items" :key="index">
          <input :id="index" type="checkbox" :value="value.id" v-model="values" @change="select()">
          <label  :for="index">
            {{value.name}}
          </label>
        </div>
      </slot>
    </div>
  </div>
</template>


<script>
  import vClickOutside from 'click-outside-vue3'
  import AppMdlTextfield from "components/ui/textfield/Textfield"

  export default {
    name: "dropDownMenuMultiInput",
    directives: {
      clickOutside: vClickOutside.directive
    },
    data(){
      return{
        showDropdown: false,
        values: this.modelValue && this.modelValue.length ? this.modelValue : [],
        inputString: '',
      }
    },
    watch:{
      modelValue(){
        if (this.modelValue && this.modelValue.length !== 0){
          this.values = this.modelValue
        } else {
          this.values = []
        }
      }
    },
    beforeUpdate() {
      this.createInputString()
    },
    methods:{
      createInputString(){
        let str = ''
       if (this.values && this.values.length){
         this.values.forEach((item, index) => {
           let indexInItems = this.items.findIndex(idInItems => idInItems.id === item )
           if (indexInItems !== -1){
             if ((this.values.length > 1) || (this.values.length === 1)){
               str += this.items[indexInItems].name
             }
             if ((this.values[index + 1] && index+1 !== this.values.length))  {
               str+= ','
             }
           }
         })
       }
        this.inputString = str
      },
      clear(){
        this.values = []
        this.select()
      },
      closeDropDown(){
        this.showDropdown = false
      },
      select(){
        this.$emit('update:modelValue', JSON.parse(JSON.stringify(this.values)))
        this.createInputString()
      },
    },
    props:{
      modelValue: {
        type: Array,
        default: () => ([])
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

    emits: ['update:modelValue', 'clear'],
  }
</script>

<style lang="scss" src="./dropDownMenuMultiInput.scss">

</style>
