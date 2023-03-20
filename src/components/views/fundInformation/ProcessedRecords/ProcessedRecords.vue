<template>
  <div class="grid_card">
    <GridLayout :filters="true">
      <template v-slot:gridName>
        Обработанные записи
      </template>
      <template v-slot:grid>
        <TableDocumentsList
          :headers="fundInformationHeader"
          :loading="loading"
          :rows="documents.rows ? documents.rows: null"
          :typeDoc="'ProcessedRecords'"
          :firstCellEnabled="false"
        >
          <template v-slot:td_0="{data}">
            <router-link class="link-to-card" :to="{ path: `` }">
              <div class="resp-tab_cell_link" style="justify-content: center">
                <router-link :to="{ name: 'kiz', query: { barCode: data.value }}">
                  {{ data.value }}
                </router-link>
              </div>
            </router-link>
          </template>
          <template v-slot:notFoundRow>
            <td :colspan="fundInformationHeader.length + 1" style="padding: 10px; font-size: 20px;">
              Записи по маркам не найдены
            </td>
          </template>
        </TableDocumentsList>
      </template>
      <template v-slot:filters>
        <AppFilter>
          <template v-slot:row>
            <div class="filters_column filters_column_text" v-show="filters.barcode.visibility">
              <Textfield id="transactionId" :label="filters.barcode.name" floatingLabel v-model="filters.barcode.value"></Textfield>
            </div>
            <div class="filters_column filters_column_text" v-show="filters.objectKiLost.visibility">
              <drop-down-menu-input :label="filters.objectKiLost.name" id="vendor" v-model="filters.objectKiLost.value" :items="objects">
              </drop-down-menu-input>
            </div>
            <div class="filters_column filters_column_text" v-show="filters.objectKiFind.visibility">
              <drop-down-menu-input :label="filters.objectKiFind.name" id="buyer" v-model="filters.objectKiFind.value" :items="objects">
              </drop-down-menu-input>
            </div>
            <div class="filters_column filters_column_text" v-show="filters.status.visibility">
              <drop-down-menu-multi-input :label="filters.status.name" id="status" v-model="filters.status.value" :items="statuses">
              </drop-down-menu-multi-input>
            </div>
            <div class="filters_column filters_column_date" v-show="filters.dateFrom.visibility">
              <date-picker v-model:value="filters.dateFrom.value" :disabled-date="notAfterDateTo" value-type="date" format="DD.MM.YYYY" prefix-class="xmx">
                <template v-slot:input>
                  <Textfield id="dateFrom" :label="filters.dateFrom.name" floatingLabel readonly v-model="dateFrom"></Textfield>
                </template>
              </date-picker>
            </div>
            <div class="filters_column filters_column_date" v-show="filters.dateTo.visibility">
              <date-picker v-model:value="filters.dateTo.value" :disabled-date="notBeforeDateFrom" value-type="date" format="DD.MM.YYYY" prefix-class="xmx">
                <template v-slot:input>
                  <Textfield id="dateTo" :label="filters.dateTo.name" floatingLabel readonly v-model="dateTo"></Textfield>
                </template>
              </date-picker>
            </div>
          </template>
        </AppFilter>
      </template>
      <template v-slot:filter-button>
        <filter-control-buttons :apply="applyFilters" :clearFiltrers="cleanFilters" :filter-list="filters" :saveFilters="saveFilters"></filter-control-buttons>
      </template>
    </GridLayout>
  </div>
</template>

<script>

import datePicker from 'vue-datepicker-next'
import 'styles/datepicker.scss'
import 'vue-datepicker-next/locale/ru'
import moment from "moment/moment"
import { dateTimeFormat } from 'utils/datetime'

export default {
  name: "ProcessedRecords",
  data(){
    return {
      loading: false,
      test: null,
    }
  },
  computed:{
    fundInformationHeader(){
      return this.$store.getters['headers/fundInformationHeader']
    },
    objects(){
      return this.$store.getters["organizations/objects"]
    },
    dateFrom(){
      let date = null
      if (this.filters.dateFrom){
        date = dateTimeFormat(this.filters.dateFrom.value, 'date')
      }
      return date
    },
    dateTo(){
      let date = null
      if (this.filters.dateTo){
        date = dateTimeFormat(this.filters.dateTo.value, 'date')
      }
      return date
    },
    documents() {
      return this.$store.getters["documents/fundInformation/processedRecords/documents"]
    },
    pagination() {
      return this.$store.getters['pagination/pagination']('fundInformation')
    },
    filters() {
      return this.$store.getters['filters/filters']('processedRecords')
    },
    statuses() {
      return this.$store.getters['statuses/statuses']('processed')
    }
  },

  components: {
    datePicker,
  },

  beforeMount() {
    this.$store.dispatch('statuses/getStatusesFund', 'processed')
  },

  methods:{
    cleanFilters(){
      this.$store.dispatch('filters/cleanFilters', 'processedRecords')
    },
    saveFilters(){
      this.filters.doctype = { value: 'processedRecords', visibility: false, name: 'Тип документа' }
      this.$store.dispatch('filters/saveFilters', this.filters)
    },
    async applyFilters(){
      this.loading = true
      this.saveFilters()
      await this.$store.dispatch('documents/fundInformation/processedRecords/processedRecordDocuments',
        {
          barcode: this.filters.barcode.value ? this.filters.barcode.value : null,
          objectLostId: this.filters.objectKiLost.value?.id ? this.filters.objectKiLost.value.id : null,
          objectFindId: this.filters.objectKiFind.value?.id ? this.filters.objectKiFind.value.id : null,
          dateFrom: this.filters.dateFrom.value ? moment(this.filters.dateFrom.value).format('DD-MM-YYYY') : null,
          dateTo: this.filters.dateTo.value ? moment(this.filters.dateTo.value).format('DD-MM-YYYY'): null,
          statusIds: this.filters.status.value.length ? this.filters.status.value : null
        })
      this.loading = false
    },
    notAfterDateTo(date) {
      return ( this.filters.dateTo.value ) ?  date > this.filters.dateTo.value : false
    },
    notBeforeDateFrom(date) {
      return ( this.filters.dateFrom.value ) ? date < this.filters.dateFrom.value : false
    }
  },
}
</script>

