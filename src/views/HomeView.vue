<script setup lang="ts">
import BoxGrid from '@/components/BoxGrid.vue'
</script>

<template>
  <div class="overflow-hidden" @wheel.prevent @touchmove.prevent @scroll.prevent @keyup.up.prevent>
    <BoxGrid
      class="overflow-hidden"
      :canvas-size="101"
      :cell-size="40"
      cursor-colour="bg-slate-100"
    />
  </div>
</template>
