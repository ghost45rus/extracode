<template>
  <TableCustom
     :rows="rows"
     :headers="headers"
     :loading="preloading"
     :firstLoadingDisabled="firstLoadingDisabled"
  >
    <template v-slot:headers>
      <th class="resp-tab_cell resp-tab_cell_first resp-tab_cell_first_th subtitle_td subtitle_td_header"></th>
      <th class="resp-tab_cell subtitle_td_header"
          v-for="header, index in headers"
          :key="index"
          :class="{ col_number: isLineNumber(header.value) }"
      >
        {{header.value}}
      </th>
    </template>
    <template v-slot:rowContent="{align, findColumnByIndex}">
      <template v-for="row, indexRow in rows.length * 2" :key="indexRow">
        <tr class="resp-tab_tr resp-tab_tr_hover  resp-tab_tr_text_align_center"
            :class="rows[indexRow / 2].detailStatus ? `row_color_${rows[indexRow / 2].detailStatus}` : ''"
            v-if="indexRow % 2 === 0"
            :key="indexRow"
            v-show="!preloading"
        >
          <td class="resp-tab_cell resp-tab_cell_first subtitle_td">
            <div v-if="indexRow === 0" @click="toggleTable(indexRow + 1)">
              <i v-if="rows[0].marks && rows[0].marks.length" class="material-icons" :ref="'icon_add-' + indexRow">add</i>
              <i v-if="rows[0].marks && rows[0].marks.length" class="material-icons hidden_table" :ref="'icon_remove-' + indexRow">remove</i>
            </div>
            <div v-else @click="toggleTable(indexRow + 1)">
              <i v-if="rows[Math.ceil(indexRow / 2)].marks && rows[Math.ceil(indexRow / 2)].marks.length" class="material-icons" :ref="'icon_add-' + indexRow">add</i>
              <i v-if="rows[Math.ceil(indexRow / 2)].marks && rows[Math.ceil(indexRow / 2)].marks.length" class="material-icons hidden_table" :ref="'icon_remove-' + indexRow">remove</i>
            </div>
          </td>
          <td class="resp-tab_cell" v-for="col, colIndex in indexRow === 0 ? rows[0].cols : rows[indexRow / 2].cols" :key="colIndex" :align="align(colIndex)">
            <div>
              <slot :data="col" :name="'td_'+colIndex">
                {{col}}
              </slot>
          </div>
          </td>
        </tr>
        <tr v-else v-show="!preloading" :ref="'tr-' + indexRow" class="resp-tab_tr hidden_table">
          <td :colspan="headers.length + 1">
            <AppendTableMarks :disableFirstCell="disableFirstCellAppendTable" :headers="headersAppendMark.length ? headersAppendMark : marksHeaders" :rows="rows[(Math.ceil(indexRow / 2) - 1)].marks">
            </AppendTableMarks>
          </td>
        </tr>
      </template>
    </template>
    <template v-slot:notFoundRow>
      <td :colspan="headers.length + 1" style="padding: 10px; font-size: 20px;">
        <slot name="notFoundRow"></slot>
      </td>
    </template>
  </TableCustom>
</template>

<script>
  import AppendTableMarks from 'components/ui/table/AppendTableMarks'
  import TableCustom from 'components/ui/table/TableCustom'

  export default {
    name: "TableMarks",
    computed: {
      marksHeaders(){
        return this.$store.getters['headers/marksHeaders']
      },
    },
    methods: {
      toggleTable(indexRow) {
        let iconIndexRow = indexRow - 1
        this.$refs['tr-' + indexRow][0].classList.toggle('hidden_table')
        this.$refs['icon_add-' + iconIndexRow][0].classList.toggle('hidden_table')
        this.$refs['icon_remove-' + iconIndexRow][0].classList.toggle('hidden_table')
      },
      isLineNumber(col) {
        return ( col === '№ строки')
      },
    },
    props: {
      headers: {
        type: Array,
        default: []
      },
      firstLoadingDisabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      headersAppendMark: {
        type: Array,
        default: [],
        required: false
      },
      rows: {
        type: Array,
        default: []
      },
      preloading: {
        type: Boolean,
        default: false
      },
      disableFirstCellAppendTable: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    components: {
      AppendTableMarks,
      TableCustom
    }
  }
</script>
