<script setup lang="ts">
import type { CellData } from '@/shared.types.ts'
import { toRefs, type PropType, ref, computed, type Ref } from 'vue'
import { invertHex } from '@/shared.utils'

const emit = defineEmits(['cursorColourChange'])

const props = defineProps({
  cellData: {
    type: Object as PropType<CellData>,
    required: true
  },
  cursorColour: {
    type: String,
    required: true
  }
})

const { x, y, colour, isActive } = toRefs(props.cellData)

const outline = computed(() => {
  if (colour.value === props.cursorColour) {
    return `outline-style: solid; outline-color: ${invertHex(props.cursorColour)}`
  }
  return ''
})

const showTooltip: Ref<boolean> = ref<boolean>(false)
// const showColourPicker: Ref<boolean> = ref<boolean>(false)

const cursor = ref<HTMLDivElement>(null as never)
const picker = ref<HTMLInputElement>(null as never)

const showPicker = () => {
  showTooltip.value = false
  if (picker.value.matches(':focus')) {
    console.log('blurring')
    picker.value.blur()
  } else {
    console.log('focussing')
    picker.value.click()
  }
}

let emitted: boolean = false

const emitColour = (e: Event) => {
  if (!emitted || e.type == 'change') {
    emitted = true
    setTimeout(() => (emitted = false), 500)
    emit('cursorColourChange', (e.target as HTMLInputElement).value)
  }
}

defineExpose({ showPicker })
</script>

<template>
  <div class="h-full w-full border" :style="`background-color: ${colour}`">
    <div
      ref="cursor"
      v-if="isActive"
      class="h-full w-full blink_me cursor"
      :style="outline"
      @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
      @click="showPicker"
    ></div>
    <div style="transform: translate(-50%, -50%)" class="invisible fixed top-2/4 left-2/4">
      <input
        ref="picker"
        type="color"
        :value="cursorColour"
        @change="emitColour"
        @input="emitColour"
        class="w-[40px] h-[40px]"
      />
    </div>
    <div
      v-if="showTooltip"
      :key="`${x}-${y}-${isActive}`"
      style="transform: translate(-50%, -50%)"
      class="fixed top-2/4 left-2/4 mt-14 p-2.5 bg-black text-white rounded shadow-lg"
    >
      Show Colour Picker
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

.cursor {
  background-color: v-bind(cursorColour);
}
</style>
