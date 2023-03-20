<template>
  <div class="grid_card">
    <GridLayout :filters="true">
      <template v-slot:gridName>
        Сверка
      </template>
      <template v-slot:grid>
        <TableDocumentsList
          :headers="reconciliationHeaders"
          :loading="loading"
          :rows="documents.rows ? documents.rows: null"
          :typeDoc="'Reconciliation'"
        >
        </TableDocumentsList>
      </template>
      <template v-slot:filters>
        <AppFilter>
          <template v-slot:row>
            <div class="filters_column filters_column_text" v-show="filters.transactionId.visibility">
              <Textfield id="transactionId" :label="filters.transactionId.name" floatingLabel v-model="filters.transactionId.value"></Textfield>
            </div>
            <div class="filters_column filters_column_text" v-show="filters.reconciliationType.visibility">
              <drop-down-menu-input :label="filters.reconciliationType.name" id="buyer" v-model="filters.reconciliationType.value" :items="reconciliationType">
              </drop-down-menu-input>
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
            <div class="filters_column filters_column_text" v-show="filters.status.visibility">
              <drop-down-menu-multi-input :label="filters.status.name" id="status" v-model="filters.status.value" :items="statuses">
              </drop-down-menu-multi-input>
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
  name: "Reconciliation",
  data(){
    return {
      loading: false,
    }
  },
  computed:{
    reconciliationHeaders(){
      return this.$store.getters['headers/reconciliationHeader']
    },
    reconciliationType(){
      return this.$store.getters["reconciliation/reconciliation"]
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
      return this.$store.getters["documents/reconciliation/documents"]
    },
    pagination() {
      return this.$store.getters['pagination/pagination']('reconciliation')
    },
    filters() {
      return this.$store.getters['filters/filters']('reconciliation')
    },
    statuses() {
      return this.$store.getters['statuses/statuses']('reconciliation_docs')
    }
  },

  components: {
    datePicker,
  },

  mounted() {
    this.$store.dispatch('reconciliation/getReconciliation')
    this.$store.dispatch('statuses/getStatuses', 'reconciliation_docs')
  },

  methods:{
    cleanFilters(){
      this.$store.dispatch('filters/cleanFilters', 'reconciliation')
    },
    saveFilters(){
      this.filters.doctype = { value: 'reconciliation', visibility: false, name: 'Тип документа' }
      this.$store.dispatch('filters/saveFilters', this.filters)
    },
    async applyFilters(){
      this.loading = true
      this.saveFilters()
      await this.$store.dispatch('documents/reconciliation/reconciliationDocuments', {
        transactionId: this.filters.transactionId.value ? this.filters.transactionId.value : null,
        reconciliationType: this.filters.reconciliationType.value?.id ? this.filters.reconciliationType.value.id : null,
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

<style lang="scss" src="./Reconciliation.scss" scoped></style>
