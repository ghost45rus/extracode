<template>
  <tableCustom
  :rows="rows"
  :headers="headers"
  :loading="loading"
  :pagination="true"
  :firstLoadingDisabled="firstLoadingDisabled"
  >

    <template v-slot:notFoundRow>
      <td :colspan="headers.length + 1" style="padding: 10px; font-size: 20px;">
        Товары не найдены
      </td>
    </template>
    <template v-slot:rowContent="{ paginatedData, align, findColumnByIndex }">
      <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center"
          :class="{
        'notBelongOrder': findColumnByIndex('Принадлежит\nзаказу?', headers) !== -1 && row.cols[findColumnByIndex('Принадлежит\nзаказу?', headers)] === 'Нет',
        'notBelongOrder': findColumnByIndex('Проверка КИ', headers) !== -1 && row.cols[findColumnByIndex('Проверка КИ', headers)] === 'Исключен'
      }"
          v-for="(row, indexRow) in paginatedData"
          :key="indexRow" v-show="!loading"
      >
        <td class="resp-tab_cell" v-for="col, indexCol in row.cols" :key="indexCol" :align="align(indexCol)">
          <div v-if="findColumnByIndex('КИЗ', headers) === indexCol">
            <div class="resp-tab_cell_link" :style="{justifyContent: align(indexCol)}">
              <router-link :to="{ name: 'kiz', query: { barCode: col }}">
                {{ col }}
              </router-link>
            </div>
          </div>
          <div v-else>{{ col }}

          </div>
        </td>
      </tr>
    </template>
  </tableCustom>
</template>

<script>

import TableCustom from 'components/ui/table/TableCustom'

export default {
  name: "TableMarksTemplate",

  components: {
    TableCustom
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

<style lang="scss" scoped>
.notBelongOrder{
  background-color: $redPastel;
}

</style>
