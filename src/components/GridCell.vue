<script setup lang="ts">
import type { CellData, Cursor } from '@/shared.types.ts'
import { toRefs, type PropType, ref, computed, type Ref } from 'vue'
import { invertHex } from '@/shared.utils'

const emit = defineEmits(['cursorColourChange'])

const props = defineProps({
  cellData: {
    type: Object as PropType<CellData>,
    required: true
  },
  cursorColour: {
    type: Object as PropType<Cursor>,
    required: true
  }
})

const { x, y, colour, isActive } = toRefs(props.cellData)

const cursorStyle = computed(() => {
  const bg = `height: 100% background-color: ${props.cursorColour.colour};`
  if (colour.value === props.cursorColour.colour) {
    return ` outline-style: solid; outline-color: ${props.cursorColour.outline}`
  }
  return bg
})

const showTooltip: Ref<boolean> = ref<boolean>(false)

const cursor = ref<HTMLDivElement>(null as never)
const picker = ref<HTMLInputElement>(null as never)

const showPicker = () => {
  showTooltip.value = false
  if (picker.value.matches(':focus')) {
    picker.value.blur()
  } else {
    picker.value.click()
  }
}

const emitColour = (e: Event) => {
  emit('cursorColourChange', {
    colour: (e.target as HTMLInputElement).value,
    outline: invertHex((e.target as HTMLInputElement).value)
  })
}

defineExpose({ showPicker })
</script>

<template>
  <div class="h-full w-full border" :style="`background-color: ${colour}`">
    <div
      ref="cursor"
      v-if="isActive"
      class="h-full w-full cursor flex flex-col items-center"
      :style="cursorStyle"
      @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <input
        ref="picker"
        type="color"
        class="cursor-pointer blink_me"
        :value="cursorColour.colour"
        @change="emitColour"
        @click="showPicker"
      />
      <div v-if="showTooltip" :key="`${x}-${y}-${isActive}`" class="tooltip">
        Show Colour Picker
      </div>
    </div>
  </div>
</template>

<style scoped>
.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

input[type='color'] {
  -webkit-appearance: none;
  border-width: 1px;
  width: 100%;
  height: 100%;
}
input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type='color']::-webkit-color-swatch {
  border: none;
}

.tooltip {
  position: absolute;
  width: fit-content;

  transform: translateY(3rem);

  background: black;
  color: white;
  padding: 6px 8px;
  border-radius: 4px;

  font-size: 0.8em;
  white-space: nowrap;
  text-align: end;
}
</style>
