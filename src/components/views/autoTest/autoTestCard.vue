<template>
  <div class="grid_card">
    <GridCard :gridCardType="false" :status="document && document.status ? document.status : {}">
      <template v-slot:grid-card-header_title>
        <div v-if="document && document.autoTestId">
          <span class="grid_card_span">Идентификатор: {{ document.autoTestId }}</span>
        </div>
        <div v-else>
          <span class="grid_card_span">Идентификатор: нет данных</span>
        </div>
      </template>
      <template v-if="document" v-slot:grid-card-body>
        <Card>
          <template v-slot:title-text>
            Команды
          </template>
          <template v-slot:card-title-button>
            <ContextMenuButton :colorDotts="'black'">
              <template v-slot:menu_item="{close}">
                <li @click="() => {
                  close()
                  startFullTestById()
                }">
                  Запустить сценарий целиком
                </li>
                <li @click="() => {
                  close()
                  edit()
                }">
                  Редактировать сценарий
                </li>
                <li @click="() => {
                  close()
                  openDuplicateModal()
                }">
                  Пересоздать сценарий
                </li>
                <li @click="() => {
                  close()
                  openModalSaveSample()
                }">
                  Сохранить как шаблон
                </li>
              </template>
            </ContextMenuButton>
          </template>
          <template v-slot:card-body>
            <tableCustom style="margin: 10px"
            :headers="headers"
            :rows="document.rows"
            >
              <template v-slot:rowContent="{ paginatedData, align, findColumnByIndex }">
                  <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center" :class="{selected: selectedLineIndex === indexRow}" v-for="row, indexRow in paginatedData">
                    <td class="resp-tab_cell resp-tab_cell_first" @click="startTestByIndex(row.cols[0])">
                      <div style="display:flex; justify-content: center; padding-bottom: 10px; margin-left: -15px;">
                        <Icon :iconName="'play'"
                              :iconFillColor="'rgb(0, 150, 136)'"
                              :iconStrokeColor="'rgb(0, 150, 136)'"
                              :no_border="true"
                              :width="'30'"
                              :height="'30'"
                              :widthContainer="'auto'"
                              :heightContainer="'auto'"
                        >
                        </Icon>
                      </div>
                    </td>
                    <td @click="openTestInfo(indexRow+1)" class="resp-tab_cell" v-for="(col, indexCol) in row.cols" :key="indexCol" :align="align(indexCol)">
                      <div style="display: flex; width: 150px; padding-left: 20px" v-if="findColumnByIndex('Статус', headers) === indexCol + 1">
                        <Icon
                          :iconName="row.status.statusIconName"
                          :iconFillColor="row.status.statusColor"
                          :iconStrokeColor="row.status.statusColor"
                        ></Icon>
                        <div style="display: flex; margin-left: 12px; text-align: left;  align-items: center; width: 100%" :style="{'color': row.status.statusColor}">{{col.value}}</div>
                      </div>
                      <div v-else>
                        <slot :data="col" :name="'td_'+indexCol">
                          {{col.value}}
                        </slot>
                      </div>
                    </td>
                  </tr>
              </template>
            </tableCustom>
          </template>
        </Card>
        <Card style="margin-top: 10px" v-if="autoTestInfo && !loading_history">
          <template v-slot:title-text>
            <div class="grid_card_title">
              <div class="grid_card_title_item">
                <div style="display: flex; flex-direction: column">
                  <span style="text-transform: uppercase; font-size: 20px; font-weight: 400; padding-bottom: 5px">Лог выполнения команды</span>
                  <span style="padding-bottom: 5px"><span style="text-transform: uppercase; font-size: 16px">
                    Команда:
                  </span>
                    {{autoTestInfo.commandName}}</span>
                </div>
                <div>
                  <span class="grid_card_span">
                    <span style="text-transform: uppercase; font-size: 16px;">
                      Содержание:
                    </span>
                    {{autoTestInfo.commandContent}}
                  </span>
                </div>
              </div>
              <div class="grid_card_title_item">
                <div :style="{ color: autoTestInfo.status.statusColor, border: 'none', 'background-color': 'inherit' }" class="grid_card_title_status">
                  <div style="display: flex; align-items: center">
                    <slot name="grid-card-header_status">
                      <Icon :iconName="autoTestInfo.status.statusIconName"
                            :iconFillColor="autoTestInfo.status.statusColor"
                            :iconStrokeColor="autoTestInfo.status.statusColor">
                      </Icon>
                      <div>
                        <span>{{ autoTestInfo.status.statusDescription }}</span>
                      </div>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:card-body>
            <tableCustom style="margin: 10px"
                         :headers="autoTestCommand"
                         :rows="autoTestInfo.rows ?? []"
                         :firstCellEnabled="false"
            >
              <template v-slot:rowContent="{ paginatedData, align, findColumnByIndex }">
                <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center" v-for="row, indexRow in paginatedData">
                  <td class="resp-tab_cell" v-for="(col, indexCol) in row.cols" :key="indexCol" :align="align(indexCol)">
                    <div style="display: flex; gap: 10px; align-items: center; color: rgb(0, 150, 136); cursor: pointer" v-if="findColumnByIndex('Документ', autoTestCommand) === indexCol">
                      <i class="material-icons" v-if="col.value.id && col.value.type">description</i>
                      <router-link :to="{ path: goToDocument(col.value.id, col.value.type) }"  v-if="col.value.id && col.value.type">
                        <span>{{col.value.transactionId}}</span>
                      </router-link>
                    </div>
                    <div @click="openModal(col.value)" style="display: flex; width: 150px; padding-left: 20px" v-else-if="findColumnByIndex('Исходящие сообщение', autoTestCommand) === indexCol && col.value">
                      <div class="link-to-card" style="display:flex; gap: 10px; align-items: center; cursor: pointer; color: rgb(0, 150, 136);">
                        <i class="material-icons">description</i>
                        <span style="text-decoration: underline">Открыть</span>
                      </div>
                    </div>
                    <div style="display: flex; width: 150px; padding-left: 20px" v-else-if="findColumnByIndex('Статус документа', autoTestCommand) === indexCol">
                      <Icon v-if="row.status"
                        :iconName="row.status.statusIconName"
                        :iconFillColor="row.status.statusColor"
                        :iconStrokeColor="row.status.statusColor"
                      ></Icon>
                      <div v-if="row.status" style="display: flex; margin-left: 12px; text-align: left;  align-items: center; width: 100%" :style="{'color': row.status.statusColor}">{{col.value}}</div>
                    </div>
                    <div v-else>
                      <slot :data="col" :name="'td_'+indexCol">
                        {{col.value}}
                      </slot>
                    </div>
                  </td>
                </tr>
              </template>
            </tableCustom>
          </template>
        </Card>
        <Card style="margin-top: 10px" v-show="!autoTestInfo && !loading_history"
        :titleShowDisable="true"
        >
          <template v-slot:card-body>
            <div style="margin-top: auto; margin-bottom: auto; padding-left: 5px; font-size: 20px;">
              <span>
                Выберите команду для просмотра
              </span>
            </div>
          </template>
        </Card>
      </template>
    </GridCard>
    <ModalWindow v-model="opened">
      <template v-slot:header>
        <div class="mdl-card__title-text" style="margin-right: auto">Исходящее сообщение</div>
      </template>
      <template v-slot:modalBody>
        <div>
          {{modalInfo}}
        </div>
      </template>
    </ModalWindow>
    <ModalWindow v-model="modalDuplicateAutotestOpened">
      <template v-slot:header>
        <div class="mdl-card__title-text" style="margin-right: 100px">Наименование сценария</div>
      </template>
      <template v-slot:modalBody>
        <div>
          <div>
            <Textfield v-model="duplicateAutotestName"></Textfield>
          </div>
          <button @click="saveDuplicateModal" style="float: right" id="save" class="mdl-button mdl-js-button mdl-button--raised button">
            Сохранить
          </button>
        </div>
      </template>
    </ModalWindow>
    <ModalWindow v-model="modalSampleNameOpened">
      <template v-slot:header>
        <div class="mdl-card__title-text" style="margin-right: 100px">Наименование шаблона</div>
      </template>
      <template v-slot:modalBody>
        <div>
          <div>
            <Textfield v-model="sampleName"></Textfield>
          </div>
          <button @click="saveSample" style="float: right" id="saveSample" class="mdl-button mdl-js-button mdl-button--raised button">
            Сохранить
          </button>
        </div>
      </template>
    </ModalWindow>
    <AutoTestModal
      :opened="modalEditOpened"
      :title="'Редактирование сценария'"
      :mode="'edit'"
      :script="editedData"
      @close="modalEditOpened = false"
      @deleteRow="editDeleteRow"
      @addCommand="editAddRow"
      @save="editSave"
      @changeSorting="editChangeSorting"
    />

  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  import moment from "moment/moment"
  import AutoTestModal from 'components/views/autoTest/autoTestModal/autoTestModal'

  export default {
    name: "autoTestCard",
    components: {AutoTestModal},

    data(){
      return {
        loading_history: false,
        selectedLineIndex: null,
        opened: false,
        modalInfo: null,
        modalDuplicateAutotestOpened: false,
        modalSampleNameOpened: false,
        duplicateAutotestName: '',
        sampleName: '',
        modalEditOpened: false,
        editedData: {}
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
            this.$store.dispatch('documents/autoTest/clearDocument')
            await this.$store.dispatch('documents/autoTest/getAutotestById', parseInt(this.$route.params.id))
          }
        },
        { immediate: true }
      )
    },
    computed: {
      ...mapGetters({ document: 'documents/autoTest/document' }),
      ...mapGetters({ headers: 'headers/autoTestListDetail' }),
      ...mapGetters({ autoTestCommand: 'headers/autoTestCommand' }),
      ...mapGetters({ autoTestInfo: 'documents/autoTest/documentInfo' }),
    },
    methods: {
      openModalSaveSample(){
        this.sampleName = ''
        this.modalSampleNameOpened = true
      },
      async saveSample(){
        if (this.sampleName){
          let commands = this.document.commands.map(command => {
            return {
              index: command.indexInTest,
              commandId: command.commandId,
              commandContent: command.commandContent
            }
          })
          await this.$store.dispatch('documents/autoTest/createSample', {sampleName: this.sampleName, commands: commands})
          await this.$store.dispatch('documents/autoTest/getAutotestSamples', {})
          this.$router.push('/autoTest')
        } else {
          this.$store.dispatch('setMessage', 'Введите название шаблона')
        }

      },
      edit(){
        this.editedData = {
          autoTestName: this.document ? this.document.autoTestId : '',
          commands: this.document ?  this.document.commands.map(command => {
            return {
              index: command.indexInTest,
              value: {
                id : command.commandId,
                content: command.commandContent,
                name: command.commandName
              }
            }
          }) : []
        }
        this.modalEditOpened = true
      },
      editDeleteRow(index){
        this.editedData.commands.splice(index -1, 1)
      },
      editAddRow(){
        this.editedData.commands.push({
          index: this.editedData.commands.length + 1,
          value: {}
        })
      },
      async editSave() {
        if (this.document.statusName !== 'AUTOTEST_IN_PROGRESS') {
          this.$store.dispatch('documents/autoTest/changeAutoTest', {
            id: this.document.id,
            commands: this.editedData.commands
          })
          this.modalEditOpened = false
        } else {
          this.$store.dispatch('setMessage', 'Не возможно изменить запущенный сценарий!')
        }
      },
      editChangeSorting(array){
        this.editedData.commands = array
      },
      async saveDuplicateModal() {
        let data = this.document.commands.map(command => {
          return {
            index: command.indexInTest,
            commandId : command.commandId,
            commandContent: command.commandContent
          }
        })
        this.modalDuplicateAutotestOpened = false
        this.$store.dispatch('documents/autoTest/createAutoTest', { autotestName: this.duplicateAutotestName, commands: data })
        await this.$store.dispatch('documents/autoTest/getAutotests', {})
        this.$router.push('/autoTest')
      },
      openDuplicateModal(){
        this.duplicateAutotestName = ''
        this.modalDuplicateAutotestOpened = true
      },
      startFullTestById(){
        this.$store.dispatch('documents/autoTest/startFullAutotest', {id: parseInt(this.$route.params.id)})
      },
      startTestByIndex(index){
        this.$store.dispatch('documents/autoTest/startAutoTestByIndex', {id: parseInt(this.$route.params.id), index: index.value})
      },
      goToDocument(id, type){
        let path = ''
        switch (type){
          case 'intragroup_transactions_docs':
            path = `/upd/groupOperations/${id}`
            break
          case 'external_incoming_docs':
            path = `/upd/directDeliveries/${id}`
            break
          case 'aggregation_docs':
            path = `/aggregation/${id}`
            break
          case 'mark_leaving_docs':
            path = `/leaving/${id}`
            break
          case 'mark_issue_docs':
            path = `/suz/${id}`
            break
          case 'mark_introduce_docs':
            path = `/commissioning/${id}`
            break
          case 'external_return_docs':
            path = `/external-return/${id}`
            break
          case 'incoming_docs':
            path = `/incoming/${id}`
            break
          case 'reconciliation_docs':
            path = `/reconciliation/${id}`
            break
          case 'external_shipment_docs':
            path = `/external-shipment/${id}`
            break
        }
        return path
      },
      openModal(info){
        this.modalInfo = info
        this.opened = true
      },
      async openTestInfo(index){
        this.loading_history = true
        this.selectedLineIndex = index - 1
        await this.$store.dispatch('documents/autoTest/getAutotestInfoByIdAndIndex', {id: parseInt(this.$route.params.id), index: index})
        this.loading_history = false
      }
    },
    beforeMount() {
      this.$store.commit('documents/autoTest/clearDocumentInfo')
    },
  }
</script>

<style lang="scss" src="./autoTestCard.scss" scoped></style>
