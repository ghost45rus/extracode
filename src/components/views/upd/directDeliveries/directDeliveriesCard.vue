<template>
  <div class="grid_card">
    <GridCard :status="document && document.status ? document.status : {}">
      <template v-slot:grid-card-header_title>
        <div v-if="document && document.transactionId">
          <span class="grid_card_span">Транзакция: {{ document.transactionId }}</span>
        </div>
        <div v-else>
          <span class="grid_card_span">Транзакция: нет данных</span>
        </div>
      </template>
      <template v-slot:grid-card-header_status>
      </template>
      <template v-if="document" v-slot:grid-card-title-button>
        <context-Menu-Button :color-dotts="'black'" ref="contextButton">
          <template v-slot:menu_item>
            <li :class="{ pushedNone: buttonPush }" @click="detailedInGIS(document.id)">Запросить детализацию из ГИС</li>
          </template>
        </context-Menu-Button>
      </template>
      <template v-slot:grid-card-type>
        Прямая поставка
      </template>
      <template v-if="document" v-slot:grid-card-status>
        <ProcessStatusPane
          :labels="[ 'Приёмка', 'Факт подписания УПД', 'Регистрация УПД в ГИС' ]"
          :statuses="[ document.isAccepted, document.isSigned, document.isConfirmed ]"
        />
      </template>
      <template v-if="document" v-slot:grid-card-body>
        <Tabs no-ripple-effect v-model:modelValue="selected">
          <Tab :tab="{ title: 'Сведения о маркировке', id: 'tab-1' }">
            <div :class="'grid_card-body_card'">
                                        <!-- Информация об УПД -->
              <Card :titleSize="'16px'">
                <template v-slot:title-text>Информация об УПД</template>
                <template v-slot:body-content>
                  <div class="card_row">
                    <div class="card_column">
                      <label>Дата</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.invoiceDate"></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Номер</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.invoice"></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Номер исправления</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.corrnumber"></Textfield>
                    </div>
                  </div>
                </template>
              </Card>
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
                      <label>Код поставщика</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.vendorCode"></Textfield>
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
                      <label>Код объекта</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.buyerCode"></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Наименование объекта</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.name"></Textfield>
                    </div>
                  </div>
                </template>
              </Card>
                                  <!-- Информация о маркировке -->
              <Card  :titleSize="'16px'" :style="'margin-top: 20px'">
                <template v-slot:title-text>Информация о маркировке</template>
                <template v-slot:body-content>
                  <TableMarks
                  :headers="tableUpdHeaders"
                  :rows="document.details"
                  :preloading="false"
                  :firstLoadingDisabled="true"
                  >
                  </TableMarks>
                </template>
              </Card>
            </div>
          </Tab>
          <Tab :tab="{ title: `УКД (${document.correctionDocsQuantity})`, id: 'tab-2' }">
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
                    :headers="universalCorrectionHeaders"
                    :loading="loading_UKD"
                  ></TableUKD>
                </template>
              </Card>

            </div>
          </Tab>
          <Tab :tab="{ title: 'История', id: 'tab-3' }">
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
    name: "directDeliveriesCard",
    data(){
      return {
        selected: 'tab-1',
        loading_UKD: false,
        loading_history: false,
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
            this.$store.dispatch('documents/directDeliveries/clearDocument')
            this.$store.dispatch('documents/clearHistory', 'history')
            await this.$store.dispatch('documents/directDeliveries/directDeliveryDocumentById', parseInt(this.$route.params.id))
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
          this.getDocHistory()
        }
      }
    },
    computed: {
      buttonPush(){
        if (this?.document.status.statusName === 'DOC_CREATED' || this?.document.status.statusName === 'DOC_DETALIZATION_FAILED'){
          return false
        }
        return true
      },
      universalCorrectionHeaders(){
        return this.$store.getters['headers/universalCorrectionHeaders']
      },
      tableUpdHeaders(){
        return this.$store.getters['headers/tableUpdHeaders']
      },
      UCD(){
        return this.$store.getters["documents/ucd/ucdExternalIncoming/documents"]
      },
      ...mapGetters({ document: 'documents/directDeliveries/document' }),
      ...mapGetters({ history: 'documents/history' })
    },
    methods: {
      async detailedInGIS(id){
        this.$refs.contextButton.opened = false
        if (this.document.status.statusName === 'DOC_CREATED' || this.document.status.statusName === 'DOC_DETALIZATION_FAILED') {
          await this.$store.dispatch('documents/directDeliveries/detailDocument', id)
        }
      },
      async getDocUCD(){
        this.loading_UKD = true
        await this.$store.dispatch('documents/ucd/ucdExternalIncoming/universalCorrectDocuments', { id: parseInt(this.$route.params.id), type: 'external-incoming' })
        this.loading_UKD = false
      },
      async getDocHistory() {
        this.loading_history = true
        await this.$store.dispatch('documents/documentHistory', { id: parseInt(this.$route.params.id), type: 'external_incoming_docs' })
        this.loading_history = false
      },
    }
  }
</script>

<style lang="scss" src="./directDeliveriesCard.scss" scoped></style>
