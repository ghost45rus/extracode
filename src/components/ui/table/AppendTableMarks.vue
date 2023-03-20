<template>
  <div class="appendMarks">
    <TableCustom style="margin: 5px 5px">
      <template v-slot:headers>
        <th v-if="!disableFirstCell" class="resp-tab_cell resp-tab_cell_first_th subtitle_td"></th>
        <th class="resp-tab_cell" v-for="(header, index) in headers" :key="index">{{header.value}}</th>
      </template>
      <template v-slot:rowContent>
        <tr class="resp-tab_tr resp-tab_tr_hover resp-tab_tr_text_align_center" :ref="'tr-'+ row.id + '-' + indexRow" v-for="(row, indexRow) in rows" :key="indexRow" :class="row.status ? `row_color_${row.status.colorClassMark(row.typeExternal ?? row.typeExternal)}` : ''">
          <td v-if="!disableFirstCell" class="resp-tab_cell resp-tab_cell_first subtitle_td" @click="toggleTable({id:row.id, index:indexRow}, headers, row.typeExternal)">
            <div v-if="row.hasChildren">
              <i class="material-icons" :ref="'icon_add-' + row.id + '-' + indexRow">add</i>
              <i class="material-icons hidden_table" :ref="'icon_remove-' + row.id + '-' + indexRow">remove</i>
            </div>
          </td>
          <td class="resp-tab_cell" v-for="(col, indexCol) in row.cols" :key="indexCol">
            <div v-if="indexCol === 0">
              <div class="resp-tab_cell_link" style="justify-content: center">
                <router-link :to="{ name: 'kiz', query: { barCode: col }}">
                  {{ col }}
                </router-link>
              </div>
            </div>

            <div v-else>{{col}}</div>
          </td>
        </tr>
      </template>
    </TableCustom>
  </div>
</template>

<script>

  import appendTableMarks from 'components/ui/table/AppendTableMarks'
  import TableCustom from 'components/ui/table/TableCustom'
  import { Mark } from 'models/marks'
  import MarksService from 'api/marks.service'
  import { createApp } from 'vue'
  import { h } from 'vue'
  import router from '@/router'

export default {

  name: "AppendTable",
  components: {
    appendTableMarks,
    TableCustom
  },
  methods: {
    async toggleTable(object, headers, typeExternal = null){
      if (this.$refs['icon_remove-' + object.id + '-' + object.index][0].classList.contains('hidden_table')){
        this.$refs['icon_remove-' + object.id + '-' + object.index][0].classList.toggle('hidden_table')
        this.$refs['icon_add-' + object.id + '-' + object.index][0].classList.toggle('hidden_table')
        let marks = await MarksService.getMarks(object.id)
        if (marks && marks.data.length) {
          if (document.getElementById(`tr-${object.id}-${object.index}-table`) === null){
            let tr = document.createElement('tr')
            tr.id = `tr-${object.id}-${object.index}-table`
            let td = document.createElement('td')
            td.id = `td-${object.id}-${object.index}-table`
            td.colSpan = headers.length + 1
            let div = document.createElement('div')
            div.id = `div-${object.id}-${object.index}-table`
            td.append(div)
            tr.append(td)
            this.$refs['tr-' + object.id + '-' + object.index ][0].after(tr)
          } else {
            document.getElementById(`tr-${object.id}-${object.index}-table`).classList.remove('hidden_table')
          }
          marks = marks.data.map(mark => {
            const Marka = new Mark(mark)
            // TODO переделать портянку
            if (Marka.status.statusName === 'MARK_TRANSFERRED') {
              Marka.typeExternal = typeExternal
            }
            return Marka
          })
          const App2 = {
            render() {
              return h(appendTableMarks, {
                  headers: headers,
                  rows: marks
              })
            },
            props: [ 'headers', 'rows' ],
          }
          const table = createApp(App2)
          table.use(router)
          table.mount(`#div-${object.id}-${object.index}-table`)
        }
      } else {
        this.$refs['icon_remove-' + object.id + '-' + object.index][0].classList.toggle('hidden_table')
        this.$refs['icon_add-' + object.id + '-' + object.index][0].classList.toggle('hidden_table')
        if (document.getElementById(`tr-${object.id}-${object.index}-table`) !== null){
          document.getElementById(`tr-${object.id}-${object.index}-table`).classList.add('hidden_table')
        }
      }

    },
  },
  props: {
    headers: {
      type: Array,
      default: []
    },
    rows: {
      type: Array,
      default: []
    },
    disableFirstCell: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss">
.appendMarks{
  .resp{
    min-height: 0 !important;
  }
}
</style>
