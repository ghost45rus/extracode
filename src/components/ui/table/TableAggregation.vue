<template>
  <TableDocumentsList
    :rows="rows"
    :headers="aggregationHeaders"
    :loading="loading"
    :pagination="true"
    :firstLoadingDisabled="true"
    :typeDoc="typeDoc"
  >
    <template v-slot:firstCell="{ row }">
      <router-link class="link-to-card" :to="{ name: 'aggregationById', params: { id: row.id }}">
        <i class="material-icons">description</i>
      </router-link>
    </template>
    <template v-slot:notFoundRow>
      <td :colspan="aggregationHeaders.length + 1" style="padding: 10px; font-size: 20px;">
        Документы агрегации не найдены
      </td>
    </template>
  </TableDocumentsList>
</template>

<script>

  export default {
    name: "TableAggregation",

    computed: {
      aggregationHeaders() {
        return this.$store.getters['headers/aggregationHeaders']
      }
    },

    methods:{
      align(index){
        return this.aggregationHeaders[index].textAlign
      },
    },

    props: {
      typeDoc:{
        type: String,
        required: false,
        default: ''
      },
      rows: {
        type: Array,
        default: []
      },
      loading: {
        type: Boolean
      },
    }
  }
</script>
