<script setup lang="ts">
import BoxGrid from '@/components/BoxGrid.vue'
import OptionsContainer from '@/components/OptionsContainer.vue'
import type { Cursor } from '@/shared.types'
import { invertHex } from '@/shared.utils'
import { ref, type Ref } from 'vue'
import { uuid } from 'vue-uuid'
// todo: clear
const cursorColour: Ref<Cursor> = ref<Cursor>({
  colour: '#F1F5F9',
  outline: invertHex('#F1F5F9')
})

const grid = ref<InstanceType<typeof BoxGrid>>(null as never)

const toggleZoom = () => {
  grid.value.toggleZoom()
}

const toggleColourPicker = () => {
  grid.value.toggleColourPicker()
}

const gridKey = ref<string>(uuid.v4())

const updateKey = () => {
  gridKey.value = uuid.v4()
}
</script>

<template>
  <div class="overflow-hidden" @wheel.prevent @touchmove.prevent @scroll.prevent @keyup.up.prevent>
    <BoxGrid
      class="overflow-hidden"
      :canvas-size="101"
      :cell-size="40"
      v-model:cursor-colour="cursorColour"
      ref="grid"
      :key="gridKey"
    />
    <OptionsContainer
      @zoom="toggleZoom"
      @showColourPicker="toggleColourPicker"
      @clear="updateKey"
    />
  </div>
</template>
