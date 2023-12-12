<script setup lang="ts">
import { ref, onMounted, computed, type ComponentPublicInstance, type Ref } from 'vue'
import GridCell from './GridCell.vue'
import { type CellData } from '@/shared.types'

const emit = defineEmits(['update:cursor-colour'])

const props = defineProps({
  canvasSize: {
    type: Number,
    required: true
  },
  cellSize: {
    type: Number,
    required: true
  },
  cursorColour: {
    type: String,
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

const gridData = ref<CellData[][]>(
  Array.from({ length: props.canvasSize }, (_, index) =>
    Array.from({ length: props.canvasSize }, (_, index2) => ({
      x: index,
      y: index2,
      colour: '#475569',
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

let scrolled: boolean = false

const scrollToCell = (cell: ComponentPublicInstance, grid: HTMLDivElement | null) => {
  if (cell && grid && !scrolled) {
    scrolled = true
    setTimeout(() => {
      scrolled = false
    }, 100)
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

const onKeyDownAction = (e: KeyboardEvent) => {
  e.preventDefault()
  switch (e.key) {
    case 'ArrowUp':
      if (activeCoord.value[0] - 1 > -1) {
        updateGrid(0, -1)
      }
      break
    case 'ArrowDown':
      if (activeCoord.value[0] + 1 < props.canvasSize) {
        updateGrid(0, 1)
      }
      break
    case 'ArrowLeft':
      if (activeCoord.value[1] - 1 > -1) {
        updateGrid(1, -1)
      }
      break
    case 'ArrowRight':
      if (activeCoord.value[1] + 1 < props.canvasSize) {
        updateGrid(1, 1)
      }
      break

    default:
      break
  }
}

const updateGrid = (index: number, increment: number) => {
  gridData.value[activeCoord.value[0]][activeCoord.value[1]].isActive = false
  gridData.value[activeCoord.value[0]][activeCoord.value[1]].colour = props.cursorColour
  activeCoord.value[index] += increment
  gridData.value[activeCoord.value[0]][activeCoord.value[1]].isActive = true
  scrollToCell(
    cellRefs.value[activeCoord.value[0]][activeCoord.value[1]] as ComponentPublicInstance,
    grid.value
  )
}

onMounted(() => {
  setTimeout(() => {
    scrollToCell(
      cellRefs.value[activeCoord.value[0]][activeCoord.value[1]] as ComponentPublicInstance,
      grid.value
    )
  }, 0)
  document.addEventListener('keydown', onKeyDownAction)
})

const gridStyle = computed(() => {
  //   return `transform: translateX(-${translateByX.value}px) translateY(-${translateByY.value}px); grid-template-rows: repeat(${canvasSize.value}, ${cellSize.value}px);  grid-template-columns: repeat(${canvasSize.value}, ${cellSize.value}px); grid-auto-rows: ${cellSize.value}px`
  return `grid-template-rows: repeat(${props.canvasSize}, ${props.cellSize}px);  grid-template-columns: repeat(${props.canvasSize}, ${props.cellSize}px); grid-auto-rows: ${props.cellSize}px`
})

const gridStartStyle = computed(() => {
  return `repeat(${props.canvasSize}, 0px)`
})

const gridEndStyle = computed(() => {
  return `repeat(${props.canvasSize}, ${props.cellSize}px)`
})

const emitCursorColourChange = (e: String) => {
  emit('update:cursor-colour', e)
}
</script>

<template>
  <div class="w-screen h-screen">
    <div ref="grid" class="absolute grid grow" :style="gridStyle" @keyup.up.prevent>
      <GridCell
        v-for="[x, y] in allCoords"
        :key="`${x},${y}`"
        :cell-data="gridData[x][y]"
        :ref="(el) => cellRefs[x].push(el as ComponentPublicInstance)"
        :cursor-colour="cursorColour"
        @cursor-colour-change="emitCursorColourChange"
      />
    </div>
  </div>
</template>

<style scoped>
/* .grow {
  animation: gridStartSize 3s cubic-bezier(0.37, 0.84, 0.95, 0.3);
}

@keyframes gridStartSize {
  0% {
    grid-template-rows: v-bind(gridStartStyle);
    grid-template-columns: v-bind(gridStartStyle);
    grid-auto-rows: 0px;
  }
} */

.gridStyle {
  grid-template-rows: v-bind(gridEndStyle);
  grid-template-columns: v-bind(gridEndStyle);
  grid-auto-rows: 0px;
}
</style>
