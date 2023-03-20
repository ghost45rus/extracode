<template>
  <div class="mdlCardContainer mdl-card mdl-shadow--2dp mdl-card-container">
    <slot name="card-title" v-if="!titleShowDisable">
      <div class="mdl-card__title mdlCard__title">
        <h2 class="mdl-card__title-text" :style="{fontSize: titleSize}">
          <slot name="title-text"></slot>
        </h2>
        <slot name="card-title-button"></slot>
      </div>
    </slot>
    <slot name="card-supporting-text" v-if="cardSupportingText">
      <div class="mdl-card__supporting-text">
        <slot name="supporting-text"></slot>
      </div>
    </slot>
    <slot name="card-body">
      <div class="overflowVisible mdl-card__actions mdl-card--border">
          <slot name="body-content"></slot>
      </div>
    </slot>
  </div>
</template>

<script>
    export default {
        name: "Card",
        props: {
          titleShowDisable:{
            type: Boolean,
            default: false,
          },
          titleSize:{
            type: String,
            default: '24px'
          },
          titleCenter:{
            type: Boolean,
            default: false,
          },
          cardSupportingText: {
            type: Boolean,
            default:  false
          }
        }
    }
</script>

<style lang="scss" src="./Card.scss" scoped></style>
