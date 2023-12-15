<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { type Ref, ref } from 'vue'

const emit = defineEmits(['zoom', 'showColourPicker', 'clear'])

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

const executeSetting = (action: 'zoom' | 'showColourPicker' | 'clear') => {
  emit(action)
}
</script>

<template>
  <div
    id="menuContainer"
    :class="`${menuClass} fixed bottom-5 right-5 bg-slate-50 h-auto w-10 rounded-[1rem] shadow-sm shadow-black flex flex-col gap-y-3 items-center justify-end cursor-pointer hover:scale-[1.05] hover:shadow-xl`"
    @click="toggleMenu"
  >
    <div id="menuItems" class="flex flex-col gap-y-3 items-center justify-center">
      <div class="menu-item">
        <font-awesome-icon
          icon="eraser"
          :class="menuItemsClass"
          class="hover:scale-125"
          @click="executeSetting('clear')"
        />
        <div class="tooltip">Clear Canvas</div>
      </div>
      <div class="menu-item">
        <font-awesome-icon
          icon="paintbrush"
          :class="menuItemsClass"
          class="menu-item hover:scale-125"
          @click="executeSetting('showColourPicker')"
        />
        <div class="tooltip">Pick Colour</div>
      </div>
      <div class="menu-item">
        <font-awesome-icon
          icon="magnifying-glass-plus"
          :class="menuItemsClass"
          class="menu-item hover:scale-125"
          @click="executeSetting('zoom')"
        />
        <div class="tooltip">Zoom</div>
      </div>

      <hr
        class="menu-item h-0 border-t-[1px] border-slate-400 w-[60%] shadow-2xl rounded-lg"
        :class="menuItemsClass"
      />
    </div>
    <font-awesome-icon
      id="toggle-button"
      icon="gear"
      :class="cogClass"
      class="mb-3 bg-white hover:scale-125"
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
    height: 10rem;
  }
}

@keyframes shrinker {
  100% {
    height: 2.5rem;
  }

  0% {
    height: 10rem;
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

.cog-spin-open {
  animation: spin-clockwise 150ms linear forwards;
}

@keyframes spin-clockwise {
  100% {
    transform: rotate(-180deg);
  }
}

.cog-spin-close {
  animation: spin-anticlockwise 150ms linear forwards;
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
