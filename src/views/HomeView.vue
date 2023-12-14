<script setup lang="ts">
import BoxGrid from '@/components/BoxGrid.vue'
import OptionsContainer from '@/components/OptionsContainer.vue'
import type { Cursor } from '@/shared.types'
import { invertHex } from '@/shared.utils'
import { ref, type Ref } from 'vue'

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
</script>

<template>
  <div class="overflow-hidden" @wheel.prevent @touchmove.prevent @scroll.prevent @keyup.up.prevent>
    <BoxGrid
      class="overflow-hidden"
      :canvas-size="101"
      :cell-size="40"
      v-model:cursor-colour="cursorColour"
      ref="grid"
    />
    <OptionsContainer @zoom="toggleZoom" @showColourPicker="toggleColourPicker" />
  </div>
</template>
