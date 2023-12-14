<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { type Ref, ref } from 'vue'

const emit = defineEmits(['zoom', 'showColourPicker'])

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

const executeSetting = (action: 'zoom' | 'showColourPicker') => {
  emit(action)
}
</script>

<template>
  <div
    id="menuContainer"
    :class="`${menuClass} fixed bottom-5 right-5 bg-slate-50 h-auto w-10 rounded-[1rem] shadow-2xl shadow-black flex flex-col gap-y-3 items-center justify-end`"
    @click="toggleMenu"
  >
    <div id="menuItems" class="flex flex-col gap-y-3 items-center justify-center">
      <font-awesome-icon
        icon="paintbrush"
        :class="menuItemsClass"
        class="menu-item"
        @click="executeSetting('showColourPicker')"
      />
      <font-awesome-icon
        icon="magnifying-glass-plus"
        :class="menuItemsClass"
        class="menu-item"
        @click="executeSetting('zoom')"
      />
      <hr
        class="menu-item h-0 border-t-[1px] border-slate-400 w-[60%] shadow-2xl rounded-lg"
        :class="menuItemsClass"
      />
    </div>
    <font-awesome-icon id="toggleButton" icon="gear" :class="cogClass" class="mb-3 bg-white" />
  </div>
</template>

<style lang="scss" scoped>
.menu-start {
  height: 2.5rem;
}

@keyframes grower {
  0% {
    height: 2.5rem;
  }

  100% {
    height: 7rem;
  }
}

@keyframes shrinker {
  100% {
    height: 2.5rem;
  }

  0% {
    height: 7rem;
  }
}

.grow-menu {
  animation: grower 500ms linear;
  animation-fill-mode: forwards;
}

.shrink-menu {
  animation: shrinker 500ms linear;
  animation-fill-mode: forwards;
}

.cog-spin-open {
  animation: spin-clockwise 300ms linear forwards;
}

@keyframes spin-clockwise {
  100% {
    transform: rotate(-180deg);
  }
}

.cog-spin-close {
  animation: spin-anticlockwise 300ms linear forwards;
}

@keyframes spin-anticlockwise {
  100% {
    transform: rotate(180deg);
  }
}

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
  45% {
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
  animation: appear 100ms cubic-bezier(0, 1, 0, 1) backwards;
}

.menu-items-disappear {
  animation: disappear 300ms cubic-bezier(1, 0, 1, 0) forwards;
}

@for $i from 1 through 3 {
  .menu-items-disappear:nth-child(#{$i}n) {
    animation-delay: #{($i - 1) * 0.2}s;
  }
}

@for $i from 1 through 3 {
  .menu-items-appear:nth-child(#{$i}n) {
    animation-delay: #{(3 - $i) * 0.2}s;
  }
}
</style>
