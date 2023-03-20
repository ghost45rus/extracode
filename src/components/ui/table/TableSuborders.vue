<template>
  <TableSUZ
    :rows="rows"
    :headers="subordersHeaders"
    :loading="loading"
    :pagination="true"
    :firstLoadingDisabled="true"
  >
    <template v-slot:rowContent="{ paginatedData, align, findColumnByIndex }">
        <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center" v-for="row, indexRow in paginatedData" :key="indexRow" v-show="!loading">
          <td class="resp-tab_cell" v-for="col, indexCol in row.cols" :key="indexCol" :align="align(indexCol)">
            <div>{{ col.value }}</div>
          </td>
        </tr>
    </template>
    <template v-slot:notFoundRow1>
      <td :colspan="subordersHeaders.length + 1" style="padding: 10px; font-size: 20px;">
        Подзаказы не найдены
      </td>
    </template>
  </TableSUZ>
</template>

<script>

  export default {
    name: "TableSuborders",
    data(){
      return {
      }
    },
    computed: {
      subordersHeaders() {
        return this.$store.getters['headers/subordersHeaders']
      }
    },
    props: {
      rows: {
        type: Array,
        default: []
      },
      loading: {
        type: Boolean
      },
    }
  }
</script>
