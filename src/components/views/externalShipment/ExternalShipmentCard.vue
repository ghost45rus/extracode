<template>
  <div class="grid_card">
    <GridCard :gridCardType="false" :status="document && document.status ? document.status : {}">
      <template v-slot:grid-card-header_title>
        <div v-if="document && document.transactionId">
          <span class="grid_card_span">Транзакция: {{ document.transactionId }}</span>
        </div>
        <div v-else>
          <span class="grid_card_span">Продажа контрагентам: нет данных</span>
        </div>
      </template>
      <template v-if="document" v-slot:grid-card-title-button>
        <Context-Menu-Button :color-dotts="'black'" ref="contextButton">
          <template v-slot:menu_item>
            <li :class="{ pushedNone: buttonPush }" @click="RepeatMarksCheck()">Повторить проверку марок</li>
          </template>
        </Context-Menu-Button>
      </template>
      <template v-if="document" v-slot:grid-card-body>
        <Tabs no-ripple-effect v-model="selected">
          <Tab :tab="{ title: 'Сведения о маркировке', id: 'tab-1' }">
            <div :class="'grid_card-body_card'">
                                        <!-- Отправитель -->
              <Card :titleSize="'16px'" :style="'margin-top: 20px;'">
                <template v-slot:title-text>Отправитель</template>
                <template v-slot:body-content>
                  <div class="card_row">
                    <div class="card_column">
                      <label>ИНН</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.vendorInn"></Textfield>
                    </div>
                    <div class="card_column">
                      <label>КПП</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.vendorKpp"></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Организация</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.vendorName"></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Объект</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.vendorObjectInfo"></Textfield>
                    </div>
                  </div>
                </template>
              </Card>
                                        <!-- Получатель -->
              <Card :titleSize="'16px'" :style="'margin-top: 20px;'">
                <template v-slot:title-text>Получатель</template>
                <template v-slot:body-content>
                  <div class="card_row">
                    <div class="card_column">
                      <label>ИНН</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.buyerInn"></Textfield>
                    </div>
                    <div class="card_column">
                      <label>КПП</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.buyerKpp"></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Организация</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.buyerName"></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Объект</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.buyerObjectInfo"></Textfield>
                    </div>
                  </div>
                </template>
              </Card>
                                        <!-- Информация о маркировке -->
              <Card  :titleSize="'16px'" :style="'margin-top: 20px'">
                <template v-slot:title-text>Информация о маркировке</template>
                <template v-slot:body-content>
                  <TableMarks
                    :headers="headers"
                    :rows="document.details"
                    :preloading="false"
                    :firstLoadingDisabled="true"
                  >
                  </TableMarks>
                </template>
              </Card>
            </div>
          </Tab>
          <Tab :tab="{ title: `УКД (${document.correctionDocsQuantity ? document.correctionDocsQuantity : 0})`, id: 'tab-2' }">
            <div :class="'grid_card-body_card'">
              <Card :titleSize="'16px'" :style="'margin-top: 20px'">
                <template v-slot:card-title>
                  <div class="mdl-card__title mdlCard__title title_card">
                    <span>УКД</span>
                    <div>
                      <button @click="getDocUCD" class="mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-button--colored button">
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
                  <TableUKD
                    :rows="UCD.rows"
                    :headers="universalCorrectionHeadersExternalShipment"
                    :loading="loading_UKD"
                  ></TableUKD>
                </template>
              </Card>

            </div>
          </Tab>
          <Tab :tab="{ title: `Возвраты (${ document.returnDocsQuantity })`, id: 'tab-3' }">
            <div :class="'grid_card-body_card'">
              <Card  :titleSize="'16px'" :style="'margin-top: 20px'">
                <template v-slot:card-title>
                  <div class="mdl-card__title mdlCard__title title_card">
                    <span>Возвраты</span>
                    <div>
                      <button @click="getDocReturns" class="mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-button--colored button">
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
                  <TableReturns
                    :rows="returns.rows"
                    :preloading="loading_returns"
                  >
                  </TableReturns>
                </template>
              </Card>
            </div>
          </Tab>
          <Tab :tab="{ title: 'История', id: 'tab-4' }">
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
                  ></TableHistory>
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
    name: 'externalShipmentCard',
    data(){
      return{
        selected: 'tab-1',
        loading_history: false,
        loading_returns: false,
        loading_UKD: false,
        repeatMarksCheckStatus: false
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
            this.$store.dispatch('documents/externalShipment/clearDocument')
            this.$store.dispatch('documents/clearHistory', 'history')
            await this.$store.dispatch('documents/externalShipment/externalShipmentDocumentById', parseInt(this.$route.params.id))
          }
        },
        { immediate: true }
      )
    },
    watch: {
      selected() {
        if (this.selected === 'tab-2') {
          this.getDocUCD()
        }
        if (this.selected === 'tab-3') {
          this.getDocReturns()
        }
        if (this.selected === 'tab-4') {
          this.getDocHistory()
        }
      }
    },
    computed: {
      ...mapGetters({ document: 'documents/externalShipment/document' }),
      ...mapGetters({ history: 'documents/history' }),
      ...mapGetters({ headers: 'headers/tableExternalShipmentHeaders' }),
      buttonPush(){
        if (this?.document.status.statusName === 'DOC_REJECTED'){
          return false
        }
        return true
      },
      returns() {
        return this.$store.getters['documents/externalReturn/documents']
      },
      UCD(){
        return this.$store.getters["documents/ucd/ucdExternalShipment/documents"]
      },
      universalCorrectionHeadersExternalShipment(){
        return this.$store.getters['headers/universalCorrectionHeadersExternalShipment']
      }
    },
    methods: {
      async RepeatMarksCheck() {
        this.$refs.contextButton.opened = false
        if (this.document.status.statusName === 'DOC_REJECTED') {
          this.repeatMarksCheckStatus = true
          await this.$store.dispatch('documents/externalReturn/repeatMarksCheck', {transactionId: this.document.transactionId, docTableName: 'external_shipment_docs'})
          this.repeatMarksCheckStatus = false
        }
      },
      async getDocHistory() {
        this.loading_history = true
        await this.$store.dispatch('documents/documentHistory', { id: parseInt(this.$route.params.id), type: 'external_shipment_docs' })
        this.loading_history = false
      },
      async getDocReturns() {
        this.loading_returns = true
        await this.$store.dispatch('documents/externalReturn/fetchExternalShipmentReturn', parseInt(this.$route.params.id))
        this.loading_returns = false
      },
      async getDocUCD(){
        this.loading_UKD = true
        await this.$store.dispatch('documents/ucd/ucdExternalShipment/universalCorrectDocuments', { id: parseInt(this.$route.params.id), type: 'external-shipment-docs' })
        this.loading_UKD = false
      },
    },
  }
</script>

<style lang="scss" src="./ExternalShipmentCard.scss" scoped></style>
