<template>
  <div class="grid_card">
    <div class="kiz_search">
      <Textfield v-model.trim="findBarcode"
                 @keyup.enter="findMark"
                 class="kiz_search_input"
                 id="search"
                 ref="searchbar"
                 label="Код марки"
                 floatingLabel
      ></Textfield>
      <button @click="findMark" class="mdl-button mdl-js-button mdl-button--primary mdl-button--colored mdl-js-ripple-effect">
        Поиск
      </button>
    </div>
    <div v-if="message" class="kiz_search_message"> {{ message }} </div>
    <div :class="{ grid_card_wrapper: loading }">
      <Progress v-show="loading" id="mdl-progress-kiz" indeterminate></Progress>
    </div>
    <Card  v-if="document">
      <template v-slot:card-title>
        <div class="mdl-card__title mdlCard__title kiz_card_header">
          <h2 class="mdl-card__title-text"><span>{{ document.productName }}</span></h2>
          <div  class="kiz_card_header_separator">
            <Icon
              :iconName="'mark-index'"
              :iconFillColor="'#757575'"
              :iconStrokeColor="'#757575'"
              :iconStrokeWidth="'9'"
            ></Icon>
          </div>
          <h2 class="mdl-card__title-text"><span>{{ document.barCode }}</span></h2>
          <div class="kiz_card_header_status" :style="{'background-color': document.status.statusColor, 'color': 'white'}">
            <Icon
              :iconName="document.status.statusIconName"
              :iconFillColor="'white'"
              :iconStrokeColor="'white'"
            ></Icon>
            {{document.status.statusDescription}}
          </div>
          <ContextMenuButton style="margin-left: auto" :color-dotts="'black'" ref="contextButton">
            <template v-slot:menu_item>
              <li @click="updateInGIS">Запрос на проверку марок в ГИС МТ</li>
            </template>
          </ContextMenuButton>
        </div>
      </template>
      <template v-slot:body-content>
        <div class="kiz_card_body">
          <div class="kiz_card_body_item">
            <Card :title-size="'16px'">
              <template v-slot:title-text>
                Общая информация
              </template>
              <template v-slot:body-content>
                <div class="card_row">
                  <div class="card_column">
                    <label>Товарная группа</label>
                    <Textfield class="kiz_card_body_input" id="product_group" readonly v-model="document.productGroup"></Textfield>
                  </div>
                  <div class="card_column">
                    <label>GTIN</label>
                    <Textfield class="kiz_card_body_input" id="GTIN" readonly v-model="document.gtin"></Textfield>
                  </div>
                </div>
                <div class="card_row">
                  <div class="card_column">
                    <label>Текущий владелец</label>
                    <Textfield class="kiz_card_body_input" id="current_owner" readonly v-model="document.currentOwner"></Textfield>
                  </div>
                  <div class="card_column">
                    <label>Текущее местоположение</label>
                    <Textfield class="kiz_card_body_input" id="current_location" readonly v-model="document.currentLocation"></Textfield>
                  </div>
                </div>
              </template>
            </Card>
          </div>
          <div class="kiz_card_body_item">
            <Card :title-size="'16px'">
              <template v-slot:title-text>
                Иерархия
              </template>
              <template v-slot:body-content>
                <div class="kiz_card_body_hierarchy_container">
                  <div  v-for="val, index in document.changedHierarchy" :key="index">
                    <p  v-if="val.barcode">
                      <span>
                        <Icon :iconName="'triangle-right'"
                              :iconFillColor="'black'"
                              :iconStrokeColor="'black'"
                              v-if="barCode === val.barcode"
                        >
                        </Icon>
                      </span>
                      <span> {{ index + 1 }}. </span>
                      <span> {{ val.packageName }} </span>
                      <router-link class="link-to-card" :to="{ name: 'kiz', query: { barCode: val.barcode }}" :class="{ kiz_card_body_hierarchy_container_link: val.barcode !== barCode }">
                        {{ val.barcode }} {{val.currentStatusName === 'MARK_INVALID' ?  `(${val.currentStatusDescription})` : ''}}
                      </router-link>
                    </p>
                    <p v-else>
                      <span>
                        <Icon :iconName="'triangle-right'"
                              :iconFillColor="'black'"
                              :iconStrokeColor="'black'"
                              v-if="barCode === val.barcode"
                        >
                        </Icon>
                      </span>
                      <span> {{ index + 1 }}. </span>
                      <span> {{ val.packageName }} </span>
                      <span @click="openModal(val.packageName, val.data)"  v-if="val.data"><span :class="'kiz_card_body_hierarchy_container_link'" style="color: black" href="#">Открыть список</span></span>
                    </p>
                  </div>
                </div>
              </template>
            </Card>
          </div>
          <div class="kiz_card_body_item">
            <Card :title-size="'16px'">
              <template v-slot:title-text >
                Последний документ
              </template>
              <template v-slot:body-content>
                <div class="kiz_card_body_lastDocument">
                  <div v-if="document.lastDocument" class="kiz_card_body_lastDocument_container">
                    <div class="kiz_card_body_lastDocument_container_documentId">
                      <router-link class="link-to-card" :to="{ name: pathToDocument(), params: { id: document.lastDocument.updId ?? document.lastDocument.id }, query:{tab: document.lastDocument.updId !== null ? 'tab-2' : 'tab-1'} }">
                        {{ document.lastDocument.transactionId }}
                      </router-link>
                    </div>
                    <div v-if="document.docStatus.statusName"
                         class="kiz_card_body_lastDocument_container_documentStatus"
                         :style="{ 'background-color': 'white', 'color': document.docStatus.statusColor, 'border-color':  document.docStatus.statusColor }"
                    >
                      <Icon
                        :iconName="document.docStatus.statusIconName"
                        :iconFillColor="document.docStatus.statusColor"
                        :iconStrokeColor="document.docStatus.statusColor"
                      ></Icon>
                      <div>{{ document.lastDocument.docStatusDescription }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
          <div class="kiz_card_body_item">
            <Card v-if="document">
              <template v-slot:title-text>
                История
              </template>
              <template v-slot:body-content>
                <div style="padding: 0 10px">
                  <TableKIZ :headers="kizHeaders"
                            :rows="document.rows"
                            :loading="loading"
                  >
                  </TableKIZ>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </Card>

    <ModalWindow v-model="showModal">
      <template v-slot:modalBody>
        <div class="kiz_modal_container" style="max-height: 300px;">
          <div v-for="item, indexItem in modalValue" :key="indexItem">
            <p>
              <span> {{ indexItem + 1 }}. </span>
              <span> {{ item.packageName }} </span>
              <router-link @click="showModal = false" class="link-to-card" :to="{ name: 'kiz', query: { barCode: item.barcode }}"
                           v-if="item.barcode"
                           :class="{ kiz_card_body_hierarchy_container_link: item.barcode !== barCode }"
              >
                {{ item.barcode }}
              </router-link>
            </p>
          </div>
        </div>
      </template>
    </ModalWindow>
  </div>
</template>

<script>

  import moment from 'moment/moment'

  export default {
    name: "KIZ",
    data(){
      return{
        document: null,
        findBarcode: '',
        barCode: '',
        message: '',
        loading: false,
        showModal: false,
        modalTitle: '',
        modalValue: []
      }
    },
    created() {
      this.$watch(
        () => this.$route.query,
        () => {
          this.fetchData()
        },
        { immediate: true }
      )
    },
    computed:{
      kizHeaders(){
        return this.$store.getters['headers/kizHeaders']
      }
    },
    methods: {
      async updateInGIS() {
        this.$refs.contextButton.opened = false
        const dateTime = new Date()
        const obj = {
          transactionId: "mark-check-gui_"+moment(dateTime).format('YYYY-MM-DD_HH:MM:SS'),
          objectCode: this.document.currentObjectCode,
          dateTime: moment(dateTime).format('YYYY-MM-DDTHH:MM:SS'),
          details: [
            {
              lineNum: 1,
              markInfoList: [
                {
                  markCode: this.barCode
                }
              ]
            }
          ]

        }
        await this.$store.dispatch('kiz/updateInGIS', obj)
      },
      openModal(title, value){
        this.modalTitle = title
        this.modalValue = value
        this.showModal = true
      },
      pathToDocument(){
        let path = ""
        let type = this.document.lastDocument.updDocTable ?? this.document.lastDocument.docType
        switch (type){
          case 'external_incoming_docs':
            path = `directDeliveriesById`
            break
          case 'intragroup_transactions_docs':
            path = `groupOperationsById`
            break
          case 'mark_introduce_docs':
            path = `commissioningById`
            break
          case 'mark_leaving_docs':
            path = `leavingById`
            break
          case 'incoming_docs':
            path = `incomingById`
            break
          case 'aggregation_docs':
            path = `aggregationById`
            break
          case 'external_shipment_docs':
            path = `externalShipmentById`
            break
          case 'external_return_docs':
            path = `externalReturnById`
            break
          case 'reconciliation_docs':
            path = `reconciliationById`
            break
        }
        return path
      },
      async fetchData(){
        this.$route.query
        if (this.$route.query.barCode){
          this.loading = true
          this.message = ''
          this.barCode = this.$route.query.barCode
          await this.$store.dispatch('kiz/kizByBarCode', this.barCode)
          this.document = this.$store.getters['kiz/selectedKiz']
          if ( !this.document ) {
            this.message = `Марка с кодом ${this.barCode} не найдена`
            this.$refs.searchbar.$el.firstChild.focus()
          }
          this.loading = false
        } else {
          this.document = null
          this.message = ''
        }
      },
      findMark(){
        if (this.$route.params.barCode === this.findBarcode) {
          this.fetchData()
        } else {
          this.$router.push( { name: 'kiz', query: { barCode: this.findBarcode } } )
        }
      }
    }
  }
</script>

<style lang="scss" src="./KIZ.scss" scoped></style>
