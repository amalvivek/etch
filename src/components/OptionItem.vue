<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { type Ref, ref } from 'vue'

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

const menuClass: Ref<string> = ref<string>('menu-start')
const cogClass: Ref<string> = ref<string>('')
const menuItemsClass: Ref<string> = ref<string>('menu-items-start')
const toggle: Ref<boolean> = ref<boolean>(true)

const toggleMenu = () => {
  if (toggle.value) {
    menuClass.value = 'grow-menu'
    cogClass.value = 'cog-spin-open'
    menuItemsClass.value = 'menu-items-appear'
  } else {
    menuClass.value = 'shrink-menu'
    cogClass.value = 'cog-spin-close'
    menuItemsClass.value = 'menu-items-disappear'
  }
  toggle.value = !toggle.value
}

const select = () => {
  emit('select')
}
</script>

<template>
  <div class="menu-item">
    <font-awesome-icon
      :icon="props.icon"
      :class="menuItemsClass"
      class="hover:scale-125"
      @click="select"
    />
    <div class="tooltip">{{ props.tooltip }}</div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes appear {
  100% {
    transform: translateY(0);
    opacity: 1;
  }

  0% {
    transform: translateY(1000%);
    opacity: 0;
  }
}

@keyframes disappear {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
  100% {
    transform: translateY(1000%);
    opacity: 0;
  }
}

.menu-items-start {
  transform: translateY(1000%);
  opacity: 0;
}

.menu-items-appear {
  animation: appear 200ms cubic-bezier(0, 1, 0, 1) backwards;
}

.menu-items-disappear {
  animation: disappear 200ms cubic-bezier(0, 1, 0, 1) forwards;
}

@for $i from 1 through 4 {
  .menu-items-disappear:nth-child(#{$i}n) {
    animation-delay: #{($i - 1) * 50}ms;
  }
}

@for $i from 1 through 4 {
  .menu-items-appear:nth-child(#{$i}n) {
    animation-delay: #{(4 - $i) * 50}ms;
  }
}

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
