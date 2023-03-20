<template>
  <div class="mdl_table_footer_item" v-if="rows.length">
    <div class="dropdown_a" @click="showDropdown = !showDropdown">
      <button class="dropdown_a_button">Отображать по {{ selectedSize }}</button>
      <div id="myDropdown" :class="['dropdown_a_content', {'show': showDropdown}]">
        <div class="dropdown_a_content_item"
             v-for="size, sizeIndex in sizeValues"
             :key="sizeIndex"
             @click="changeSize(size)"
        >
          Отображать по {{ size }}
        </div>
      </div>
    </div>
  </div>
  <div class="mdl_table_footer_item" v-if="rows.length">
    {{ pageNumber }} из {{ pageCount }}
  </div>
  <div class="mdl_table_paggination mdl_table_footer_item">
    <div class="mdl_table_paggination_cell" @click="prevPage" v-if="pageNumber > 1">
      <i class="material-icons">chevron_left</i>
    </div>
    <div :class="['mdl_table_paggination_cell', {'mdl_table_paggination_cell_active': page + 1 === pageNumber}]"
          v-for="page, indexPage in pageBlocks"
          :key="indexPage"
          @click="selectPage(page + 1)">
      {{ page + 1 }}
    </div>
    <div class="mdl_table_paggination_cell" @click="nextPage" v-if="pageNumber < pageCount">
      <i class="material-icons">chevron_right</i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    data() {
      return {
        sizeValues:[250, 100, 50, 25, 10, 5],
        pageNumber: 1,
        pageBlocksStartPosition: 0,
        showDropdown: false,
        selectedSize: this.size
      }
    },
    watch: {
      rows() {
        this.pageNumber = 1
        this.pageBlocksStartPosition = 0
        this.onChange()
      },
      pageNumber(newValue, oldValue) {
        if (newValue > this.pageBlocksStartPosition + this.blocksPerPage) {
          this.pageBlocksStartPosition = newValue - 1
        }
        if((oldValue - 1) % this.blocksPerPage == 0 && newValue < oldValue) {
          this.pageBlocksStartPosition = oldValue - 1 - this.blocksPerPage
        }
      },
    },
    computed: {
      pageBlocksEndPosition() {
        return this.pageBlocksStartPosition + this.blocksPerPage
      },
      pageBlocks() {
        return [...Array(this.pageCount).keys()].slice(this.pageBlocksStartPosition, this.pageBlocksEndPosition)
      },
      startPaginated() {
        return (this.pageNumber - 1) * this.selectedSize
      },
      endPaginated() {
        if (this.startPaginated + this.selectedSize < this.rows.length){
          return this.startPaginated + this.selectedSize
        }
        return this.rows.length
      },
      pageCount() {
        return Math.ceil(this.rows.length/this.selectedSize)
      },
      page() {
        return (this.startPaginated + this.selectedSize)/this.selectedSize
      },
    },
    methods: {
      changePaginatedData(){
        this.$emit('update:modelValue', this.rows.slice(this.startPaginated, this.endPaginated))
      },
      selectPage(index) {
        this.pageNumber = index
        this.onChange()
      },
      nextPage() {
        ++this.pageNumber
        this.onChange()
      },
      prevPage() {
        --this.pageNumber
        this.onChange()
      },
      changeSize(newSize) {
        this.pageBlocksStartPosition = 0
        this.pageNumber = 1
        this.selectedSize = newSize
        this.onChange()
      },
      onChange() {
        this.$emit('paginate',  {
          size: this.selectedSize,
        })
        this.changePaginatedData()
        this.$store.commit('pagination/pagination', {
          start: this.startPaginated,
          end: this.endPaginated,
          size: this.selectedSize,
          doctype: this.$route.name
        })
      },
    },
    mounted() {
      if (this.rows.length){
        this.onChange()
      }
      this.pageBlocksStartPosition = Math.floor((this.pageNumber - 1) / this.blocksPerPage) * this.blocksPerPage
    },
    props:{
      rows: {
        type: Array,
        required: true,
        default: []
      },
      modelValue: Array,
      blocksPerPage: {
        type: Number,
        required: false,
        default: 5
      },
      size: {
        type: Number,
        required: false,
        default: 5
      },
    },
    emits: ['paginate', 'update:modelValue', 'loading']
  }
</script>

<style lang="scss" src="./Pagination.scss" scoped></style>
