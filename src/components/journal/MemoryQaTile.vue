<script setup lang="ts">
import type { QaMemory } from '@/types/journal'
import { formatDate } from '@/utils/journalFormat'

defineProps<{
  memory: QaMemory
}>()
</script>

<template>
  <div
    class="flex min-h-[5.5rem] flex-col justify-between rounded-md border border-stone-200 bg-stone-100/80 p-2.5"
  >
    <div>
      <p class="text-[9px] font-semibold uppercase tracking-wide text-teal-800 line-clamp-2">
        {{ memory.question }}
      </p>
      <p class="mt-1 text-[11px] leading-snug text-stone-700 line-clamp-3">{{ memory.answer }}</p>
    </div>
    <time class="text-[9px] text-stone-500" :datetime="memory.created_at">{{
      formatDate(memory.created_at)
    }}</time>
  </div>
</template>
