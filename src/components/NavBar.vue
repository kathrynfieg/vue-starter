<script setup lang="ts">
import { Compass, Plus } from 'lucide-vue-next'

defineEmits<{
  addTrip: []
}>()
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-stone-700/80 bg-stone-900 text-stone-100 shadow-sm"
  >
    <div
      class="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"
    >
      <a
        href="#"
        class="group flex items-center gap-2 font-semibold tracking-tight text-stone-100 transition hover:text-white"
      >
        <span
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-800 text-amber-200 ring-1 ring-stone-600/80 transition group-hover:bg-stone-700 group-hover:text-amber-100"
        >
          <Compass class="size-4" :stroke-width="1.75" aria-hidden="true" />
        </span>
        <span class="text-lg lowercase tracking-wide">navi</span>
      </a>

      <nav class="flex items-center gap-1 sm:gap-2" aria-label="Primary">
        <a
          href="#journal"
          class="rounded-md px-2.5 py-2 text-sm text-stone-300 transition hover:bg-stone-800 hover:text-amber-100 sm:px-3"
        >
          Journal
        </a>
        <a
          href="#profile"
          class="hidden rounded-md px-2.5 py-2 text-sm text-stone-300 transition hover:bg-stone-800 hover:text-amber-100 sm:inline sm:px-3"
        >
          Profile
        </a>
        <button
          type="button"
          class="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-amber-200/90 px-2.5 py-1.5 text-xs font-semibold text-stone-900 shadow-sm transition hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:ml-2 sm:px-3 sm:text-sm"
          @click="$emit('addTrip')"
        >
          <Plus class="size-3.5 shrink-0 sm:size-4" :stroke-width="2" aria-hidden="true" />
          Add trip
        </button>
      </nav>
    </div>
  </header>
</template>
