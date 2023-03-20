<template>
  <div class="process_status">
    <div class="process_status_grid"
      :class="[{'process_status_grid_4': statuses.length === 4},
               {'process_status_grid_2': statuses.length === 2}]"
    >
      <div v-for="text, ix in labels" :key="ix" class="process_status_grid_text">
        {{text}}
      </div>
      <div v-for="stage, i in statuses" :key="i" class="process_status_grid_circle item-1by1">
        <div class="process_status_grid_circle_content material-icons">
          <span
            class="process_status_grid_circle_content_icon"
            :class="['process_status_grid_circle_content_icon_colored_'+color(stage)]"
          >
            {{stage}}
          </span>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProcessStatusPane',
    props: {
      labels: {
        type: Array
      },
      statuses: {
        type: Array
      },
    },
    methods: {
      color (stage) {
        switch (stage) {
          case 'done':
            return 'green'
            break
          case 'close':
            return 'red'
            break
          case 'warning':
            return 'yellow'
            break
        }
      }
    }
  }
</script>

<style lang="scss" src="./ProcessStatusPane.scss" scoped></style>
