<template>
  <div class="grid_card">
    <GridLayout :filters="true">
      <template v-slot:gridName>
        Прямые поставки
      </template>
        <template v-slot:grid>
          <TableDocumentsList
            :headers="directDeliveryHeaders"
            :loading="loading"
            :rows="documents.rows ? documents.rows: null"
            :typeDoc="'directDeliveries'"
          >
          </TableDocumentsList>
      </template>
      <template v-slot:filters>
        <AppFilter>
          <template v-slot:row>
            <div class="filters_column filters_column_text" v-show="filters.transactionId.visibility">
              <Textfield id="transactionId" :label="filters.transactionId.name" floatingLabel v-model="filters.transactionId.value"></Textfield>
            </div>
            <div class="filters_column filters_column_text" v-show="filters.numberUpd.visibility">
              <Textfield id="numberUpd" :label="filters.numberUpd.name" floatingLabel v-model="filters.numberUpd.value"></Textfield>
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
            <div class="filters_column filters_column_text" v-show="filters.vendor.visibility">
              <dropDownMenuInput :label="filters.vendor.name" id="vendor" v-model="filters.vendor.value" :items="vendors" >
              </dropDownMenuInput>
            </div>
            <div class="filters_column filters_column_text" v-show="filters.buyer.visibility">
              <dropDownMenuInput :label="filters.buyer.name" id="buyer" v-model="filters.buyer.value" :items="buyers">
              </dropDownMenuInput>
            </div>
            <div class="filters_column filters_column_text" v-show="filters.status.visibility">
              <dropDownMenuMultiInput :label="filters.status.name" id="status" v-model="filters.status.value" :items="statuses">
              </dropDownMenuMultiInput>
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
    name: "directDeliveries",
    data(){
      return {
        loading: false,
      }
    },
    computed:{
      directDeliveryHeaders(){
        return this.$store.getters['headers/directDeliveryHeaders']
      },
      vendors(){
        return this.$store.getters["organizations/external"]
      },
      buyers(){
        return this.$store.getters["organizations/internal"]
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
        return this.$store.getters["documents/directDeliveries/documents"]
      },
      pagination() {
        return this.$store.getters['pagination/pagination']('directDeliveries')
      },
      filters() {
        return this.$store.getters['filters/filters']('directDeliveries')
      },
      statuses() {
        return this.$store.getters['statuses/statuses']('external_incoming_docs')
      }
    },

    components: {
      datePicker,
    },

    beforeMount() {
      this.$store.dispatch('organizations/externalOrganizations')
      this.$store.dispatch('organizations/internalOrganizations')
      this.$store.dispatch('statuses/getStatuses', 'external_incoming_docs')
    },

    methods:{
      cleanFilters(){
        this.$store.dispatch('filters/cleanFilters', 'directDeliveries')
      },
      saveFilters(){
        this.filters.doctype = { value: 'directDeliveries', visibility: false, name: 'Тип документа' }
        this.$store.dispatch('filters/saveFilters', this.filters)
      },
      async applyFilters(){
        this.loading = true
        this.saveFilters()
        await this.$store.dispatch('documents/directDeliveries/directDeliveryDocuments', {
          transactionId: this.filters.transactionId.value ? this.filters.transactionId.value : null,
          invoice: this.filters.numberUpd.value ? this.filters.numberUpd.value : null,
          invoiceDateFrom: this.filters.dateFrom.value ? moment(this.filters.dateFrom.value).format('DD-MM-YYYY') : null,
          invoiceDateTo: this.filters.dateTo.value ? moment(this.filters.dateTo.value).format('DD-MM-YYYY'): null,
          vendorId: this.filters.vendor.value?.id ? this.filters.vendor.value.id : null,
          buyerId: this.filters.buyer.value?.id ? this.filters.buyer.value.id : null,
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

<style lang="scss" src="./directDeliveries.scss" scoped></style>
