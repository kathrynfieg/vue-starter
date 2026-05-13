<script setup lang="ts">
import type { ListMemory } from '@/types/journal'
import { formatDate } from '@/utils/journalFormat'

defineProps<{
  memory: ListMemory
}>()
</script>

<template>
  <div
    class="flex aspect-square w-full flex-col overflow-hidden rounded-md border border-stone-200 bg-white p-1.5"
  >
    <p class="shrink-0 text-[9px] font-semibold leading-tight text-stone-900 line-clamp-2">
      {{ memory.title }}
    </p>
    <ul class="mt-1 min-h-0 flex-1 space-y-0.5 overflow-hidden text-[9px] leading-tight text-stone-600">
      <li v-for="(item, i) in memory.items.slice(0, 5)" :key="i" class="truncate">
        · {{ item }}
      </li>
      <li v-if="memory.items.length > 5" class="truncate text-stone-400">
        +{{ memory.items.length - 5 }} more
      </li>
    </ul>
    <time
      class="mt-auto shrink-0 text-[8px] text-stone-500 tabular-nums"
      :datetime="memory.created_at"
    >
      {{ formatDate(memory.created_at) }}
    </time>
  </div>
</template>
