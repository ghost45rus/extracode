<template>
    <div
      :class="['root', {'root_opened': opened}]"
      ref="root"
    >
        <button
            :class="'button'"
            type="button"
            tabindex="-1"
            @click="open"
        >
          <div :class="'dotts'" :style="{background: colorDotts}">

          </div>
        </button>

      <ul
        :class="'menu'"
        :style="{color: colorLinks}"
      >
        <slot name="menu_item" :close="close" @click="opened = false"></slot>
      </ul>
    </div>

</template>

<script>
export default {
    name: 'ContextMenuButton',
    props: {
        colorDotts:{
          type: String,
          default: 'white'
        },
        colorLinks:{
          type: String,
          default: 'black'
        }
    },
    data(){
        return {
            opened: false,
        }
    },
    methods: {
        close(){
          this.opened = false
        },
        open(){
            this.opened = true;
        },
        clickOutside(e){
            if (!this.$el.contains(e.target)) {
                this.opened = false;
            }
        },
        onClickWrapper(func){
            if(func) func();
            this.opened = false;
        },
    },
    created(){
        document.addEventListener('click', this.clickOutside)
    },
    beforeUnmount(){
      () => document.removeEventListener('click', this.clickOutside)
    },
}
</script>


<style lang="scss" src="./ContextMenuButton.scss">
</style>
