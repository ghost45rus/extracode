<template>
  <div class="grid_card">
    <GridCard :gridCardType="false" :status="document && document.status ? document.status : {}">
      <template v-slot:grid-card-header_title>
        <div v-if="document && document.transactionId">
          <span class="grid_card_span">Транзакция: {{ document.transactionId }}</span>
        </div>
        <div v-else>
          <span class="grid_card_span" >Заказ: нет данных</span>
        </div>
      </template>
      <template
        v-if="document && !loading_repeatRequest && ['DOC_REJECTED', 'DOC_NOT_RECEIVED'].includes(document.status.statusName)"
        v-slot:grid-card-title-button
      >
        <div class="grid_card_title_item">
          <ContextMenuButton colorDotts="'black'">
            <template v-slot:menu_item>
              <li @click="repeatRequest">Повторить запрос</li>
            </template>
          </ContextMenuButton>
        </div>
      </template>
      <template v-if="document"  v-slot:grid-card-body>
        <Tabs no-ripple-effect v-model:modelValue="selected">
          <Tab :tab="{ title: 'Общие данные', id: 'tab-1' }">
            <div :class="'grid_card-body_card'">
              <!-- Сведения о документе -->
              <Card :titleSize="'16px'">
                <template v-slot:title-text>Сведения о документе</template>
                <template v-slot:body-content>
                  <div class="card_row">
                    <div class="card_column">
                      <label>Товарная группа</label>
                      <Textfield class="mdlTextfield" v-model="document.itemGroupName" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Способ выпуска КМ</label>
                      <Textfield class="mdlTextfield" v-model="document.businessProcess" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Ид. производственного заказа</label>
                      <Textfield class="mdlTextfield" v-model="document.productionOrderId" readonly></Textfield>
                    </div>
                  </div>
                </template>
              </Card>
              <!-- Инициатор -->
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
                    <div class="card_column">
                      <label>Устройство</label>
                      <Textfield class="mdlTextfield" v-model="document.deviceCode" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Контактное лицо</label>
                      <Textfield class="mdlTextfield" v-model="document.contactPerson" readonly></Textfield>
                    </div>
                  </div>
                </template>
              </Card>
              <!-- таблица Товары -->
              <Card :titleSize="'16px'" style="margin-top: 20px">
                <template v-slot:title-text>Товары</template>
                <template v-slot:body-content>
                  <div style="padding: 0 10px">
                    <TableSUZ
                      :headers="tableSuzHeaders"
                      :rows="document.rows"
                      :loading="false"
                      :firstLoadingDisabled="true"
                    ></TableSUZ>
                  </div>
                </template>
              </Card>
            </div>
          </Tab>
          <Tab :tab="{ title: 'Подзаказы', id: 'tab-2' }">
            <div :class="'grid_card-body_card'">
              <Card  :titleSize="'16px'" :style="'margin-top: 20px'">
                <template v-slot:card-title>
                  <div class="mdl-card__title mdlCard__title title_card">
                    <span>Подзаказы</span>
                    <div>
                      <button @click="getDocSuborders" class="mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-button--colored button">
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
                  <TableSuborders
                    :loading="loading_suborders"
                    :rows="suborders.rows"
                  >
                  </TableSuborders>
                </template>
              </Card>
            </div>
          </Tab>
          <Tab :tab="{ title: 'Агрегация', id: 'tab-3' }">
            <div :class="'grid_card-body_card'">
              <Card  :titleSize="'16px'" :style="'margin-top: 20px'">
                <template v-slot:card-title>
                  <div class="mdl-card__title mdlCard__title title_card">
                    <span>Агрегация</span>
                    <div>
                      <button @click="getDocAggregation" class="mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-button--colored button">
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
                  <TableAggregation
                    :loading="loading_aggregation"
                    :rows="aggregation.rows ? aggregation.rows : null"
                    :typeDoc="'aggregationSUZ'"
                  >
                  </TableAggregation>
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

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "SuzCard",
  data(){
    return {
      selected: 'tab-1',
      loading_suborders: false,
      loading_aggregation: false,
      loading_history: false,
      loading_repeatRequest: false
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
          this.$store.dispatch('documents/SUZ/clearDocument'),
          this.$store.dispatch('documents/clearHistory', 'history')
          this.getDocSuz()
        }
      },
      { immediate: true }
    )
  },

  watch: {
    selected() {
      if (this.selected === 'tab-2') {
        this.getDocSuborders()
      }
      if (this.selected === 'tab-3') {
        this.getDocAggregation()
      }
      if (this.selected === 'tab-4') {
        this.getDocHistory()
      }
    },
    async repeatedRequest() {
      if (this.repeatedRequest){
        await new Promise((resolve) => {
          setTimeout(() => resolve(this.getDocSuz()), 1000)
        })
      }
    }
  },

  computed: {
    ...mapGetters({ document: 'documents/SUZ/document' }),
    ...mapGetters({ tableSuzHeaders: 'headers/tableSuzHeaders' }),
    ...mapGetters({ history: 'documents/history' }),
    ...mapGetters({ repeatedRequest: 'documents/SUZ/repeatRequest' }),
    suborders() {
      return this.$store.getters["documents/SUZ/suborders"]
    },
    aggregation() {
      return this.$store.getters["documents/SUZ/aggregations"]
    },
  },

  methods: {
    async getDocSuz() {
      await this.$store.dispatch('documents/SUZ/suzDocumentById', parseInt(this.$route.params.id))
    },
    async getDocSuborders() {
      this.loading_suborders = true
      this.$store.dispatch('documents/SUZ/clearDocumentsSuborders')
      await this.$store.dispatch('documents/SUZ/fetchSubordersSUZ', parseInt(this.$route.params.id))
      this.loading_suborders = false
    },
    async getDocAggregation() {
      this.loading_aggregation = true
      this.$store.dispatch('documents/SUZ/clearDocumentsAggregations')
      await this.$store.dispatch('documents/SUZ/fetchAggregationSUZ', parseInt(this.$route.params.id))
      this.loading_aggregation = false
    },
    async getDocHistory() {
      this.loading_history = true
      await this.$store.dispatch('documents/documentHistory', { id: parseInt(this.$route.params.id), type: 'mark_issue_docs' })
      this.loading_history = false
    },
    async repeatRequest() {
      this.loading_repeatRequest = true
      this.$store.dispatch('documents/SUZ/clearRepeatRequest')
      await this.$store.dispatch('documents/SUZ/fetchRepeatRequest', parseInt(this.$route.params.id))
      this.loading_repeatRequest = false
    }
  },
}
</script>

<style lang="scss" src="./SuzCard.scss" scoped></style>
