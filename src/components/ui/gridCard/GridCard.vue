<template>
    <div :class="{ grid_card_wrapper: loading }">
      <Progress v-show="loading" id="mdl-progress-card" indeterminate></Progress>
      <div v-if="!loading" :class="'grid_card'">
        <Card :titleSize="'20px'">
          <template v-slot:title-text>
            <div class="grid_card_title">
              <div class="grid_card_title_item" v-if="buttonBack">
                <button class="grid_card_title_button" @click="backToList">
                  <i class="material-icons">chevron_left</i>
                   назад
                </button>
              </div>
              <div class="grid_card_title_item">
                <div style="text-transform: uppercase; font-size: 20px;">
                  <slot name="meta-title">
                    <span>{{this.$route.meta.title}}</span>
                  </slot>
                </div>

                <slot name="grid-card-header_title">
                </slot>
              </div>
              <div class="grid_card_title_item">
                <div v-if="!defaultStatus" class="grid_card_title_status" :class="status ? `grid_card_title_status_${status.statusColor}` : ''">
                  <div style="display: flex; align-items: center">
                    <slot name="grid-card-header_status">
                      <Icon :iconName="status.statusIconName"
                            :iconFillColor="'white'"
                            :iconStrokeColor="'white'">
                      </Icon>
                      <div v-if="status&& status.statusDescription"><span>{{ status.statusDescription }}</span></div>
                      <div v-else><span>нет данных</span></div>
                    </slot>
                  </div>
                </div>
                <div v-else class="grid_card_title_status" style="color: black">
                  <div style="display: flex; align-items: center">
                    <slot name="grid-card-header_status">
                      <div v-if="status && status.statusDescription"><span>{{ status.statusDescription }}</span></div>
                      <div v-else><span>нет данных</span></div>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:card-title-button>
            <slot name="grid-card-title-button"></slot>
          </template>
          <template v-slot:supporting-text>
          </template>
          <template v-slot:body-content>
            <div :class="'grid_card_type'" v-if="gridCardType">
              <div :class="'grid_card_type_header'">
                <div :class="'grid_card_type_header_row'">
                  <h2>Тип документа</h2>
                  <div :class="'grid_card_type_header_text'">
                    <slot name="grid-card-type"></slot>
                  </div>
                </div>
              </div>
              <slot name="grid-card-status">
              </slot>
            </div>
            <slot name="grid-card-header"></slot>
            <slot name="grid-card-body"></slot>
          </template>
        </Card>
      </div>
    </div>
</template>

<script>

  import { useRouter, useRoute } from 'vue-router'

  export default {
    name: "GridCard",
    data(){
      return {}
    },
    setup(){
      const router = useRouter()
      const route = useRoute()
      return { router, route }
    },
    computed:{
      loading(){
        return this.$store.getters.loading
      },
    },
    methods:{
      backToList(){
        if ( this.route.name === "externalReturnById" ) {
          this.router.go(-1)
        } else {
          const pathToList = this.route.path.replace(/\/\w+$/, '')
          this.router.push({ path: pathToList })
        }
      },
    },
    props:{
      buttonBack: {
        type: Boolean,
        default: true,
        required: false
      },
      gridCardType: {
        type: Boolean,
        default: true,
        required: false
      },
      status: {
        type: Object,
        required: false,
        default: {}
      },
      defaultStatus: {
        type: Boolean,
        required: false,
        default: false,
      }
    }
  }
</script>

<style src="./GridCard.scss" lang="scss">

</style>
