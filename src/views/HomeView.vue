<script setup lang="ts">
import BoxGrid from '@/components/BoxGrid.vue'
import { ref } from 'vue'

const cursorColour: String = ref<String>('#F1F5F9')
</script>

<template>
  <div class="overflow-hidden" @wheel.prevent @touchmove.prevent @scroll.prevent @keyup.up.prevent>
    <BoxGrid
      class="overflow-hidden"
      :canvas-size="101"
      :cell-size="40"
      v-model:cursor-colour="cursorColour"
    />
  </div>
</template>
