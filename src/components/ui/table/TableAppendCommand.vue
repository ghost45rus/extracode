<template>
  <TableCustom
    ref="tableCustom"
    style="height: 400px; overflow-y: auto"
    :rows="commandsList"
    :pagination="false"
    :loading="false"
    :headers="headers"
    :firstLoadingDisabled="true"
    :fixedHead="true"
  >
    <template v-slot:tbody="{ paginatedData, align, findColumnByIndex }">
      <draggable
        handle=".handle"
        v-model="commandsList"
        tag="tbody"
        @start="drag=true"
        @end="drag=false"
        @sort="onSort"
        item-key="index">
        <template #item="{element}">

          <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center">
            <td class="resp-tab_cell">
              {{element.index}}
            </td>
            <td class="resp-tab_cell">
              <div class="test" style="width: 250px">
                <DropDownMenuInput :id="`command + ${element.index}`" v-model="element.value" :items="commands">
                </DropDownMenuInput>
              </div>
            </td>
            <td class="resp-tab_cell" >
              <div class="test" style="width: 800px">
                <TextfieldArea class="textfieldArea"  v-model:changedValue="element.value.content" :modelValue="element.value.sample" :rows="3"></TextfieldArea>
              </div>
            </td>
            <td class="resp-tab_cell" style="cursor: pointer" @click="deleteRow(element.index)">
              <div style="display:flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px">
                <Icon class="handle"
                      :iconName="'anchor'"
                      :iconFillColor="'rgb(0, 150, 136)'"
                      :iconStrokeColor="'rgb(0, 150, 136)'"
                      :no_border="true"
                >
                </Icon>
                <Icon
                  :iconName="'delete'"
                  :iconFillColor="'rgb(0, 150, 136)'"
                  :iconStrokeColor="'rgb(0, 150, 136)'"
                  :iconStrokeWidth="'9'"
                  :no_border="true"
                >
                </Icon>
              </div>
            </td>
          </tr>
        </template>
      </draggable>
    </template>
    <template v-slot:notFoundRow>
      <div></div>
    </template>
  </TableCustom>
</template>

<script>

import TableCustom from 'components/ui/table/TableCustom'
import { mapGetters } from 'vuex'
import DropDownMenuInput from 'components/ui/dropDownMenu/dropDownMenuInput'
import TextfieldArea from 'components/ui/textfield/TextfieldArea'
import draggable from 'vuedraggable'
import Icon from 'components/ui/Icon/Icon'

export default {
  name: "TableAppendCommand",

  data(){
    return {
      drag: false,
      commandsList: this.rows
    }
  },

  watch:{
    rows(newValue){
      this.commandsList = newValue
    }
  },

  methods:{
    onSort(){
      this.$emit('changeSorting', this.commandsList)
    },
    deleteRow(index){
      this.$emit('deleteRow', index)
    },
  },

  beforeMount() {
    this.$store.dispatch('documents/autoTest/getAutoTestCommands')
  },

  computed:{
    ...mapGetters({ commands: 'documents/autoTest/commands' }),
  },

  props:{
    headers: {
      type: Array,
      default: () => [],
      required: true
    },
    rows: {
      type: Array,
      default: () => [],
      required: true
    }
  },

  components:{
    TableCustom,
    DropDownMenuInput,
    TextfieldArea,
    draggable,
    Icon
  }
}
</script>

<style lang="scss" scoped>

.test :deep(.root){
  padding: 0;
  label:after{
    bottom: -1px;
  }
}

.test{
  display: flex;
  min-height: 70px;
  align-items: center;
}

</style>
