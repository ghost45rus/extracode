<template>
  <div class="filters_buttons">
    <button :id="this.uniqueTooltipFromClearButton" @click="clearFiltrers"  style="padding: 0;" class="filterFlutterButton mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-button--colored button">
      <Icon
        :iconName="'delete-filters'"
        :icon-fill-color="'#fff'"
        :icon-stroke-color="'#000'"
      >
      </Icon>
    </button>
    <Tooltips :target="this.uniqueTooltipFromClearButton !== 'filterClearButton' ? this.uniqueTooltipFromClearButton : 'filterClearButton'">Сбросить фильтры</Tooltips>
    <button :id="this.uniqueTooltipFromFlutterButton" @click="opened = true" style="padding: 0;" class="filterFlutterButton mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-button--colored button">
      <Icon
        :iconName="'filter-funnel'"
        :icon-fill-color="'#fff'"
        :icon-stroke-color="'#fff'"
      >
      </Icon>
    </button>
    <Tooltips :target="this.uniqueTooltipFromFlutterButton !== 'filterFlutterButton' ? this.uniqueTooltipFromFlutterButton : 'filterFlutterButton'">Настроить панель фильтров</Tooltips>
    <button id="filterApplyButton" @click="apply" class="mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-button--colored button">
      Применить
    </button>
    <slot name="buttons">
    </slot>
  </div>
  <ModalWindow v-model="opened">
    <template v-slot:modalBody>
      <div>
        <div class="line">
          <p>Выбрать все</p>
          <label for="selectAll">
            <input id="selectAll" @click="checkAll" type="checkbox" :value="selectAll" :checked="selectAll">
            <span :class="{'input_cheсked': selectAll}"></span>
          </label>
        </div>
        <div v-for="filter, index in filterList" class="line" v-show="filter && filter.name !== 'Тип документа'">
          <p>{{filter.name}}</p>
          <label :for="filter.name + index">
            <input :id="filter.name + index" type="checkbox" :checked="filter.visibility" v-model="filter.visibility" style="width: 20%; background:rgb(0, 150, 136)" @change="saveFilters">
            <span :class="{'input_cheсked': filter.visibility}"></span>
          </label>
        </div>
      </div>
    </template>
  </ModalWindow>
</template>

<script>

import Icon from 'components/ui/Icon/Icon'
import ModalWindow from 'components/ui/modalWindow/ModalWindow'

export default {
  data(){
    return{
      opened: false,
    }
  },

  name: "FilterControlButtons",
  computed: {
    selectAll: function() {
      for (let key of Object.keys(this.filterList)){
        if(!this.filterList[key].visibility && key !== 'doctype'){
          return false
        }
      }
      return true
    }
  },
  methods:{
    checkAll(){
      let keys = Object.keys(this.filterList)
      if (this.selectAll){
        for (let key of keys){
          if(key !== 'doctype'){
            this.filterList[key].visibility = false
          }
        }
      } else {
        for (let key of keys){
          if(key !== 'doctype'){
            this.filterList[key].visibility = true
          }
        }
      }
      this.saveFilters()
    }
  },
  props:{
    clearFiltrers: {
      type: Function
    },
    apply:{
      type: Function
    },
    saveFilters:{
      type: Function
    },
    filterList:{
      type: Object,
      required: true
    },
    uniqueTooltipFromClearButton:{
      type: String,
      default: 'filterClearButton'
    },
    uniqueTooltipFromFlutterButton:{
      type: String,
      default: 'filterFlutterButton'
    },
  },
  components: {
    ModalWindow,
    Icon
  }

}
</script>

<style src="./FilterControlButtons.scss" lang="scss" scoped>

</style>
