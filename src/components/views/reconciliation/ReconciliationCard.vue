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
                      <label>Тип сверки</label>
                      <Textfield class="mdlTextfield" v-model="document.reconciliationType" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Дата и время</label>
                      <Textfield class="mdlTextfield" v-model="document.reconciliationDate" readonly></Textfield>
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
                      <Textfield class="mdlTextfield" v-model="document.vendorName" readonly></Textfield>
                    </div>
                    <div class="card_column">
                      <label>Объект</label>
                      <Textfield class="mdlTextfield" v-model="document.vendorCode" readonly></Textfield>
                    </div>
                  </div>
                </template>
              </Card>
              <!-- таблица Товары -->
              <Card :titleSize="'16px'" style="margin-top: 20px">
                <template v-slot:title-text>Товары</template>
                <template v-slot:body-content>
                  <div style="padding: 0 10px">
                    <TableRecItems
                    :rows="document.details"
                    :firstCellEnabled="document.reconciliationType !== 'Количественная сверка' ? true : false"
                    ></TableRecItems>
                  </div>
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
  name: "ReconciliationCard",
  data(){
    return {
      selected: 'tab-1',
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
          this.$store.dispatch('documents/reconciliation/clearDocument')
          this.getDoc()
        }
      },
      { immediate: true }
    )
  },

  computed: {
    ...mapGetters({ document: 'documents/reconciliation/document' }),
    ...mapGetters({reconciliationItems: 'headers/reconciliationItems'}),
    ...mapGetters({ reconciliationItemsAppendMark: 'headers/reconciliationItemsAppendMark' }),
    ...mapGetters({ reconciliationItemsDetailsAppendMark: 'headers/reconciliationItemsDetailsAppendMark' }),
  },

  methods: {
    async getDoc() {
      await this.$store.dispatch('documents/reconciliation/reconciliationDocumentById', parseInt(this.$route.params.id))
    }
  },
}
</script>

<style lang="scss" src="./ReconciliationCard.scss" scoped></style>
