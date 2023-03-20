<template>
  <div :class="'grid_card'">
    <Card>
      <template v-slot:title-text>
        <slot name="gridName"></slot>
      </template>
      <template v-slot:body-content>
        <slot name="body-content">
          <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--12-col mdl-grid-filters" v-if="filters">
              <Card>
                <template v-slot:card-title>
                  <div class="mdl-card__title mdlCard__title title_card">
                    <span>Фильтры</span>
                    <div>
                      <slot name="filter-button"></slot>
                    </div>
                  </div>
                </template>
                <template v-slot:body-content style="overflow: auto">
                  <slot name="filters"></slot>
                </template>
              </Card>
            </div>
            <div class="mdl-cell mdl-cell--12-col">
              <div class="mdl-grid-slot">
                <slot name="grid"></slot>
              </div>
            </div>
          </div>
        </slot>
      </template>
    </Card>
  </div>

</template>

<script>
  export default {
      name: "GridLayout",
      components:{
      },
      props:{
        filters:{
          type: Boolean,
          default: false,
          required: false
        }
      }
  }
</script>

<style lang="scss" src="./GridLayout.scss">

</style>
