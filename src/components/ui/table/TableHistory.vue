<template>
  <TableCustom
    :rows="rows"
    :loading="loading"
    :size="10"
    :pagination="true"
    :headers="historyHeaders"
  >
    <template v-slot:notFoundRow>
        <td :colspan="historyHeaders.length + 1" style="padding: 10px; font-size: 20px;">
          Записи истории документа не найдены
        </td>
    </template>
    <template v-slot:rowContent="{ paginatedData, align, findColumnByIndex }">
      <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center"
          v-for="row, indexRow in paginatedData"
          :key="indexRow"
          v-show="!loading"
      >
        <td class="resp-tab_cell" v-for="col, indexCol in row.cols" :key="indexCol" :align="align(indexCol)">

          <div style="display: flex; width: 200px; padding-left: 20px" v-if="findColumnByIndex('Статус документа', historyHeaders) === indexCol">
            <Icon
              :iconName="row.status.statusIconName"
              :iconFillColor="row.status.statusColor"
              :iconStrokeColor="row.status.statusColor"
            ></Icon>
            <div style="display: flex; margin-left: 12px; text-align: left;  align-items: center; width: 100%">
              {{col}}
            </div>
          </div>
          <div v-else>{{col}}</div>
        </td>
      </tr>
    </template>
  </TableCustom>
</template>

<script>

import TableCustom from 'components/ui/table/TableCustom'
import Icon from 'components/ui/Icon/Icon'

  export default {
    name: "TableHistory",
    data(){
      return {
      }
    },
    computed:{
      historyHeaders(){
        return this.$store.getters['headers/historyHeaders']
      },
    },
    props: {
      rows: {
        type: Array,
        default: []
      },
      loading: {
        type: Boolean,
        default: false,
        required:false,
      },
    },
    components: {
      TableCustom,
      Icon
    }
  }
</script>
