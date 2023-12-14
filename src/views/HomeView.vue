<script setup lang="ts">
import BoxGrid from '@/components/BoxGrid.vue'
import OptionsContainer from '@/components/OptionsContainer.vue'
import { ref, type Ref } from 'vue'

const cursorColour: Ref<string> = ref<string>('#F1F5F9')

const grid = ref<InstanceType<typeof BoxGrid>>(null as never)

const toggleZoom = () => {
  console.log('in homeview zoom')
  grid.value.toggleZoom()
}

const toggleColourPicker = () => {
  console.log('in homeview colour')
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
