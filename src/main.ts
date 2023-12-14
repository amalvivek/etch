import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars, faGear, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faPalette, faPaintBrush } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faBars, faGear, faMagnifyingGlassPlus, faMagnifyingGlassMinus, faPalette, faPaintBrush)

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
