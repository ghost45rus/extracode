<template>
  <TableCustom
    :headers="returnsHeaders"
    :loading="preloading"
    :pagination="true"
    :rows="rows"
  >
    <template v-slot:headers>
      <th class="resp-tab_cell resp-tab_cell_first resp-tab_cell_first_th"></th>
      <th class="resp-tab_cell" v-for="(header, index) in returnsHeaders" :key="index">
        <div class="resp-tab_cell_header_content">
          <div class="resp-tab_cell_header_content_text">{{header.value}}</div>
        </div>
      </th>
    </template>
    <template v-slot:rowContent="{ paginatedData, align, findColumnByIndex }">
      <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center"
          v-for="row, indexRow in paginatedData"
          :key="indexRow"
          v-show="!preloading"
      >
        <td class="resp-tab_cell resp-tab_cell_first subtitle_td">
          <router-link class="link-to-card" :to="{ name: 'externalReturnById', params: { id: row.id }}">
            <i class="material-icons">description</i>
          </router-link>
        </td>
        <td class="resp-tab_cell" v-for="col, indexCol in row.cols" :key="indexCol" :align="align(indexCol)">
          <div style="display: flex; width: 150px; padding-left: 20px" v-if="findColumnByIndex('Статус', returnsHeaders) === indexCol">
            <Icon
              :iconName="row.status.statusIconName"
              :iconFillColor="row.status.statusColor"
              :iconStrokeColor="row.status.statusColor"
            ></Icon>
            <div style="display: flex; margin-left: 12px; text-align: left;  align-items: center; width: 100%" :style="{'color': row.status.statusColor}">{{col.value}}</div>
          </div>
          <div v-else>{{col.value}}</div>
        </td>
      </tr>
    </template>
    <template v-slot:notFoundRow>
      <td :colspan="returnsHeaders.length + 1" style="padding: 10px; font-size: 20px;">
        Документы возврата не найдены
      </td>
    </template>
    <template v-slot:loading>
      <td class="resp-tab_cell" :class="'loading'" v-for="indexCol in returnsHeaders.length + 1" :key="indexCol">
        <span></span>
      </td>
    </template>
  </TableCustom>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'TableReturns',
    data(){
      return {
      }
    },
    computed: {
      ...mapGetters({ returnsHeaders: 'headers/externalShipmentReturnHeaders' })
    },
    methods:{
      align(index){
        return this.returnsHeaders[index].textAlign
      },
    },
    props: {
      rows: {
        type: Array,
        default: []
      },
      preloading: {
        type: Boolean
      },
    },
  }
</script>
