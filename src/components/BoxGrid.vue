<script setup lang="ts">
import {
  ref,
  onMounted,
  computed,
  type ComponentPublicInstance,
  type Ref,
  type PropType
} from 'vue'
import GridCell from './GridCell.vue'
import type { CellData, Cursor } from '@/shared.types'

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
    type: Object as PropType<Cursor>,
    required: true
  }
})

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

const cellRefs = ref<InstanceType<typeof GridCell>[][]>(
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
      cellRect.top - gridRect.top + grid.scrollTop - window.innerHeight / 2 + cellRect.height / 2
    xCoord.value =
      cellRect.left - gridRect.left + grid.scrollLeft - window.innerWidth / 2 + cellRect.width / 2

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
  gridData.value[activeCoord.value[0]][activeCoord.value[1]].colour = props.cursorColour.colour
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
  }, 10)
  document.addEventListener('keydown', onKeyDownAction)
})

const zoomOutCellSize = computed(() => {
  return Math.floor(Math.min(window.innerHeight, window.innerWidth) / props.canvasSize)
})

const gridDefaultStyle = computed(() => {
  return `repeat(${props.canvasSize}, ${props.cellSize}px)`
})

const gridZoomOutStyle = computed(() => {
  return `repeat(${props.canvasSize}, ${zoomOutCellSize.value}px)`
})

const gridStyleClass: Ref<string> = ref<string>('grid-default-style')

const emitCursorColourChange = (e: String) => {
  emit('update:cursor-colour', e)
}

const toggleZoom = () => {
  console.log('in box zoom')
  if (gridStyleClass.value !== 'zoom-out zoom-out-end') {
    gridStyleClass.value = 'zoom-out zoom-out-end'
  } else {
    gridStyleClass.value = 'grid-default-style zoom-in'
    setTimeout(
      () =>
        scrollToCell(
          cellRefs.value[activeCoord.value[0]][activeCoord.value[1]] as ComponentPublicInstance,
          grid.value
        ),
      3000
    )
  }
}

const toggleColourPicker = () => {
  cellRefs.value[activeCoord.value[0]][activeCoord.value[1]].showPicker()
}

defineExpose({ toggleZoom, toggleColourPicker })
</script>

<template>
  <div class="w-screen h-screen">
    <div ref="grid" class="absolute grid" :class="gridStyleClass">
      <GridCell
        v-for="[x, y] in allCoords"
        :key="`${x},${y}`"
        :cell-data="gridData[x][y]"
        :ref="(el) => cellRefs[x].push(el as InstanceType<typeof GridCell>)"
        :cursor-colour="cursorColour"
        @cursor-colour-change="emitCursorColourChange"
      />
    </div>
  </div>
</template>

<style scoped>
/* .grow {
  animation: grid-start-size 3s cubic-bezier(0.37, 0.84, 0.95, 0.3);
  animation: grid-start-size 3s linear;
}

@keyframes grid-start-size {
  0% {
    grid-template-rows: v-bind(gridStartStyle);
    grid-template-columns: v-bind(gridStartStyle);
    grid-auto-rows: v-bind(zoomOutCellSize) px;
  }
} */

.grid-default-style {
  grid-template-rows: v-bind(gridDefaultStyle);
  grid-template-columns: v-bind(gridDefaultStyle);
  grid-auto-rows: v-bind(cellSize) px;
}

.zoom-out {
  animation: grid-zoom-out 3s linear;
}

@keyframes grid-zoom-out {
  0% {
    grid-template-rows: v-bind(gridDefaultStyle);
    grid-template-columns: v-bind(gridDefaultStyle);
    grid-auto-rows: v-bind(cellSize) px;
  }
}

.zoom-out-end {
  grid-template-rows: v-bind(gridZoomOutStyle);
  grid-template-columns: v-bind(gridZoomOutStyle);
  grid-auto-rows: v-bind(zoomOutCellSize) px;
}

.zoom-in {
  animation: grid-zoom-in 3s linear;
}

@keyframes grid-zoom-in {
  0% {
    grid-template-rows: v-bind(gridZoomOutStyle);
    grid-template-columns: v-bind(gridZoomOutStyle);
    grid-auto-rows: v-bind(zoomOutCellSize) px;
  }
}
</style>
