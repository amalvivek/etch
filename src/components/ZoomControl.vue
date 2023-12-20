<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'

const emit = defineEmits(['update:modelValue', 'update:show'])

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    default: false
  }
})

const { modelValue, show } = toRefs(props)
const isShowing = ref(show)

watch(show, (newValue) => {
  isShowing.value = newValue
})

function closeModal() {
  emit('update:show', false)
}

const updateScale = (e: Event) => {
  if (e.target) emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const updateScaleManual = (s: String, inc: number) => {
  emit('update:modelValue', String(Number(s) + inc))
}
</script>

<template>
  <teleport to="#app">
    <div v-if="isShowing" class="fixed h-full w-full z-10" @click.self="closeModal"></div>
  </teleport>
  <Transition name="modal">
    <div
      v-if="isShowing"
      class="flex gap-3 bg-white rounded-[1rem] px-3 w-[20rem] h-[2.5rem] fixed z-20 bottom-5 left-1/2 -translate-x-1/2 shadow-sm shadow-black items-center justify-around"
    >
      <font-awesome-icon
        icon="minus"
        class="hover:scale-125 cursor-pointer"
        @click="updateScaleManual(modelValue, -0.1)"
      />
      <input
        type="range"
        class="flex-grow-[5] cursor-pointer"
        min="0.1"
        max="3"
        step="0.01"
        :value="modelValue"
        @input="updateScale"
      />
      <font-awesome-icon
        icon="plus"
        class="hover:scale-125 cursor-pointer"
        @click="updateScaleManual(modelValue, 0.1)"
      />
    </div>
  </Transition>
  <Transition name="modal">
    <div
      v-if="modelValue !== '1' && !isShowing"
      class="flex gap-3 bg-black text-white rounded-[1rem] px-10 w-fit h-[2.5rem] fixed z-20 bottom-5 left-1/2 -translate-x-1/2 shadow-sm shadow-black items-center justify-around cursor-pointer"
      @click="updateScaleManual('1', 0)"
    >
      Reset to Default
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active {
  transition: all 300ms ease;
}
.modal-leave-active {
  transition: all 200ms ease;
}

.modal-enter-from,
.modal-leave-to {
  transform: translateX(-50%) translateY(100%);
  opacity: 0;
}
</style>
