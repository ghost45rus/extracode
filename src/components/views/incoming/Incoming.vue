<template>
  <div class="grid_card">
    <gridLayout :filters="true">
      <template v-slot:gridName>
        Приемка импорт
      </template>
      <template v-slot:grid>
        <TableDocumentsList
          :headers="incomingHeaders"
          :loading="loading"
          :rows="documents.rows"
          :typeDoc="'Incoming'"
        >
        </TableDocumentsList>
      </template>
      <template v-slot:filters>
        <AppFilter>
          <template v-slot:row>
            <div class="filters_column" v-show="filters.transactionId.visibility">
              <Textfield id="transactionId" :label="filters.transactionId.name" floatingLabel v-model="filters.transactionId.value"></Textfield>
            </div>
            <div class="filters_column" v-show="filters.productionOrderId.visibility">
              <Textfield id="productionOrderId" :label="filters.productionOrderId.name" floatingLabel v-model="filters.productionOrderId.value"></Textfield>
            </div>
            <div class="filters_column" v-show="filters.dateFrom.visibility">
              <datePicker v-model:value="filters.dateFrom.value" :disabled-date="notAfterDateTo" value-type="date" format="DD.MM.YYYY" prefix-class="xmx">
                <template v-slot:input>
                  <Textfield id="dateFrom" :label="filters.dateFrom.name" floatingLabel readonly v-model="dateFrom"></Textfield>
                </template>
              </datePicker>
            </div>
            <div class="filters_column" v-show="filters.dateTo.visibility">
              <datePicker v-model:value="filters.dateTo.value" :disabled-date="notBeforeDateFrom" value-type="date" format="DD.MM.YYYY" prefix-class="xmx">
                <template v-slot:input>
                  <Textfield id="dateTo" :label="filters.dateTo.name" floatingLabel readonly v-model="dateTo"></Textfield>
                </template>
              </datePicker>
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
    </gridLayout>
  </div>
</template>

<script>

import datePicker from 'vue-datepicker-next'
import 'styles/datepicker.scss'
import 'vue-datepicker-next/locale/ru'
import { dateTimeFormat } from 'utils/datetime'
import moment from "moment/moment"

export default {
  name: "incoming",

  data(){
    return {
      loading: false,
    }
  },

  computed: {
    incomingHeaders() {
      return this.$store.getters['headers/incomingHeaders']
    },
    documents() {
      return this.$store.getters["documents/incoming/documents"]
    },
    pagination() {
      return this.$store.getters['pagination/pagination']('incoming')
    },
    filters() {
      return this.$store.getters['filters/filters']('Incoming')
    },
    dateFrom() {
      let date = null
      if (this.filters.dateFrom.value ){
        date = dateTimeFormat(this.filters.dateFrom.value , 'date')
      }
      return date
    },
    dateTo() {
      let date = null
      if (this.filters.dateTo.value ){
        date = dateTimeFormat(this.filters.dateTo.value , 'date')
      }
      return date
    },
    statuses() {
      return this.$store.getters['statuses/statuses']('incoming_docs')
    }
  },

  components: {
    datePicker,
  },

  beforeMount() {
    this.$store.dispatch('statuses/getStatuses', 'incoming_docs')
  },

  methods: {
    cleanFilters(){
      this.$store.dispatch('filters/cleanFilters', 'Incoming')
    },
    saveFilters(){
      this.filters.doctype = { value: 'Incoming', visibility: false, name: 'Тип документа' }
      this.$store.dispatch('filters/saveFilters', this.filters)
    },
    async applyFilters() {
      this.loading = true
      this.saveFilters()
      await this.$store.dispatch('documents/incoming/incomingDocuments', {
        transactionId: this.filters.transactionId.value ?? null,
        productionOrderId: this.filters.productionOrderId.value ?? null,
        dateFrom: this.filters.dateFrom.value ? moment(this.filters.dateFrom.value ).format('DD-MM-YYYY') : null,
        dateTo: this.filters.dateTo.value ? moment(this.filters.dateTo.value ).format('DD-MM-YYYY'): null,
        statusIds: this.filters.status.value.length ? this.filters.status.value : null
      })
      this.loading = false
    },
    notAfterDateTo(date) {
      return ( this.filters.dateTo.value ) ? date > this.filters.dateTo.value : false
    },
    notBeforeDateFrom(date) {
      return ( this.filters.dateFrom.value  ) ? date < this.filters.dateFrom.value : false
    }
  },
}
</script>

<style lang="scss" src="./Incoming.scss" scoped></style>
