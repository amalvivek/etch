<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { type Ref, ref } from 'vue'

const menuClass: Ref<string> = ref<string>('menu-start')
const cogClass: Ref<string> = ref<string>('')
const menuItemsClass: Ref<string> = ref<string>('')
const menuItemsHidden: Ref<boolean> = ref<boolean>(true)

const toggleMenu = () => {
  console.log('toggleMenu')
  if (menuItemsHidden.value) {
    menuClass.value = 'grow-menu'
    cogClass.value = 'cog-spin-open'
    menuItemsHidden.value = false
    menuItemsClass.value = 'menu-items-appear'
  } else {
    menuClass.value = 'shrink-menu'
    cogClass.value = 'cog-spin-close'
    menuItemsHidden.value = true
    menuItemsClass.value = 'menu-items-disappear'
  }
}
</script>

<template>
  <div
    id="menuContainer"
    :class="`${menuClass} fixed bottom-5 right-5 bg-slate-50 h-auto w-10 rounded-[1rem] shadow-2xl shadow-black flex flex-col gap-y-3 items-center justify-end`"
    @click="toggleMenu"
  >
    <div id="menuItems" class="flex flex-col gap-y-3 items-center justify-center">
      <font-awesome-icon icon="gear" :class="menuItemsClass" />
      <font-awesome-icon icon="gear" :class="menuItemsClass" />
      <hr
        class="h-0 border-t-[1px] border-slate-400 w-[60%] shadow-2xl rounded-lg"
        :class="menuItemsClass"
      />
    </div>
    <font-awesome-icon id="toggleButton" icon="gear" :class="cogClass" class="mb-3 bg-white" />
  </div>
</template>

<style scoped>
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
  animation: grower 300ms linear;
  animation-fill-mode: forwards;
}

.shrink-menu {
  animation: shrinker 300ms linear;
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
  80% {
    opacity: 0;
  }
  0% {
    transform: translateY(1500%);
    opacity: 0;
  }
}

@keyframes disappear {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(1500%);
    opacity: 0;
  }
}

.menu-items-appear {
  animation: appear 300ms ease-in forwards;
}

.menu-items-disappear {
  animation: disappear 300ms ease-out forwards;
}
/*
.menu-items {

  transition-timing-function: ease-in;


  transition: 300ms;


  transform: translateY(0);
}

.menu-items-hidden {

  transition-timing-function: ease-out;

/
  transition: 300ms;


  transform: translateY(1500%);
} */
</style>
