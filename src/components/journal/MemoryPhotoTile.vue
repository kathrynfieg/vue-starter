<script setup lang="ts">
import type { PhotoMemory } from '@/types/journal'
import { formatDate } from '@/utils/journalFormat'

defineProps<{
  memory: PhotoMemory
}>()
</script>

<template>
  <div
    class="group relative aspect-square overflow-hidden rounded-md bg-stone-200 outline-none ring-stone-900 focus-visible:ring-2"
    tabindex="0"
  >
    <img
      :src="memory.photo_url"
      alt=""
      class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    />
    <!-- Mobile / no-hover: subtle strip -->
    <div
      class="absolute inset-x-0 bottom-0 bg-stone-900/80 p-1.5 text-[10px] leading-snug text-white md:hidden"
    >
      <p v-if="memory.caption" class="line-clamp-2">{{ memory.caption }}</p>
      <p v-else class="text-stone-300">{{ memory.location_text ?? formatDate(memory.created_at) }}</p>
    </div>
    <!-- Hover-capable: solid overlay panel -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full bg-stone-900/90 p-2 text-[11px] leading-snug text-white transition-transform duration-200 md:block md:group-hover:translate-y-0"
    >
      <template v-if="memory.caption">
        <p class="line-clamp-3 font-medium">{{ memory.caption }}</p>
        <p class="mt-1 flex flex-wrap gap-x-1.5 text-[10px] text-stone-200">
          <span v-if="memory.location_text">{{ memory.location_text }}</span>
          <span v-if="memory.location_text">·</span>
          <time :datetime="memory.created_at">{{ formatDate(memory.created_at) }}</time>
        </p>
      </template>
      <p v-else class="text-[11px] text-stone-100">
        <span v-if="memory.location_text">{{ memory.location_text }} · </span>
        <time :datetime="memory.created_at">{{ formatDate(memory.created_at) }}</time>
      </p>
    </div>
  </div>
</template>
