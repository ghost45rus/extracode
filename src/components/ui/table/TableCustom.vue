<template>
  <div>
    <div class="resp mdl-shadow--2dp" :class="{'fixedHead': fixedHead}" style="overflow-x: auto">
      <table class="resp-tab">
        <thead>
          <tr class="resp-tab_tr resp-tab_tr_no_pointer">
            <slot name="headers">
              <th class="resp-tab_cell" v-for="(header, index) in headers" :key="index">
                <div class="resp-tab_cell_header_content">
                  <div class="resp-tab_cell_header_content_text">{{header.value}}</div>
                </div>
              </th>
            </slot>
          </tr>
        </thead>
        <slot name="tbody" :paginatedData="paginatedData" :align="align" :findColumnByIndex="findColumnByIndex">
          <tbody>
          <tr v-if="updatedDate">
            <slot name="notFoundRow">
              <td :colspan="headers.length + 1" style="padding: 10px; font-size: 20px;">
                Документы не найдены
              </td>
            </slot>
          </tr>
          <slot name="rowContent" :paginatedData="paginatedData" :align="align" :findColumnByIndex="findColumnByIndex">
            <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center" v-for="(row, indexRow) in paginatedData" :key="indexRow" v-if="!preloading">
              <slot name="uniqueFirstCell">
              </slot>
              <td class="resp-tab_cell" v-for="(col, indexCol) in row.cols" :key="indexCol" :align="align(indexCol)">
                <div v-if="col.value">{{col.value}}</div>
                <div v-else></div>
              </td>
            </tr>
          </slot>
          <tr class="resp-tab_tr" v-for="loadingRow, idx in selectedSize" :key="idx" v-show="preloading">
            <slot name="loading">
              <td class="resp-tab_cell" :class="'loading'" v-for="indexCol in headers.length" :key="indexCol">
                <span></span>
              </td>
            </slot>
          </tr>
          </tbody>
        </slot>
      </table>
    </div>
    <div :class="'mdl_table_footer'" v-show="pagination">
      <Pagination :rows="rows"  :size="selectedSize" :modelValue="paginatedData" @update:modelValue="onUpdateData"  @paginate="onChangePage"></Pagination>
    </div>
  </div>
</template>

<script>

  import Pagination from "components/ui/pagination/Pagination"

  export default {
    name: "TableCustom",

    data() {
      return {
        preloading: this.loading,
        selectedSize: this.size,
        paginatedData: [],
        firstLoading: true,
      }
    },

    watch: {
      rows() {
        this.firstLoading = false
      },
      loading(newValue) {
        this.preloading = newValue
      },
      paginatedData(newValue){
        this.$emit('paginatedData', {paginatedData: newValue})
      }
    },

    methods: {
      findColumnByIndex(str, array) {
        return array.findIndex(el => el.value === str)
      },
      align(index){
        return this.headers[index]?.textAlign
      },
      async onUpdateData(data){
        this.paginatedData = []
        this.preloading = true
        if (!this.loading){
          setTimeout( () => {
            this.paginatedData = data
            this.preloading = false
          }, 500)
        } else {
          this.paginatedData = data
          this.preloading = false
        }
      },
      onChangePage(paginate) {
        this.selectedSize = paginate.size
      },
    },

    computed: {
      updatedDate() {
        if (this.firstLoadingDisabled){
          return !this.rows.length && !this.preloading
        }
        if (!this.firstLoadingDisabled) {
          return !this.rows.length && !this.preloading && !this.firstLoading
        }
        return false
      }
    },

    props: {
      fixedHead: {
        type: Boolean,
        required: false,
        default: false
      },
      firstLoadingDisabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      size: {
        type: Number,
        required: false,
        default: 10
      },
      value: Array,
      headers: {
        type: Array,
        default: []
      },
      rows: {
        type: Array,
        default: []
      },
      pagination: {
        type: Boolean,
        default: false,
        required: false,
      },
      loading: {
        type: Boolean,
        default: false,
        required:false,
      }
    },
    emits: ['paginatedData'],
    components: {
      Pagination
    },
  }
</script>

<style lang="scss" src="./TableCustom.scss"></style>
