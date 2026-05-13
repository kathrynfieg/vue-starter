<script setup lang="ts">
import type { QaMemory } from '@/types/journal'
import { formatDate } from '@/utils/journalFormat'

defineProps<{
  memory: QaMemory
}>()
</script>

<template>
  <div
    class="flex aspect-square w-full flex-col overflow-hidden rounded-md border border-stone-200 bg-stone-100/80 p-1.5"
  >
    <p
      class="shrink-0 text-[8px] font-semibold uppercase leading-tight tracking-wide text-teal-800 line-clamp-3"
    >
      {{ memory.question }}
    </p>
    <p class="mt-1 min-h-0 flex-1 text-[10px] leading-snug text-stone-700 line-clamp-5">
      {{ memory.answer }}
    </p>
    <time
      class="mt-auto shrink-0 text-[8px] text-stone-500 tabular-nums"
      :datetime="memory.created_at"
    >
      {{ formatDate(memory.created_at) }}
    </time>
  </div>
</template>
