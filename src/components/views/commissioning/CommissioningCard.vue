<template>
  <div class="grid_card">
    <GridCard :gridCardType="false" :status="document && document.status ? document.status : {}">
      <template v-slot:grid-card-header_title>
        <div v-if="document && document.transactionId">
          <span class="grid_card_span">Транзакция: {{ document.transactionId }}</span>
        </div>
        <div v-else>
          <span class="grid_card_span" >Ввод в оборот: нет данных</span>
        </div>
      </template>
      <template v-if="document"  v-slot:grid-card-body>
        <Tabs no-ripple-effect v-model:modelValue="selected">
          <Tab :tab="{ title: 'Общие данные', id: 'tab-1' }">
            <div :class="'grid_card-body_card'">
              <Card :titleSize="'16px'">
                <template v-slot:title-text>Сведения о документе</template>
                <template v-slot:body-content>
                  <div class="card_row">
                    <div class="card_column">
                      <label>Товарная группа</label>
                      <Textfield class="mdlTextfield" v-model="document.itemGroupName" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Тип документа</label>
                      <Textfield class="mdlTextfield" v-model="document.typeDoc" readonly></Textfield>
                    </div>
                  </div>
                  <div class="card_row">
                    <div class="card_column">
                      <label>Дата ввода в оборот</label>
                      <Textfield class="mdlTextfield" v-model="document.docAddDate" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Ид. документа в ГИС МТ</label>
                      <Textfield class="mdlTextfield" v-model="document.gisId" readonly></Textfield>
                    </div>
                  </div>
                </template>
              </Card>
              <Card :titleSize="'16px'">
                <template v-slot:title-text>Сведения о производстве</template>
                <template v-slot:body-content>
                  <div class="card_row">
                    <div class="card_column">
                      <label>Ид. заказа</label>
                      <Textfield class="mdlTextfield" v-model="document.orderId" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Дата производства продукции</label>
                      <Textfield class="mdlTextfield" v-model="document.productionDate" readonly></Textfield>
                    </div>
                  </div>
                </template>
              </Card>
              <Card :titleSize="'16px'" v-if="document.introduceTypeName === 'LP_FTS_INTRODUCE'">
                <template v-slot:title-text>Сведения о декларации на товары</template>
                <template v-slot:body-content>
                  <div class="card_row">
                    <div class="card_column">
                      <label>Номер ГТД</label>
                      <Textfield class="mdlTextfield" v-model="document.declarationNumber" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Дата ГТД</label>
                      <Textfield class="mdlTextfield" v-model="document.declarationDate" readonly></Textfield>
                    </div>
                  </div>
                </template>
              </Card>
              <Card :titleSize="'16px'">
                <template v-slot:title-text>Инициатор</template>
                <template v-slot:body-content>
                  <div class="card_row">
                    <div class="card_column">
                      <label>Организация</label>
                      <Textfield class="mdlTextfield" v-model="document.organizationName" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Объект</label>
                      <Textfield class="mdlTextfield" v-model="document.objectInfo" readonly></Textfield>
                    </div>
                  </div>
                </template>
              </Card>
              <Card :titleSize="'16px'" style="margin-top: 20px">
                <template v-slot:title-text>Товары</template>
                <template v-slot:body-content>
                  <div style="padding: 0 10px">
                    <TableMarksTemplate
                      :headers="tableCommissioningHeaders"
                      :rows="document.rows"
                      :loading="false"
                      :firstLoadingDisabled="true"
                    ></TableMarksTemplate>
                  </div>
                </template>
              </Card>
            </div>
          </Tab>
          <Tab :tab="{ title: 'История', id: 'tab-2' }">
            <div :class="'grid_card-body_card'">
              <Card  :titleSize="'16px'" :style="'margin-top: 20px'">
                <template v-slot:card-title>
                  <div class="mdl-card__title mdlCard__title title_card">
                    <span>Иcтория</span>
                    <div>
                      <button @click="getDocHistory" class="mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-button--colored button">
                        <Icon
                          :iconName="'repeat'"
                          :icon-fill-color="'#fff'"
                          :icon-stroke-color="'#fff'"
                          :icon-stroke-width="'6'"
                        ></Icon>
                        Обновить
                      </button>
                    </div>
                  </div>
                </template>
                <template v-slot:body-content>
                  <TableHistory
                    :loading="loading_history"
                    :rows="history.rows"
                  >
                  </TableHistory>
                </template>
              </Card>
            </div>
          </Tab>
        </Tabs>
      </template>
    </GridCard>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: "CommissioningCard",
  data(){
    return {
      selected: 'tab-1',
      loading_history: false
    }
  },

  created() {
    this.$watch(
      () => this.$route.params,
      async () => {
        if (this.$route.params.id){
          if (this.$route.query.tab){
            this.selected = this.$route.query.tab
          }
          this.$store.dispatch('documents/commissioning/clearDocument')
          this.$store.dispatch('documents/clearHistory', 'history')
          await this.$store.dispatch('documents/commissioning/commissioningDocumentById', parseInt(this.$route.params.id))
        }
      },
      { immediate: true }
    )
  },

  watch: {
    selected() {
      if (this.selected === 'tab-2') {
        this.getDocHistory()
      }
    }
  },

  computed: {
    ...mapGetters({ document: 'documents/commissioning/document' }),
    ...mapGetters({ tableCommissioningHeaders: 'headers/tableCommissioningHeaders' }),
    ...mapGetters({ history: 'documents/history' })
  },

  methods: {
    async getDocHistory() {
      this.loading_history = true
      await this.$store.dispatch('documents/documentHistory', { id: parseInt(this.$route.params.id), type: 'mark_introduce_docs' })
      this.loading_history = false
    },
  },

}
</script>

<style lang="scss" src="./CommissioningCard.scss" scoped></style>
