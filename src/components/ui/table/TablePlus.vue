<template>
  <TableCustom
    :rows="rows"
    :headers="headers"
    :loading="preloading"
    :firstLoadingDisabled="firstLoadingDisabled"
  >
    <template v-slot:headers>
      <th class="resp-tab_cell resp-tab_cell_first resp-tab_cell_first_th subtitle_td subtitle_td_header" v-if="firstCellEnabled"></th>
      <th class="resp-tab_cell subtitle_td_header"
          v-for="header, index in headers"
          :key="index"
      >
        {{header.value}}
      </th>
    </template>
    <template v-slot:rowContent="{align, findColumnByIndex}">
      <template v-for="row, indexRow in rows.length * 2" :key="indexRow">
        <tr class="resp-tab_tr resp-tab_tr_hover  resp-tab_tr_text_align_center"
            v-if="indexRow % 2 === 0"
            :key="indexRow"
            v-show="!preloading"
        >
          <td class="resp-tab_cell resp-tab_cell_first subtitle_td" v-if="firstCellEnabled">
            <div v-if="indexRow === 0" @click="toggleTable(indexRow + 1)">
              <i v-if="rows[0][dataName] && rows[0][dataName].length" class="material-icons" :ref="'icon_add-' + indexRow">add</i>
              <i v-if="rows[0][dataName] && rows[0][dataName].length" class="material-icons hidden_table" :ref="'icon_remove-' + indexRow">remove</i>
            </div>
            <div v-else @click="toggleTable(indexRow + 1)">
              <i v-if="rows[Math.ceil(indexRow / 2)][dataName]&& rows[Math.ceil(indexRow / 2)][dataName].length" class="material-icons" :ref="'icon_add-' + indexRow">add</i>
              <i v-if="rows[Math.ceil(indexRow / 2)][dataName] && rows[Math.ceil(indexRow / 2)][dataName].length" class="material-icons hidden_table" :ref="'icon_remove-' + indexRow">remove</i>
            </div>
          </td>
          <slot name="data" :data="indexRow === 0 ? rows[0] : rows[indexRow / 2]" :align="align" :findColumnByIndex="findColumnByIndex" :indexRow="indexRow">
            <td class="resp-tab_cell" v-for="col, colIndex in indexRow === 0 ? rows[0].cols : rows[indexRow / 2].cols" :key="colIndex"  :align="align(colIndex)">
              <div>
                {{col}}
              </div>
            </td>
          </slot>
        </tr>
        <tr v-else v-show="!preloading" :ref="'tr-' + indexRow" class="resp-tab_tr hidden_table">
          <td :colspan="headers.length + 1">
            <slot name="openedData" :data="rows[(Math.ceil(indexRow / 2) - 1)][dataName]">
            </slot>
          </td>
        </tr>
      </template>
    </template>
    <template v-slot:notFoundRow>
      <td :colspan="headers.length + 1" style="padding: 10px; font-size: 20px;">
        <slot name="notFoundRow">
        </slot>
      </td>
    </template>
  </TableCustom>
</template>

<script>

export default {
  name: "TablePlus",
  methods: {
    toggleTable(indexRow) {
      let iconIndexRow = indexRow - 1
      this.$refs['tr-' + indexRow][0].classList.toggle('hidden_table')
      this.$refs['icon_add-' + iconIndexRow][0].classList.toggle('hidden_table')
      this.$refs['icon_remove-' + iconIndexRow][0].classList.toggle('hidden_table')
    },
  },
  props: {
    headers: {
      type: Array,
      default: []
    },
    firstCellEnabled: {
      type: Boolean,
      required: false,
      default: true
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
    dataName: {
      type: String,
      default: 'details'
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
