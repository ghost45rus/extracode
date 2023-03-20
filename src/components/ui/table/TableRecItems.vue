<template>
  <TablePlus
    :headers="reconciliationItems"
    :rows="rows"
    :preloading="false"
    :firstLoadingDisabled="true"
    :firstCellEnabled="firstCellEnabled"
  >
    <template v-slot:notFoundRow>
      <td :colspan="reconciliationItems.length + 1" style="padding: 10px; font-size: 20px;">
        Результаты сверки не найдены
      </td>
    </template>
    <template v-slot:data="{data , indexRow, align, findColumnByIndex}">
      <td class="resp-tab_cell" v-for="col, colIndex in indexRow === 0 ? rows[0].cols : rows[indexRow / 2].cols" :key="colIndex"  :align="align(colIndex)" :class="{red: findColumnByIndex('Расхождение', reconciliationItems) !== -1 && findColumnByIndex('Расхождение', reconciliationItems) === colIndex  && col !== 0}">
        <div>
          {{col}}
        </div>
      </td>
    </template>
    <template v-slot:openedData="{data}">
      <TablePlus
        :headers="reconciliationItemsDetailsAppendMark"
        :rows="data"
        :preloading="false"
        :firstLoadingDisabled="true"
        :dataName="'marks'"
      >
        <template v-slot:data="{data , indexRow, align, findColumnByIndex}">
          <td class="resp-tab_cell" v-for="col, colIndex in  data.cols" :key="colIndex"  :align="align(colIndex)" :class="findColumnByIndex('Результат сверки', reconciliationItemsDetailsAppendMark) !== -1 && findColumnByIndex('Результат сверки', reconciliationItemsDetailsAppendMark) === colIndex ? `row_color_${data.status.colorClassMark(data.typeExternal ?? data.typeExternal)}` : ''">
            <div>
              {{col}}
            </div>
          </td>
        </template>
        <template v-slot:openedData="{data}">
          <AppendTableMarks
            :rows="data"
            :headers="reconciliationItemsAppendMark"
            :loading="false"
            :pagination="false"
          >
          </AppendTableMarks>
        </template>
      </TablePlus>
    </template>
  </TablePlus>
</template>

<script>
import TablePlus from 'components/ui/table/TablePlus'
import AppendTableMarks from 'components/ui/table/AppendTableMarks'
import {mapGetters} from "vuex";
export default {
  name: "TableRecItems",
  components: {
    TablePlus,
    AppendTableMarks
  },
  computed: {
    ...mapGetters({ document: 'documents/selectedReconciliation' }),
    ...mapGetters({reconciliationItems: 'headers/reconciliationItems'}),
    ...mapGetters({ reconciliationItemsAppendMark: 'headers/reconciliationItemsAppendMark' }),
    ...mapGetters({ reconciliationItemsDetailsAppendMark: 'headers/reconciliationItemsDetailsAppendMark' }),

  },
  props:{
    rows: {
      type: Array,
      default: []
    },
    firstCellEnabled: {
      type: Boolean,
      required: false,
      default: true
    },
    methods: {
      getClassName(row){
        return 'row_color_' + row.status;
      }
    }
  }
}
</script>

<style scoped>
.red{
  background-color: rgba(255, 36, 0, 0.15)
}
</style>
