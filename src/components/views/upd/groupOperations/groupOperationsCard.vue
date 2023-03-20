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
      <template v-slot:grid-card-type>
        <div v-if="document">ВГО {{ document.movementType }}</div>
      </template>
      <template v-if="document" v-slot:grid-card-body>
        <Tabs no-ripple-effect v-model="selected">
          <Tab :tab="{ title: 'Сведения о маркировке', id: 'tab-1' }">
            <div :class="'grid_card-body_card'">
                                        <!-- Информация об УПД -->
              <Card :titleSize="'16px'">
                <template v-slot:title-text>Информация об УПД</template>
                <template v-slot:body-content>
                  <div class="card_row">
                    <div class="card_column">
                      <label>Дата</label>
                      <Textfield class="mdlTextfield" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Номер</label>
                        <Textfield class="mdlTextfield" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Номер исправления</label>
                        <Textfield class="mdlTextfield" readonly></Textfield>
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
                    <div class="card_column">
                      <label>Наименование объекта</label>
                      <Textfield class="mdlTextfield" readonly v-model="document.vendorObjectName"></Textfield>
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
                      <Textfield class="mdlTextfield" readonly v-model="document.buyerObjectName"></Textfield>
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
          <Tab :tab="{ title: `УКД (${document.correctionDocsQuantity ?? 0})`, id: 'tab-2' }" v-if="document.docTypeId === 1">
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
                  >
                  </TableUKD>
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
      <template v-if="document" v-slot:grid-card-status>
        <ProcessStatusPane v-if="document.movementType === 'Смена ЮЛ'"
          :labels="[ 'Отгрузка', 'Факт подписания УПД', 'Регистрация УПД в ГИС', 'Приёмка' ]"
          :statuses="[ 'done', document.isSigned, document.isConfirmed, document.isAccepted ]"
        />
        <ProcessStatusPane v-if="document.movementType === 'Внутри ЮЛ'"
          :labels="[ 'Отгрузка', 'Приёмка' ]"
          :statuses="[ 'done', document.isAccepted ]"
        />
      </template>
    </GridCard>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'

  export default {
    name: "groupOperationCard",
    data(){
      return{
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
            this.$store.dispatch('documents/groupOperations/clearDocument')
            this.$store.dispatch('documents/clearHistory', 'history')
            await this.$store.dispatch('documents/groupOperations/groupOperationDocumentById', parseInt(this.$route.params.id))
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
      ...mapGetters({ document: 'documents/groupOperations/document' }),
      ...mapGetters({ history: 'documents/history' }),
      universalCorrectionHeaders(){
        return this.$store.getters['headers/universalCorrectionHeaders']
      },
      tableUpdHeaders(){
        return this.$store.getters['headers/tableUpdHeaders']
      },
      UCD(){
        return this.$store.getters["documents/ucd/ucdIntraGroupTransaction/documents"]
      },
    },
    methods: {
      async getDocHistory() {
        this.loading_history = true
        await this.$store.dispatch('documents/documentHistory', { id: parseInt(this.$route.params.id), type: 'intragroup_transactions_docs' })
        this.loading_history = false
      },
      async getDocUCD(){
        this.loading_UKD = true
        await this.$store.dispatch('documents/ucd/ucdIntraGroupTransaction/universalCorrectDocuments', { id: parseInt(this.$route.params.id), type: 'intra-group-transactions' })
        this.loading_UKD = false
      },
    },
  }
</script>

<style lang="scss" src="./groupOperationsCard.scss" scoped></style>
