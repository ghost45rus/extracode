<template>
  <div class="grid_card">
    <GridLayout :filters="true">
      <template v-slot:gridName>
        Выбытие марок
      </template>
      <template v-slot:grid>
        <TableDocumentsList
          :headers="leavingHeaders"
          :loading="loading"
          :rows="documents.rows"
          :typeDoc="'Leaving'"
        ></TableDocumentsList>
      </template>
      <template v-slot:filters>
        <AppFilter>
          <template v-slot:row>
            <div class="filters_column" v-show="filters.transactionId.visibility">
              <Textfield id="transactionId" :label="filters.transactionId.name" floatingLabel v-model="filters.transactionId.value"></Textfield>
            </div>
            <div class="filters_column" v-show="filters.docNumber.visibility">
              <Textfield id="docNumber" :label="filters.docNumber.name" floatingLabel v-model="filters.docNumber.value"></Textfield>
            </div>
            <div class="filters_column" v-show="filters.productGroup.visibility">
              <dropDownMenuInput :label="filters.productGroup.name" id="productGroup" v-model="filters.productGroup.value" :items="productGroup" >
              </dropDownMenuInput>
            </div>
            <div class="filters_column" v-show="filters.markLeavingType.visibility">
              <dropDownMenuInput :label="filters.markLeavingType.name" id="markLeavingType" v-model="filters.markLeavingType.value" :items="markLeavingType" >
              </dropDownMenuInput>
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
    </GridLayout>
  </div>
</template>

<script>


import datePicker from 'vue-datepicker-next'
import 'styles/datepicker.scss'
import 'vue-datepicker-next/locale/ru'
import { dateTimeFormat } from 'utils/datetime'
import { mapGetters } from 'vuex'
import moment from "moment/moment"

export default {
  name: "leaving",

  data(){
    return {
      loading: false,
    }
  },

  computed: {
    ...mapGetters({ productGroup: 'productGroups/getProductGroups' }),
    ...mapGetters({ markLeavingType: 'markLeavingTypes/getMarkLeavingTypes' }),
    ...mapGetters({ leavingHeaders: 'headers/leavingHeaders' }),
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
    documents() {
      return this.$store.getters["documents/leaving/documents"]
    },
    pagination() {
      return this.$store.getters['pagination/pagination']('leaving')
    },
    filters() {
      return this.$store.getters['filters/filters']('Leaving')
    },
    statuses() {
      return this.$store.getters['statuses/statuses']('mark_leaving_docs')
    }
  },

  mounted() {
    this.$store.dispatch('productGroups/fetchProductGroups')
    this.$store.dispatch('markLeavingTypes/fetchMarkLeavingTypes')
    this.$store.dispatch('statuses/getStatuses', 'mark_leaving_docs')
  },

  components: {
    datePicker,
  },

  methods: {
    cleanFilters(){
      this.$store.dispatch('filters/cleanFilters', 'Leaving')
    },
    saveFilters(){
      this.filters.doctype = { value: 'Leaving', visibility: false, name: 'Тип документа' }
      this.$store.dispatch('filters/saveFilters', this.filters)
    },
    async applyFilters() {
      this.loading = true
      this.saveFilters()
      await this.$store.dispatch('documents/leaving/leavingDocuments', {
        transactionId: this.filters.transactionId.value  ?? null,
        docNumber: this.filters.docNumber.value  ?? null,
        productGroupId: this.filters.productGroup.value?.id ?? null,
        markLeavingTypeId: this.filters.markLeavingType.value?.id ?? null,
        dateFrom: this.filters.dateFrom.value  ? moment(this.filters.dateFrom.value ).format('DD-MM-YYYY') : null,
        dateTo: this.filters.dateTo.value  ? moment(this.filters.dateTo.value ).format('DD-MM-YYYY'): null,
        statusIds: this.filters.status.value.length ? this.filters.status.value : null
      })
      this.loading = false
    },
    notAfterDateTo(date) {
      return ( this.filters.dateTo.value ) ?  date > this.filters.dateTo.value  : false
    },
    notBeforeDateFrom(date) {
      return ( this.filters.dateFrom.value  ) ? date < this.filters.dateFrom.value  : false
    }
  },
}
</script>

<style lang="scss" src="./Leaving.scss" scoped></style>
