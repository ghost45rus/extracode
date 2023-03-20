<template>
  <ModalWindow v-model="modalOpened" id="modal" :modalWidth="'1300px'"  :customIdForButtonClose="'closeModalCreateAutotest'">
    <template v-slot:header>
      <div class="mdl-card__title-text" style="display: flex; flex-direction: column;margin-right: auto; width: 950px; white-space: nowrap">
          <span>
            {{ title }}
          </span>
        <slot name="TextField">
          <Textfield class="special_titile" :label="'Наименование сценария'" :readonly="mode === 'edit'" v-model="autoTestName" floatingLabel style="width: 450px !important; margin-left: 5px;">
          </Textfield>
        </slot>
      </div>
    </template>
    <template v-slot:modalBody>
      <card>
        <template v-slot:title-text>
          Команды
        </template>
        <template v-slot:card-title-button>
          <button @click="addCommand" id="append" class="mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-button--colored button">
            Добавить
          </button>
        </template>
        <template v-slot:card-body>
          <TableAppendCommand style="margin: 10px"
                              :headers="autoTestCreate"
                              :loading="false"
                              :rows="script ? script.commands : commands"
                              @deleteRow="deleteRow"
                              @changeSorting="changeSorting"
          >
          </TableAppendCommand>
          <div style="display: flex; gap: 10px; justify-content: flex-end; margin: 10px 10px 10px 0">
            <slot name="button_save" :save="save">
              <button :class="{'block_button': this.autoTestName === ''}" id="save" @click="save()" class="mdl-button mdl-js-button mdl-button--raised button">
                Сохранить
              </button>
            </slot>
            <button id="close" @click="close" class="mdl-button mdl-js-button mdl-button--raised button">
              Отменить
            </button>
          </div>
        </template>
      </card>
    </template>
  </ModalWindow>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "autoTestModal",
  data(){
    return {
      autoTestName: this.script && this.script.autoTestName ? this.script.autoTestName : '',
      modalOpened: this.opened,
    }
  },
  watch:{
    opened(newValue){
      this.modalOpened = newValue
    },
    modalOpened(newValue){
      if (newValue === false){
        this.close()
      }
    },
  },

  beforeUpdate() {
    this.autoTestName = this.script && this.script.autoTestName ? this.script.autoTestName : this.autoTestName ? this.autoTestName : ''
  },

  computed:{
    ...mapGetters({ autoTestCreate: 'headers/autoTestCreate' }),
  },
  methods:{
    changeSorting(newSortedArray){
      this.$emit('changeSorting', this.indexingRows(newSortedArray))
    },
    addCommand(){
      let array = this.script ? this.script.commands : this.commands
      array.push({
        index: array.length + 1,
        value: {}
      })
      this.changeSorting(array)
    },
    save(){
      if (this.mode === 'create'){
        this.$emit('save', this.autoTestName)
        this.autoTestName = ''
      }
      if (this.mode === 'edit'){
        this.$emit('save')
      }
    },
    deleteRow(index){
      let array = this.script ? this.script.commands.filter(element => element.index !== index) : this.commands.filter(element => element.index !== index)
      this.changeSorting(array)
    },
    close(){
      this.$emit('close')
    },
    indexingRows(array){
      return array.map((element, index) => {
        return { index: index + 1, value: element.value }
      })
    }
  },
  props:{
    script: {
      type: Object,
      required: false,
      default: () => {}
    },
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    opened: {
      default: false,
      required: true,
      type: Boolean
    },
    commands: {
      default: () => [],
      required: false,
      type: Array
    },
    title: {
      default: '',
      required: true,
      type: String
    },
  }
}
</script>

<style lang="scss">
.special_titile label{
   color: rgba(0,0,0,.5) !important;
 }
.block_button{
  opacity: 0.5 !important;
}
</style>
