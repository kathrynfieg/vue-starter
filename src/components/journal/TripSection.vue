<script setup lang="ts">
import type { Memory, Trip } from '@/types/journal'
import { formatTripRange } from '@/utils/journalFormat'
import MemoryListTile from './MemoryListTile.vue'
import MemoryPhotoTile from './MemoryPhotoTile.vue'
import MemoryQaTile from './MemoryQaTile.vue'
import MemoryQuoteTile from './MemoryQuoteTile.vue'

defineProps<{
  trip: Trip
}>()

function tileClass(memory: Memory): string {
  switch (memory.type) {
    case 'photo':
      return 'col-span-1 self-start'
    case 'quote':
    case 'qa':
      return 'col-span-3 min-[400px]:col-span-2 sm:col-span-2'
    case 'list':
      return 'col-span-3 sm:col-span-4'
  }
}
</script>

<template>
  <article
    class="overflow-hidden rounded-xl bg-white ring-1 ring-stone-200 shadow-sm"
  >
    <!-- Compact trip header -->
    <div class="flex gap-3 border-b border-stone-100 p-3 sm:p-3.5">
      <img
        :src="trip.cover_image"
        :alt="trip.title"
        class="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-[4.5rem] sm:w-[4.5rem]"
      />
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h2 class="text-sm font-semibold tracking-tight text-stone-900 sm:text-base">
            {{ trip.title }}
          </h2>
          <span class="text-[10px] text-stone-400 sm:text-xs">
            {{ formatTripRange(trip.start_date, trip.end_date) }}
          </span>
        </div>
        <p class="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-teal-800 sm:text-[11px]">
          {{ trip.location_text }}
        </p>
        <p class="mt-1 line-clamp-2 text-[11px] leading-snug text-stone-600 sm:text-xs">
          {{ trip.caption }}
        </p>
      </div>
    </div>

    <!-- Gallery grid -->
    <div
      class="grid grid-flow-dense grid-cols-3 gap-1.5 p-2 sm:grid-cols-4 sm:gap-2 sm:p-2.5"
    >
      <template v-for="memory in trip.memories" :key="memory.id">
        <div :class="tileClass(memory)" class="min-h-0 min-w-0">
          <MemoryPhotoTile v-if="memory.type === 'photo'" :memory="memory" class="w-full" />
          <MemoryQuoteTile v-else-if="memory.type === 'quote'" :memory="memory" class="h-full min-h-[5.5rem]" />
          <MemoryQaTile v-else-if="memory.type === 'qa'" :memory="memory" class="h-full min-h-[5.5rem]" />
          <MemoryListTile v-else-if="memory.type === 'list'" :memory="memory" class="h-full min-h-[5.5rem]" />
        </div>
      </template>
    </div>
  </article>
</template>
