<script setup lang="ts">
import type { QuoteMemory } from '@/types/journal'
import { formatDate } from '@/utils/journalFormat'

defineProps<{
  memory: QuoteMemory
}>()
</script>

<template>
  <div
    class="flex aspect-square w-full flex-col overflow-hidden rounded-md border border-teal-800/20 bg-teal-800/[0.06] p-2"
  >
    <div class="flex min-h-0 flex-1 flex-col items-center justify-center px-0.5">
      <p class="text-center text-[10px] leading-snug italic text-stone-700 line-clamp-6">
        “{{ memory.text }}”
      </p>
    </div>
    <time
      class="shrink-0 pt-1 text-center text-[8px] text-stone-500 tabular-nums"
      :datetime="memory.created_at"
    >
      {{ formatDate(memory.created_at) }}
    </time>
  </div>
</template>
