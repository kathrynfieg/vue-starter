<script setup lang="ts">
import { Camera, Globe, MapPin, Route } from 'lucide-vue-next'
import { computed } from 'vue'
import type { Component } from 'vue'
import type { UserProfile } from '@/types/journal'

const props = defineProps<{
  profile: UserProfile
  lastTrip: {
    headline: string
    place: string
  }
}>()

type StatRow = {
  id: string
  label: string
  sub: string
  value: string
  icon: Component
  valueIsText?: boolean
}

const statRows = computed<StatRow[]>(() => [
  {
    id: 'countries',
    label: 'Countries',
    sub: 'Visited',
    value: String(props.profile.countries_visited.length),
    icon: Globe,
  },
  {
    id: 'trips',
    label: 'Trips',
    sub: 'Journeys',
    value: String(props.profile.stats.trips),
    icon: Route,
  },
  {
    id: 'memories',
    label: 'Memories',
    sub: 'Photos',
    value: String(props.profile.stats.memories),
    icon: Camera,
  },
  {
    id: 'last',
    label: 'Last',
    sub: props.lastTrip.place,
    value: props.lastTrip.headline,
    icon: MapPin,
    valueIsText: true,
  },
])
</script>

<template>
  <header class="flex flex-col gap-6 pb-8 sm:gap-8 sm:pb-10 lg:gap-6 lg:pb-0">
    <!-- Identity + actions -->
    <div
      class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8 lg:flex-col lg:justify-start lg:gap-5"
    >
      <div class="flex min-w-0 gap-4 sm:gap-5 lg:flex-col lg:gap-4">
        <img
          :src="profile.profile_photo"
          :alt="profile.name"
          class="h-20 w-20 shrink-0 rounded-full object-cover shadow-md ring-2 ring-teal-800/25 ring-offset-2 ring-offset-white sm:h-22 sm:w-22 lg:h-24 lg:w-24"
        />
        <div class="min-w-0 flex-1 pt-0.5 lg:pt-0">
          <h1 class="text-2xl font-bold tracking-tight text-black sm:text-[1.65rem]">
            {{ profile.name }}
          </h1>
          <p class="mt-0.5 text-sm text-teal-800">@{{ profile.username }}</p>
          <p class="mt-2 text-sm text-gray-600">
            <span class="font-medium text-teal-800">Homebase:</span>
            {{ profile.homebase }}
          </p>
          <p
            v-if="profile.bio"
            class="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500 lg:line-clamp-8"
          >
            {{ profile.bio }}
          </p>
        </div>
      </div>

      <div
        class="flex w-full gap-2 sm:w-auto sm:shrink-0 sm:flex-col sm:items-end sm:gap-2 lg:w-full lg:flex-row"
      >
        <button
          type="button"
          class="flex-1 rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-900 sm:flex-none sm:px-6 sm:py-2.5 lg:flex-1"
        >
          Follow
        </button>
        <button
          type="button"
          class="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-teal-800 shadow-sm ring-1 ring-teal-800/25 transition hover:bg-teal-800/6 sm:flex-none sm:px-6 sm:py-2 lg:flex-1"
        >
          Share
        </button>
      </div>
    </div>

    <!-- Stats: stacked list (all breakpoints) -->
    <div
      class="divide-y divide-stone-100 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-teal-800/15"
    >
      <div
        v-for="row in statRows"
        :key="row.id"
        class="flex items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3"
      >
        <component :is="row.icon" class="size-4 shrink-0 text-teal-800" :stroke-width="1.5" />
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-semibold uppercase tracking-wide text-teal-800">
            {{ row.label }}
          </p>
          <p class="text-[10px] text-gray-500">{{ row.sub }}</p>
        </div>
        <p
          class="shrink-0 text-right font-bold tabular-nums text-teal-950"
          :class="
            row.valueIsText
              ? 'max-w-[48%] text-xs leading-snug sm:max-w-[45%] sm:text-sm'
              : 'text-lg sm:text-xl md:text-2xl'
          "
        >
          {{ row.value }}
        </p>
      </div>
    </div>
  </header>
</template>
