<script setup lang="ts">
import type { QuoteMemory } from '@/types/journal'
import { formatDate } from '@/utils/journalFormat'

defineProps<{
  memory: QuoteMemory
}>()
</script>

<template>
  <div
    class="flex min-h-[5.5rem] flex-col justify-between rounded-md border border-teal-800/20 bg-teal-800/[0.06] p-2.5"
  >
    <p class="text-[11px] leading-snug italic text-stone-700 line-clamp-4">“{{ memory.text }}”</p>
    <time class="text-[9px] text-stone-500" :datetime="memory.created_at">{{
      formatDate(memory.created_at)
    }}</time>
  </div>
</template>
