<template>
  <TableCustom
    :rows="rows"
    :headers="headers"
    :loading="loading"
    :pagination="true"
  >
    <template v-slot:notFoundRow>
      <td :colspan="headers.length + 1" style="padding: 10px; font-size: 20px;">
        Записи истории марки не найдены
      </td>
    </template>
    <template v-slot:rowContent="{ paginatedData, align, findColumnByIndex }">
      <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center" v-for="row, indexRow in paginatedData" :key="indexRow" v-show="!loading">
        <td class="resp-tab_cell" v-for="col, indexCol in row.cols" :key="indexCol" :align="align(indexCol)">
          <div class="resp-tab_cell_link" v-if="findColumnByIndex('Документ', headers) === indexCol">
            <div>
              <router-link class="link-to-card" :to="{ name: pathToDocument(col), params: { id: col.updId ?? col.docId }, query:{tab: col.updId !== null ? 'tab-2' : 'tab-1'} }">
                {{ col.transactionId }}
              </router-link>
            </div>
          </div>
          <div v-else-if="col">{{col}}</div>
        </td>
      </tr>
    </template>
  </TableCustom>
</template>

<script>

  export default {
    name: 'TableKIZ',

    methods:{
      pathToDocument(col){
        let path = ""
        let type = col.updDocTable ?? col.docType
        switch (type){
          case 'external_incoming_docs':
            path = `directDeliveriesById`
            break
          case 'intragroup_transactions_docs':
            path = `groupOperationsById`
            break
          case 'mark_introduce_docs':
            path = `commissioningById`
            break
          case 'mark_leaving_docs':
            path = `leavingById`
            break
          case 'incoming_docs':
            path = `incomingById`
            break
          case 'aggregation_docs':
            path = `aggregationById`
            break
          case 'external_shipment_docs':
            path = `externalShipmentById`
            break
          case 'external_return_docs':
            path = `externalReturnById`
            break
          case 'reconciliation_docs':
            path = `reconciliationById`
        }
        return path
      },
    },

    props: {
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
