<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { type Ref, ref } from 'vue'
import OptionItem from '@/components/OptionItem.vue'

const emit = defineEmits(['zoom', 'showColourPicker', 'clear', 'openModal'])

const menuClass: Ref<string> = ref<string>('menu-start')
const cogClass: Ref<string> = ref<string>('')
const menuItemClass: Ref<string> = ref<string>('menu-items-start')
const menuItemsClass: Ref<string> = ref<string>('hidden')
const toggle: Ref<boolean> = ref<boolean>(true)

const toggleMenu = () => {
  if (toggle.value) {
    menuClass.value = 'grow-menu'
    cogClass.value = 'opened'
    menuItemClass.value = 'menu-item-appear'
    menuItemsClass.value = ''
  } else {
    menuClass.value = 'shrink-menu'
    cogClass.value = 'closed'
    menuItemClass.value = 'menu-item-disappear'
    menuItemsClass.value = 'hidden'
  }
  toggle.value = !toggle.value
}

const executeSetting = (action: 'zoom' | 'showColourPicker' | 'clear' | 'openModal') => {
  emit(action)
}
</script>

<template>
  <div
    id="menuContainer"
    :class="`${menuClass} z-20 fixed bottom-5 right-5 bg-slate-50 w-10 rounded-[1rem] shadow-sm shadow-black flex flex-col gap-y-3 items-center justify-end cursor-pointer hover:scale-[1.05] hover:shadow-xl py-3`"
    @click="toggleMenu"
  >
    <div :class="`${menuItemsClass} flex flex-col gap-y-3 items-center justify-center`">
      <OptionItem
        :class="menuItemClass"
        icon="sliders"
        tooltip="Preferences"
        @select="executeSetting('openModal')"
      />
      <OptionItem
        :class="menuItemClass"
        icon="eraser"
        tooltip="Clear Canvcas"
        @select="executeSetting('clear')"
      />
      <OptionItem
        :class="menuItemClass"
        icon="paintbrush"
        tooltip="Pick Colour"
        @select="executeSetting('showColourPicker')"
      />
      <OptionItem
        :class="menuItemClass"
        icon="magnifying-glass-plus"
        tooltip="Zoom"
        @select="executeSetting('zoom')"
      />
      <hr
        class="menu-item h-0 border-t-[1px] border-slate-400 w-[60%] shadow-2xl rounded-lg"
        :class="menuItemClass"
      />
    </div>
    <font-awesome-icon
      id="toggle-button"
      icon="gear"
      :class="cogClass"
      class="bg-white hover:scale-125 cog-spin"
    />
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
    height: 12.5rem;
  }
}

@keyframes shrinker {
  100% {
    height: 2.5rem;
  }

  0% {
    height: 12.5rem;
  }
}

.grow-menu {
  animation: grower 150ms linear;
  animation-fill-mode: forwards;
}

.shrink-menu {
  animation: shrinker 150ms linear;
  animation-fill-mode: forwards;
}

.cog-spin {
  transition: transform 150ms linear;
  transform: rotate(0deg);
}

.cog-spin.opened {
  transform: rotate(180deg);
}

.cog-spin.closed {
  transform: rotate(-180deg);
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

.menu-item-appear {
  animation: appear 200ms cubic-bezier(0, 1, 0, 1) backwards;
}

.menu-item-disappear {
  animation: disappear 200ms cubic-bezier(0, 1, 0, 1) forwards;
}

@for $i from 1 through 5 {
  .menu-item-disappear:nth-child(#{$i}n) {
    animation-delay: #{($i - 1) * 50}ms;
  }
}

@for $i from 1 through 5 {
  .menu-item-appear:nth-child(#{$i}n) {
    animation-delay: #{(4 - $i) * 50}ms;
  }
}
</style>
