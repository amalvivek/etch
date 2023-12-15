<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['select'])

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  tooltip: {
    type: String,
    required: true
  }
})

const select = () => {
  emit('select')
}
</script>

<template>
  <div class="menu-item">
    <font-awesome-icon :icon="props.icon" class="hover:scale-125" @click="select" />
    <div class="tooltip">{{ props.tooltip }}</div>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  top: -20%;
  width: fit-content;

  transform: translateX(-3rem);

  background: black;
  color: white;
  padding: 6px 8px;
  border-radius: 4px;

  font-size: 0.8em;
  white-space: nowrap;
  text-align: end;

  opacity: 0;
  visibility: hidden;
}

.menu-item {
  position: relative;
}
.menu-item:hover .tooltip {
  right: 0%;
  opacity: 1;
  visibility: visible;
}
</style>
