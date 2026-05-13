<script setup lang="ts">
import type { ListMemory } from '@/types/journal'
import { formatDate } from '@/utils/journalFormat'

defineProps<{
  memory: ListMemory
}>()
</script>

<template>
  <div
    class="flex min-h-[5.5rem] flex-col justify-between rounded-md border border-stone-200 bg-white p-2.5"
  >
    <div>
      <p class="text-[10px] font-semibold text-stone-900 line-clamp-2">{{ memory.title }}</p>
      <ul class="mt-1.5 space-y-0.5 text-[10px] leading-tight text-stone-600">
        <li v-for="(item, i) in memory.items.slice(0, 4)" :key="i" class="line-clamp-1">
          · {{ item }}
        </li>
        <li v-if="memory.items.length > 4" class="text-stone-400">+{{ memory.items.length - 4 }} more</li>
      </ul>
    </div>
    <time class="text-[9px] text-stone-500" :datetime="memory.created_at">{{
      formatDate(memory.created_at)
    }}</time>
  </div>
</template>
