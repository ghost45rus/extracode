<template>
  <TableCustom
  :rows="sortedData"
  :pagination="true"
  :loading="loading"
  :headers="headers"
  >
    <template v-slot:headers>
      <th class="resp-tab_cell resp-tab_cell_first resp-tab_cell_first_th" v-if="firstCellEnabled"></th>
      <th class="resp-tab_cell" v-for="(header, index) in headers" :key="index">
        <div class="resp-tab_cell_header_content">
          <div class="resp-tab_cell_header_content_text">{{header.value}}</div>
          <div class="resp-tab_cell_header_content_icons">
            <Icon
              :iconName="'triangle-top'"
              :iconFillColor="sorting?.activeSortingMethod === 'top' && sorting?.activeSortingIndex === index ? '#424242FF' : '#009688FF'"
              @click="sort(index, 'top')"
              v-if="header.sorted"
              :no_border="true"
            >
            </Icon>
            <Icon
              :iconName="'triangle-bottom'"
              :iconFillColor="sorting?.activeSortingMethod === 'bottom' && sorting?.activeSortingIndex === index ? '#424242FF' : '#009688FF'"
              @click="sort(index, 'bottom')"
              v-if="header.sorted"
              :no_border="true"
            >
            </Icon>
          </div>
        </div>
      </th>
    </template>
    <template v-slot:rowContent="{ paginatedData, align, findColumnByIndex }">
      <slot name="rowContent" :paginatedData="paginatedData" :align="align" :findColumnByIndex="findColumnByIndex">
        <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center" v-for="(row, indexRow) in paginatedData" :key="indexRow" v-show="!loading">
          <td class="resp-tab_cell resp-tab_cell_first subtitle_td" v-if="firstCellEnabled">
            <slot name="firstCell" :row="row">
              <router-link class="link-to-card" :to="{ path: `${routePath()}${row.id}` }">
                <i class="material-icons">description</i>
              </router-link>
            </slot>
          </td>
          <td class="resp-tab_cell" v-for="(col, indexCol) in row.cols" :key="indexCol" :align="align(indexCol)">
            <div style="display: flex" v-if="findColumnByIndex('Статус', headers) === indexCol">
              <Icon
                :iconName="row.status.statusIconName"
                :iconFillColor="row.status.statusColor"
                :iconStrokeColor="row.status.statusColor"
              ></Icon>
              <div style="display: flex; margin-left: 12px; text-align: left;  align-items: center; width: 100%" :style="{'color': row.status.statusColor}">{{col.value}}</div>
            </div>
            <div v-else>
              <slot :data="col" :name="'td_'+indexCol">
                {{col.value}}
              </slot>
            </div>
          </td>
        </tr>
      </slot>
    </template>
    <template v-slot:notFoundRow>
      <slot name="notFoundRow"></slot>
    </template>
    <template v-slot:loading>
      <td class="resp-tab_cell" :class="'loading'" v-for="indexCol in headers.length + 1" :key="indexCol">
        <span></span>
      </td>
    </template>
  </TableCustom>
</template>

<script>

import TableCustom from 'components/ui/table/TableCustom'
import Icon from 'components/ui/Icon/Icon'
import sorting from 'utils/sorting'

export default {
  name: "TableDocumentsList",

  data() {
    return {
      sorting: null,
      preloading: this.loading
    }
  },

  watch:{
    loading(newValue) {
      this.preloading = newValue
    },
  },

  methods: {
    sort(index, type){
      if (this.rows.length !== 0){
        this.$store.commit('sorting/sorting', {
          sorted : true,
          activeSortingIndex: index,
          activeSortingMethod: type,
          doctype: this.typeDoc
        })
        this.sorting.sorted = true
        this.sorting.activeSortingIndex = index
        this.sorting.activeSortingMethod = type
      }
    },
    routePath() {
      return this.$route.path + '/'
    },
  },

  beforeMount() {
    if (this.typeDoc){
     this.sorting = this.$store.getters['sorting/sorting'](this.typeDoc)
    }
  },

  computed: {
    sortedData(){
      if (this.rows &&  this.typeDoc && this.sorting.sorted ){
        return this.sorting.sorted ? this.rows.sort((a, b) => sorting(a.cols[this.sorting.activeSortingIndex].type, this.sorting.activeSortingMethod, a.cols[this.sorting.activeSortingIndex].value, b.cols[this.sorting.activeSortingIndex].value)).slice(0, this.rows.length) : this.rows
      }
      return this.rows
    },
  },

  props:{
    headers: {
      type: Array,
      default: []
    },
    rows: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: false,
      required:false,
    },
    typeDoc:{
      type: String,
      required: false,
      default: ''
    },
    firstCellEnabled: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  components:{
    TableCustom,
    Icon
  }
}
</script>

<style scoped>

</style>
