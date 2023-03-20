import App from './App.vue'
import router from './router'
import store from './store'
import { createApp } from 'vue'
import UI from 'components/ui'

const app = createApp(App)

UI.forEach(component => {
  app.component(component.name, component)
})

app.use(router)
app.use(store)

app.mount('#app')
