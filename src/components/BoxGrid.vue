<script setup lang="ts">
import { ref, onMounted, computed, type ComponentPublicInstance } from 'vue'
import GridCell from './GridCell.vue'
import { type CellData } from '@/shared.types'

const props = defineProps({
  canvasSize: {
    type: Number,
    required: true
  },
  cellSize: {
    type: Number,
    required: true
  }
})

// const canvasSize = 101
// const cellSize = 40
const cellCount = props.canvasSize * props.canvasSize

const activeIndex = ref<number>(Math.floor(cellCount / 2))

const gridData = ref<CellData[]>(
  Array.from({ length: cellCount }, (_, index) => ({
    index: index + 1,
    colour: 'bg-slate-600',
    isActive: index === activeIndex.value
  }))
)

const cellRefs = ref<ComponentPublicInstance[]>([])
const grid = ref<HTMLDivElement | null>(null)

const xCoord = ref<number>(0)
const yCoord = ref<number>(0)

const scrollToCell = (cell: ComponentPublicInstance, grid: HTMLDivElement | null) => {
  if (cell && grid) {
    const gridRect = grid.getBoundingClientRect()
    const cellRect = cell.$el.getBoundingClientRect()

    yCoord.value =
      cellRect.top - gridRect.top + grid.scrollTop - window.innerHeight / 2 + cellRect.height
    xCoord.value =
      cellRect.left - gridRect.left + grid.scrollLeft - window.innerWidth / 2 + cellRect.width

    window.scrollTo({
      top: yCoord.value,
      left: xCoord.value,
      behavior: 'smooth'
    })
  }
}

const onKeyUpAction = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowUp':
      if (activeIndex.value - 101 > 0) {
        gridData.value[activeIndex.value].isActive = false
        activeIndex.value -= 101
        gridData.value[activeIndex.value].isActive = true
        scrollToCell(cellRefs.value[activeIndex.value] as ComponentPublicInstance, grid.value)
      }
      break
    case 'ArrowDown':
      if (activeIndex.value + 101 < cellCount) {
        gridData.value[activeIndex.value].isActive = false
        activeIndex.value += 101
        gridData.value[activeIndex.value].isActive = true
        scrollToCell(cellRefs.value[activeIndex.value] as ComponentPublicInstance, grid.value)
      }
      break
    case 'ArrowLeft':
      if (activeIndex.value - 1 > 0) {
        gridData.value[activeIndex.value].isActive = false
        activeIndex.value -= 1
        gridData.value[activeIndex.value].isActive = true
        scrollToCell(cellRefs.value[activeIndex.value] as ComponentPublicInstance, grid.value)
      }
      break
    case 'ArrowRight':
      if (activeIndex.value + 1 > 0) {
        gridData.value[activeIndex.value].isActive = false
        activeIndex.value += 1
        gridData.value[activeIndex.value].isActive = true
        scrollToCell(cellRefs.value[activeIndex.value] as ComponentPublicInstance, grid.value)
      }
      break

    default:
      break
  }
}

onMounted(() => {
  scrollToCell(cellRefs.value[activeIndex.value] as ComponentPublicInstance, grid.value)
  document.addEventListener('keyup', onKeyUpAction)
})

const gridStyle = computed(() => {
  //   return `transform: translateX(-${translateByX.value}px) translateY(-${translateByY.value}px); grid-template-rows: repeat(${canvasSize.value}, ${cellSize.value}px);  grid-template-columns: repeat(${canvasSize.value}, ${cellSize.value}px); grid-auto-rows: ${cellSize.value}px`
  return `grid-template-rows: repeat(${props.canvasSize}, ${props.cellSize}px);  grid-template-columns: repeat(${props.canvasSize}, ${props.cellSize}px); grid-auto-rows: ${props.cellSize}px`
})
</script>

<template>
  <div class="w-screen h-screen">
    <div
      ref="grid"
      class="absolute grid snap-both snap-mandatory"
      :style="gridStyle"
      @keyup.up.prevent
    >
      <GridCell
        v-for="i in cellCount"
        :key="i"
        :cellData="gridData[i - 1]"
        class="snap-center"
        :ref="(el) => cellRefs.push(el as ComponentPublicInstance)"
      />
    </div>
  </div>
</template>

<style></style>
