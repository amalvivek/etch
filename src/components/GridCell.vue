<script setup lang="ts">
/* __placeholder__ */
import type { CellData } from '@/shared.types'
import { toRefs, type PropType, ref, onMounted, reactive, inject, computed, type Ref } from 'vue'

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
    return 'outline outline-slate-400'
  }
  return ''
})

const showTooltip: Ref<boolean> = ref<boolean>(false)
const showColourPicker: Ref<boolean> = ref<boolean>(false)

const cursor = ref<HTMLDivElement>(null as never)
const picker = ref<HTMLInputElement>(null as never)

const showPicker = () => {
  showTooltip.value = false
  picker.value.click()
}

const emitColour = (e: Event) => {
  emit('cursorColourChange', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="h-full w-full border" :style="`background-color: ${colour}`">
    <div
      ref="cursor"
      v-if="isActive"
      :class="`h-full w-full blink_me  ${outline}`"
      :style="`background-color: ${cursorColour}`"
      @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
      @click="showPicker"
    ></div>
    <div
      style="transform: translate(-300%, -50%)"
      class="fixed top-2/4 left-2/4 mb-14"
      @mouseover="showTooltip = true"
      @mouseleave="showTooltip = false"
      @click="showPicker"
    >
      <input ref="picker" type="color" :value="cursorColour" @change="emitColour" />
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
  animation: blinker 0.5s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

input[type='color'] {
  visibility: hidden;
  width: 40px;
  height: 40px;
}
</style>
