<template>
  <TableDocumentsList
  :headers="headers"
  :rows="rows.length ? rows : []"
  :loading="loading"
  >
    <template v-slot:firstCell="{ row }">
      <i @click="openModal(row)" class="material-icons">description</i>
    </template>
  </TableDocumentsList>
  <ModalWindow v-model="showModal">
    <template v-slot:modalBody>

      <div style="display:flex; gap: 20px">
        <div :class="'grid_card-body_card'">
          <Card :titleSize="'16px'" :style="['margin-top: 20px', 'min-width: 460px']">
            <template v-slot:title-text>До</template>
            <template v-slot:body-content>
              <TableMarksUKD
                :headers="kizUkdHeaders"
                :loading="loadingDataKizUcd"
                :rows="kizUKD ? kizUKD.before.rows : []"
              >
              </TableMarksUKD>
            </template>
          </Card>
        </div>
        <div :class="'grid_card-body_card'">
          <Card :titleSize="'16px'" :style="['margin-top: 20px', 'min-width: 460px']">
            <template v-slot:title-text>После</template>
            <template v-slot:body-content>
              <TableMarksUKD
                :headers="kizUkdHeaders"
                :loading="loadingDataKizUcd"
                :rows="kizUKD ? kizUKD.after.rows : []"
              >
              </TableMarksUKD>
            </template>
          </Card>
        </div>
      </div>
    </template>
  </ModalWindow>
</template>

<script>

import Icon from 'components/ui/Icon/Icon'
import ModalWindow from 'components/ui/modalWindow/ModalWindow'
import TableMarksUKD from 'components/ui/table/TableMarksTemplate'
import TableDocumentsList from 'components/ui/table/TableDocumentsList'

export default {
  name: "TableUKD",
  data(){
    return{
      showModal: false,
      modalTitle: '',
      loadingDataKizUcd: false,
    }
  },
  computed:{
    kizUkdHeaders(){
      return this.$store.getters['headers/kizUkdHeaders']
    },
    kizUKD(){
      return this.$store.getters['kiz/kizUKD']
    }
  },
  methods:{
    async openModal(row){
      this.loadingDataKizUcd = true
      await this.getMarksData(row.id)
      this.loadingDataKizUcd = false
      this.modalTitle = row.cols[1].value
      this.showModal = true
    },
    getMarksData(id){
      this.$store.dispatch('kiz/getMarksByUkdId', id)
    }
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
    selectedSize:{
      type: Number,
      required: false,
      default: 5
    },
    paginatedData: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean
    },
    updatedData: {
      type: Boolean
    },
  },
  components: {
    Icon,
    ModalWindow,
    TableMarksUKD,
    TableDocumentsList
  }
}
</script>

<style scoped>

</style>
