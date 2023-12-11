<script setup lang="ts">
import { ref, onMounted, computed, type ComponentPublicInstance } from 'vue'
import GridCell from './GridCell.vue'
import type { CellData } from '@/shared.types'
import type { ObjectType } from 'typescript'

const canvasSize = 101
const cellSize = 40
const cellCount = canvasSize * canvasSize

const gridWidth = ref<number>(0)
const gridHeight = ref<number>(0)

const activeIndex = ref<number>(Math.floor(cellCount / 2))

const gridData = ref<CellData[]>(
  Array.from({ length: canvasSize * canvasSize }, (_, index) => ({
    index: index + 1,
    colour: 'bg-slate-600',
    isActive: index === activeIndex.value
  }))
)

const cellRefs = ref<{ [key: string]: ComponentPublicInstance | null | Element }>({})
const grid = ref<HTMLDivElement | null>(null)

const scrollToCell = (cell: ComponentPublicInstance, grid: HTMLDivElement | null) => {
  if (cell && grid) {
    const gridRect = grid.getBoundingClientRect()
    const cellRect = cell.$el.getBoundingClientRect()

    const topOffset =
      cellRect.top - gridRect.top + grid.scrollTop - window.innerHeight / 2 + cellRect.height
    const leftOffset =
      cellRect.left - gridRect.left + grid.scrollLeft - window.innerWidth / 2 + cellRect.width

    console.log(topOffset, leftOffset)

    window.scrollTo({
      top: topOffset,
      left: leftOffset,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  console.log('next line')
  scrollToCell(cellRefs.value['true'] as ComponentPublicInstance, grid.value)

  setElementDimensions('grid')
})

const setElementDimensions = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    gridWidth.value = element.clientWidth
    gridHeight.value = element.clientHeight
  }
}

const translateByX = computed(() => {
  return (gridWidth.value - screen.width) / 2
})

const translateByY = computed(() => {
  return (gridWidth.value - screen.height) / 2
})

const gridStyle = computed(() => {
  //   return `transform: translateX(-${translateByX.value}px) translateY(-${translateByY.value}px); grid-template-rows: repeat(${canvasSize.value}, ${cellSize.value}px);  grid-template-columns: repeat(${canvasSize.value}, ${cellSize.value}px); grid-auto-rows: ${cellSize.value}px`
  return `grid-template-rows: repeat(${canvasSize}, ${cellSize}px);  grid-template-columns: repeat(${canvasSize}, ${cellSize}px); grid-auto-rows: ${cellSize}px`
})
</script>

<template>
  <div class="w-screen h-screen">
    <div ref="grid" class="absolute grid snap-both snap-mandatory" :style="gridStyle">
      <GridCell
        v-for="i in cellCount"
        :key="i"
        :cellData="gridData[i - 1]"
        class="snap-center"
        :ref="(el) => (cellRefs[gridData[i - 1].isActive.toString()] = el)"
      />
    </div>
  </div>
</template>

<style></style>
