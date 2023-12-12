<script setup lang="ts">
/* __placeholder__ */
import type { CellData } from '@/shared.types'
import { toRefs, type PropType, ref, onMounted, reactive } from 'vue'

const props = defineProps({
  cellData: {
    type: Object as PropType<CellData>,
    required: true
  }
})

const { x, y, colour, isActive } = toRefs(props.cellData)
</script>

<template>
  <div class="h-full w-full border" :class="colour">
    <div v-if="isActive" class="h-full w-full blink_me bg-slate-100"></div>
  </div>
</template>

<style>
.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
