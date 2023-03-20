<template>
  <div id="openModal" class="modal" :class="{'modalShow': modelValue}" ref="modal" @click="closeModal">
    <input type="checkbox" :value="modelValue">
    <div class="modal-dialog">
      <div class="modal-content" :style="{width: modalWidth}">
        <div class="modal-header">
          <slot name="header">
          </slot>
          <div>
            <span @click="close" :id="customIdForButtonClose" class="close">×</span>
            <Tooltips class="custom-tooltips" top  :target="customIdForButtonClose">Закрыть</Tooltips>
          </div>
        </div>
        <div class="modal-body">
          <slot name="modalBody">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ModalWindow",
  watch:{
    modelValue(newValue){
      if (newValue === false){
        this.$emit('update:modelValue', false)
      }
    }
  },
  methods: {
    close(){
      this.$emit('update:modelValue', false)
    },
    closeModal(e) {
      this.event = function(e) {
        if (e.target.classList.contains('modalShow')) {
          this.$emit('update:modelValue', false)
          document.body.removeEventListener("click", this.event);
        }
      }.bind(this);
      document.body.addEventListener("click", this.event);
    },
  },
  emits: ['update:modelValue'],


  props:{
    modelValue:{
      type: Boolean,
      required: false,
      default: false
    },
    modalWidth: {
      type: String,
      required: false
    },
    customIdForButtonClose: {
      type: String,
      required: false,
      default: 'closeButton'
    }
  },
}
</script>

<style lang="scss" src="./ModalWindow.scss" scoped>

</style>
