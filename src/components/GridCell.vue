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

const state = reactive({
  id: props.cellData.index,
  colour: props.cellData.colour,
  active: props.cellData.isActive
})

const cell = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (active.value && cell.value) {
    const cellRect = cell.value.getBoundingClientRect()
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    const scrollX = cellRect.left - centerX
    const scrollY = cellRect.top - centerY

    window.scrollBy({
      left: scrollX,
      top: scrollY,
      behavior: 'smooth'
    })
  }
})

const { id, colour, active } = toRefs(state)
</script>

<template>
  <div class="h-full w-full border" :class="active ? `bg-gray-200` : colour">
    {{ id }}
  </div>
</template>

<style></style>
