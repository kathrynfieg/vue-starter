<script setup lang="ts">
import { Calendar, MapPin } from 'lucide-vue-next'
import type { Trip } from '@/types/journal'
import { formatTripRange } from '@/utils/journalFormat'

defineProps<{
  trips: Trip[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
    <article
      v-for="trip in trips"
      :key="trip.id"
      class="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-stone-200/90 transition hover:ring-teal-800/25"
    >
      <div class="aspect-16/10 w-full overflow-hidden bg-stone-100">
        <img
          :src="trip.cover_image"
          :alt="trip.title"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="p-4 sm:p-5">
        <h2 class="text-base font-bold tracking-tight text-stone-900 sm:text-lg">
          {{ trip.title }}
        </h2>
        <p class="mt-1.5 inline-flex items-center gap-1 text-xs text-stone-500">
          <Calendar class="size-3.5 shrink-0 opacity-80" :stroke-width="1.5" aria-hidden="true" />
          {{ formatTripRange(trip.start_date, trip.end_date) }}
        </p>
        <p
          class="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-teal-800"
        >
          <MapPin class="size-3.5 shrink-0" :stroke-width="1.5" aria-hidden="true" />
          {{ trip.location_text }}
        </p>
        <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-600">
          {{ trip.caption }}
        </p>
      </div>
    </article>
  </div>
</template>
