<template>
  <div class="mdl-tabs is-upgraded">
    <!-- Generated tab links -->
    <div class="mdl-tabs__tab-bar">
      <tab-link
          class="mdl-tabs__tab"
          v-for="tab in tabs"
          :key="tab.id"
          :no-ripple-effect="noRippleEffect"
          :class="{ 'is-active': isSelected(tab) }"
          @click="selectTab(tab)"
          :tab="tab"
      ></tab-link>
    </div>
    <!-- Tabs content -->
    <slot></slot>
  </div>
</template>

<script>
  import TabLink from './TabLink.vue'

  // indexOf with object
  function findTabIndex (tabs, id) {
    for (let i = 0; i < tabs.length; ++i) {
      if (tabs[i].id === id) {
        return i
      }
    }
    return -1
  }

  export default {
    name: 'Tabs',
    props: {
      modelValue: {
        required: false,
        type: [String, Number]
      },
      noRippleEffect: {
        type: Boolean,
        required: false
      }
    },
    emits: ['update:modelValue'],
    data () {
      return {
        tabs: []
      }
    },
    methods: {
      selectTab ({id}) {
        this.$emit('update:modelValue', id)
      },
      isSelected ({id}) {
        return id === this.modelValue
      },
      addTab (tab) {
        this.tabs.push(tab)
      },
      updateTab ({id}, tab) {
        const index = findTabIndex(this.tabs, id)
        if (index > -1) this.tabs.splice(index, 1, tab)
      },
      removeTab ({id}) {
        const index = findTabIndex(this.tabs, id)
        if (index > -1) this.tabs.splice(index, 1)
      }
    },
    components: {TabLink}
  }
</script>
