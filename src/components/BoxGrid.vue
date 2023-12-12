<script setup lang="ts">
import { ref, onMounted, computed, type ComponentPublicInstance, type Ref } from 'vue'
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

const cellCount = props.canvasSize * props.canvasSize

// const activeIndex = ref<number>(Math.floor(cellCount / 2))

const startingCoord = Math.floor(props.canvasSize / 2)
const activeCoord: Ref<[number, number]> = ref<[number, number]>([startingCoord, startingCoord])

const allCoords: Ref<[number, number][]> = ref<[number, number][]>([])

for (let x = 0; x < props.canvasSize; x++) {
  for (let y = 0; y < props.canvasSize; y++) {
    allCoords.value.push([x, y])
  }
}

// const gridData = ref<CellData[]>(
//   Array.from({ length: cellCount }, (_, index) => ({
//     index: index + 1,
//     colour: 'bg-slate-600',
//     isActive: index === activeIndex.value
//   }))
// )

const gridData = ref<CellData[][]>(
  Array.from({ length: props.canvasSize }, (_, index) =>
    Array.from({ length: props.canvasSize }, (_, index2) => ({
      x: index,
      y: index2,
      colour: 'bg-slate-600',
      isActive: index == activeCoord.value[0] && index2 == activeCoord.value[1]
    }))
  )
)

const cellRefs = ref<ComponentPublicInstance[][]>(
  Array.from({ length: props.canvasSize }, () => [])
)
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
      if (activeCoord.value[0] - 1 > 0) {
        gridData.value[activeCoord.value[0]][activeCoord.value[1]].isActive = false
        activeCoord.value[0] -= 1
        gridData.value[activeCoord.value[0]][activeCoord.value[1]].isActive = true
        scrollToCell(
          cellRefs.value[activeCoord.value[0]][activeCoord.value[1]] as ComponentPublicInstance,
          grid.value
        )
      }
      break
    case 'ArrowDown':
      if (activeCoord.value[0] + 1 < props.canvasSize) {
        gridData.value[activeCoord.value[0]][activeCoord.value[1]].isActive = false
        activeCoord.value[0] += 1
        gridData.value[activeCoord.value[0]][activeCoord.value[1]].isActive = true
        scrollToCell(
          cellRefs.value[activeCoord.value[0]][activeCoord.value[1]] as ComponentPublicInstance,
          grid.value
        )
      }
      break
    case 'ArrowLeft':
      if (activeCoord.value[1] - 1 > 0) {
        gridData.value[activeCoord.value[0]][activeCoord.value[1]].isActive = false
        activeCoord.value[1] -= 1
        gridData.value[activeCoord.value[0]][activeCoord.value[1]].isActive = true
        scrollToCell(
          cellRefs.value[activeCoord.value[0]][activeCoord.value[1]] as ComponentPublicInstance,
          grid.value
        )
      }
      break
    case 'ArrowRight':
      if (activeCoord.value[1] + 1 < props.canvasSize) {
        gridData.value[activeCoord.value[0]][activeCoord.value[1]].isActive = false
        activeCoord.value[1] += 1
        gridData.value[activeCoord.value[0]][activeCoord.value[1]].isActive = true
        scrollToCell(
          cellRefs.value[activeCoord.value[0]][activeCoord.value[1]] as ComponentPublicInstance,
          grid.value
        )
      }
      break

    default:
      break
  }
}

onMounted(() => {
  scrollToCell(
    cellRefs.value[activeCoord.value[0]][activeCoord.value[1]] as ComponentPublicInstance,
    grid.value
  )
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
        v-for="[x, y] in allCoords"
        :key="`${x},${y}`"
        :cellData="gridData[x][y]"
        class="snap-center"
        :ref="(el) => cellRefs[x].push(el as ComponentPublicInstance)"
      />
    </div>
  </div>
</template>

<style></style>
