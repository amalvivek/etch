import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faGear, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faPalette, faPaintBrush, faEraser, faArrowLeft, faSliders, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faBars, faGear, faMagnifyingGlassPlus, faMagnifyingGlassMinus, faPalette, faPaintBrush, faEraser, faArrowLeft, faSliders, faMinus, faPlus )

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router(''))

app.mount('#app')
