<template>
  <TableCustom
    :rows="rows"
    :headers="headers"
    :pagination="true"
    :size="10"
    :loading="loading"
    :firstLoadingDisabled="firstLoadingDisabled"
  >
    <template v-slot:notFoundRow>
        <td :colspan="headers.length + 1" style="padding: 10px; font-size: 20px;">
          <slot name="notFoundRow1">
          Товары не найдены
          </slot>
        </td>
    </template>

      <template v-slot:rowContent="{ paginatedData, align, findColumnByIndex }">
        <slot name="rowContent" :paginatedData="paginatedData" :align="align" :findColumnByIndex="findColumnByIndex">
          <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center" v-for="row, indexRow in paginatedData" :key="indexRow" v-show="!loading">
            <td class="resp-tab_cell" v-for="col, indexCol in row.cols" :key="indexCol" :align="align(indexCol)">
              <div>{{ col }}</div>
            </td>
          </tr>
        </slot>
      </template>


  </TableCustom>
</template>

<script>

export default {
  name: 'TableSUZ',

  props: {
    firstLoadingDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    headers: {
      type: Array,
      default: []
    },
    rows: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean
    },
  },
}
</script>

