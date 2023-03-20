<template>
  <div class="grid_card">
    <GridLayout :filters="false">
      <template v-slot:gridName>
        Модуль автотестирования
      </template>
      <template v-slot:body-content>
        <Tabs no-ripple-effect v-model:modelValue="selected">
          <Tab :tab="{ title: 'Сценарии', id: 'tab-1' }">
            <Card style="margin-top: 10px">
              <template v-slot:card-title>
                <div class="mdl-card__title mdlCard__title title_card">
                  <span>Фильтры</span>
                  <div>
                    <filter-control-buttons
                      :apply="applyFilters"
                      :clearFiltrers="cleanFilters"
                      :filter-list="filters"
                      :saveFilters="saveFilters"
                      :uniqueTooltipFromClearButton="'filterClearButtonScenario'"
                      :uniqueTooltipFromFlutterButton="'filterFlutterButtonScenario'"
                    >
                      <template v-slot:buttons>
                        <ContextMenuButton
                          :color-dotts="'black'"
                        >
                          <template v-slot:menu_item>
                            <li @click="createAutoTest">Создать сценарий</li>
                          </template>
                        </ContextMenuButton>
                      </template>
                    </filter-control-buttons>
                  </div>
                </div>
              </template>
              <template v-slot:body-content style="overflow: auto">
                <AppFilter>
                  <template v-slot:row>
                    <div class="filters_column" v-show="filters.testId.visibility">
                      <Textfield id="testId" :label="filters.testId.name" floatingLabel v-model="filters.testId.value"></Textfield>
                    </div>
                    <div class="filters_column" v-show="filters.testName.visibility">
                      <Textfield id="testName" :label="filters.testName.name" floatingLabel v-model="filters.testName.value"></Textfield>
                    </div>
                    <div class="filters_column" v-show="filters.dateFrom.visibility">
                      <datePicker v-model:value="filters.dateFrom.value" value-type="date" format="DD.MM.YYYY" prefix-class="xmx">
                        <template v-slot:input>
                          <Textfield id="dateFrom" :label="filters.dateFrom.name" floatingLabel readonly v-model="dateFrom"></Textfield>
                        </template>
                      </datePicker>
                    </div>
                    <div class="filters_column filters_column_text" v-show="filters.status.visibility">
                      <dropDownMenuMultiInput :label="filters.status.name" id="status" v-model="filters.status.value" :items="statuses">
                      </dropDownMenuMultiInput>
                    </div>
                  </template>
                </AppFilter>
              </template>
            </Card>
            <TableDocumentsList
              :headers="autoTestHeaders"
              :rows="documents.rows"
              :loading="loading"
              :typeDoc="'autoTest'"
              style="margin-top: 10px"
            >
              <template v-slot:notFoundRow>
                <td style="padding: 10px; font-size: 20px;" :colspan="autoTestHeaders.length + 1">Сценарии не найдены</td>
              </template>
            </TableDocumentsList>
          </Tab>
          <Tab :tab="{ title: 'Шаблоны', id: 'tab-2' }">
            <Card style="margin-top: 10px">
              <template v-slot:card-title>
                <div class="mdl-card__title mdlCard__title title_card">
                  <span>Фильтры</span>
                  <div>
                    <filter-control-buttons :apply="applyFiltersSample" :clearFiltrers="cleanFilters" :filter-list="sampleFilters" :saveFilters="saveFilters">
                    </filter-control-buttons>
                  </div>
                </div>
              </template>
              <template v-slot:body-content style="overflow: auto">
                <AppFilter>
                  <template v-slot:row>
                    <div class="filters_column" v-show="sampleFilters.sampleName.visibility">
                      <Textfield id="sampleName" :label="sampleFilters.sampleName.name" floatingLabel v-model="sampleFilters.sampleName.value"></Textfield>
                    </div>
                  </template>
                </AppFilter>
              </template>
            </Card>
            <TableDocumentsList
              :headers="autoTestListSamples"
              :rows="samples.rows"
              :loading="loading"
              :firstCellEnabled="false"
              :typeDoc="'autoTestSamples'"
              style="margin-top: 10px"
            >
              <template v-slot:td_0="{data}">
              <span :id="`button_edit_${data.value}`" class="material-icons resp-tab_cell_first" @click="openModalEditSample(data.value)">
                description
                </span>
                <Tooltips :target="`button_edit_${data.value}`">Открыть шаблон</Tooltips>
                <span :id="`button_create_${data.value}`" class="material-icons resp-tab_cell_first" @click="openModal(data.value)">
                note_add
                </span>
                <Tooltips :target="`button_create_${data.value}`">Создать экземпляр сценария</Tooltips>
              </template>
              <template v-slot:notFoundRow>
                <td style="padding: 10px; font-size: 20px;" :colspan="autoTestHeaders.length + 1">Сценарии не найдены</td>
              </template>
            </TableDocumentsList>
          </Tab>
        </Tabs>
        <auto-test-modal
          :opened="opened"
          :commands="autoTestRows"
          :mode="'create'"
          @close="opened = false"
          @save="saveAutoTest"
          @changeSorting="changeSorting"
          :title="'Конструктор сценария'"
        />
        <auto-test-modal
          :opened="modalEditSampleOpened"
          :script="sample"
          :mode="'edit'"
          @close="modalEditSampleOpened = false"
          @changeSorting="changeSortingSamples"
          :title="'Редактирование шаблона'">
          <template v-slot:TextField>
            <div v-if="sample">
              <Textfield class="special_titile" :label="'Наименование шаблона'" v-model="sample.sampleName" floatingLabel style="width: 450px !important; margin-left: 5px;">
              </Textfield>
            </div>
          </template>
          <template v-slot:button_save="{save}">
            <button @click="saveSample" class="mdl-button mdl-js-button mdl-button--raised button">
              Сохранить
            </button>
          </template>
        </auto-test-modal>
      </template>
    </GridLayout>
    <ModalWindow v-model="modalOpened">
      <template v-slot:header>
        <div class="mdl-card__title-text" style="margin-right: 100px">Наименование сценария</div>
      </template>
      <template v-slot:modalBody>
        <div>
          <div>
            <Textfield v-model="autoTestName"></Textfield>
          </div>
          <button @click="createAutoTestBySample" style="float: right" id="save" class="mdl-button mdl-js-button mdl-button--raised button">
            Создать
          </button>
        </div>
      </template>
    </ModalWindow>
  </div>
</template>

<script>


import datePicker from 'vue-datepicker-next'
import 'styles/datepicker.scss'
import 'vue-datepicker-next/locale/ru'
import moment from 'moment/moment'
import autoTestModal from "@/components/views/autoTest/autoTestModal/autoTestModal";

import { dateTimeFormat } from 'utils/datetime'



import { mapGetters } from 'vuex'

export default {
  name: "autoTestList",

  data(){
    return {
      loading: false,
      opened: false,
      modalEditSampleOpened: false,
      selected: 'tab-1',
      autoTestName: '',
      modalOpened: false,
      autoTestSampleId: null,
    }
  },

  components:{
    datePicker,
    autoTestModal
  },

  beforeMount() {
    this.$store.dispatch('statuses/getStatuses', 'autotest_docs')
  },

  computed:{
    ...mapGetters({
      autoTestRows: 'documents/autoTest/newAutoTest',
      autoTestListSamples: 'headers/autoTestListSamples',
      autoTestHeaders: 'headers/autoTestList',
      samples: 'documents/autoTest/samples',
      sample: 'documents/autoTest/sample',
      documents: 'documents/autoTest/documents',
    }),
    pagination() {
      return this.$store.getters['pagination/pagination']('autoTest')
    },
    sampleFilters() {
      return this.$store.getters['filters/filters']('autoTestSample')
    },
    filters() {
      return this.$store.getters['filters/filters']('autoTest')
    },
    dateFrom(){
      let date = null
      if (this.filters.dateFrom.value){
        date = dateTimeFormat(this.filters.dateFrom.value, 'date')
      }
      return date
    },
    statuses() {
      return this.$store.getters['statuses/statuses']('autotest_docs')
    }
  },
  methods:{
    changeSortingSamples(newSortedArray){
      this.$store.commit('documents/autoTest/setCommandsSample', newSortedArray)
    },
    changeSorting(newSortedArray){
      this.$store.commit('documents/autoTest/setCommands', newSortedArray)
    },
    async saveSample(){
      if (this.sample.sampleName){
        let commands = this.sample.commands.map(command => {
          return {
            indexInTest: command.index,
            commandId: command.value.commandId ? command.value.commandId : command.value.id,
            commandContent: command.value.content
          }
        })
        await this.$store.dispatch('documents/autoTest/saveChangedSample', {sampleId: this.sample.id, sampleName: this.sample.sampleName, commands: commands})
        this.modalEditSampleOpened = false
      } else {
        this.$store.dispatch('setMessage', 'Введите наименование шаблона!')
      }
    },
    saveAutoTest(name){
      if (name !== ''){
        let data = this.$store.getters['documents/autoTest/newAutoTest']
        if (data.length){
          data = data.map(item => {
            return {
              index: item.index++,
              commandId : item.value.commandId,
              commandContent: item.value.content
            }
          })
        }
        this.$store.dispatch('documents/autoTest/createAutoTest', {autotestName: name, commands: data})
        this.opened = false
      }
      else{
        this.$store.dispatch('setMessage', 'Введите название сценария')
      }
    },
    async openModalEditSample(id){
      await this.$store.dispatch('documents/autoTest/getAutotestSampleById', id)
      this.modalEditSampleOpened = true
    },
    openModal(id){
      this.modalOpened = true
      this.autoTestName = ''
      this.autoTestSampleId = id
    },
    async createAutoTestBySample(){
      if (this.autoTestName !== ''){
        await this.$store.dispatch('documents/autoTest/createAutoTestBySample', {id: this.autoTestSampleId, name: this.autoTestName})
        await this.$store.dispatch('documents/autoTest/getAutotests', {
          dateFrom: moment(new Date()).format('DD-MM-YYYY')
        })
        this.modalOpened = false
        this.selected = 'tab-1'
      } else {
        this.$store.dispatch('setMessage', 'Введите название сценария')
      }
    },
    createAutoTest(){
      this.opened = true
      this.$store.dispatch('documents/autoTest/createNewAutoTest')
    },
    cleanSampleFilters(){
      this.$store.dispatch('filters/cleanFilters', 'autoTestSample')
    },
    cleanFilters(){
      this.$store.dispatch('filters/cleanFilters', 'autoTest')
    },
    saveFilters(){
      this.filters.doctype = { value: 'autoTest', visibility: false, name: 'Тип документа' }
      this.$store.dispatch('filters/saveFilters', this.filters)
    },
    async applyFiltersSample(){
      this.loading = true
      // this.saveFilters()
      await this.$store.dispatch('documents/autoTest/getAutotestSamples', {
        sampleName: this.sampleFilters.sampleName.value ?? null,
      })
      this.loading = false
    },
    async applyFilters(){
      this.loading = true
      this.saveFilters()
      await this.$store.dispatch('documents/autoTest/getAutotests', {
        autoTestId: this.filters.testId.value ?? null,
        autoTestName: this.filters.testName.value ?? null,
        dateFrom: this.filters.dateFrom.value ? moment(this.filters.dateFrom.value).format('DD-MM-YYYY') : null,
        statusIds: this.filters.status.value.length ? this.filters.status.value : null
      })
      this.loading = false
    },
  }
}
</script>

<style src="./autoTestList.scss" lang="scss" scoped>

</style>
