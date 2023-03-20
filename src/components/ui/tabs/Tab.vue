<template>
  <div class="mdl-tabs__panel"
       :class="{'is-active': selected }"
  >
    <slot></slot>
  </div>
</template>

<script>
  function tabToOject (tab) {
    return typeof tab === 'string'
        ? { id: tab, title: tab }
        : { id: tab.id || tab.title, ...tab }
  }

  export default {
    name: 'Tab',
    computed: {
      selected () {
        return this.$parent.isSelected(this.tabData)
      },
      id () {
        return typeof this.tab === 'string'
            ? this.tab
            : this.tab.id || this.tab.title
      },
      tabData () {
        return tabToOject(this.tab)
      }
    },
    props: {
      tab: {
        required: true,
        type: [String, Object]
      }
    },
    mounted () {
      this.$parent.addTab(this.tabData)
    },
    beforeUnmount () {
      this.$parent.removeTab(this.tabData)
    }
  }
</script>
