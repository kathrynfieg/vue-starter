<script setup lang="ts">
import { Camera, Globe, MapPin, Route } from 'lucide-vue-next'
import type { UserProfile } from '@/types/journal'

defineProps<{
  profile: UserProfile
  lastTrip: {
    headline: string
    place: string
  }
}>()

const iconProps = {
  class: 'size-3 shrink-0 text-teal-800 sm:size-3.5',
  strokeWidth: 1.5,
} as const
</script>

<template>
  <header>
    <!-- Top: avatar, identity, actions -->
    <div
      class="flex flex-col gap-5 pb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:pb-10"
    >
      <div class="flex min-w-0 gap-4 sm:gap-5">
        <img
          :src="profile.profile_photo"
          :alt="profile.name"
          class="h-20 w-20 shrink-0 rounded-full object-cover shadow-md ring-2 ring-teal-800/25 ring-offset-2 ring-offset-white sm:h-[5.5rem] sm:w-[5.5rem]"
        />
        <div class="min-w-0 flex-1 pt-0.5">
          <h1 class="text-2xl font-bold tracking-tight text-black sm:text-[1.65rem]">
            {{ profile.name }}
          </h1>
          <p class="mt-0.5 text-sm text-teal-800">@{{ profile.username }}</p>
          <p class="mt-2 text-sm text-gray-600">
            <span class="font-medium text-teal-800">Homebase:</span>
            {{ profile.homebase }}
          </p>
          <p v-if="profile.bio" class="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
            {{ profile.bio }}
          </p>
        </div>
      </div>

      <div class="flex w-full gap-2 sm:w-auto sm:shrink-0 sm:flex-col sm:items-end sm:gap-2">
        <button
          type="button"
          class="flex-1 rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-900 sm:flex-none sm:px-6 sm:py-2.5"
        >
          Follow
        </button>
        <button
          type="button"
          class="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-teal-800 shadow-sm ring-1 ring-teal-800/25 transition hover:bg-teal-800/6 sm:flex-none sm:px-6 sm:py-2"
        >
          Share
        </button>
      </div>
    </div>

    <!-- Stat cards: always 4 columns -->
    <div class="border-b border-gray-200 pb-8">
      <div class="grid grid-cols-4 items-stretch gap-1.5 sm:gap-3 md:gap-4">
        <div
          class="flex h-full min-h-0 min-w-0 flex-col items-center rounded-xl bg-white px-1.5 py-3 text-center shadow-sm ring-1 ring-teal-800/15 sm:items-start sm:px-4 sm:py-4 sm:text-left"
        >
          <p
            class="shrink-0 text-[9px] font-semibold uppercase leading-tight tracking-wide text-teal-800 sm:text-xs sm:tracking-wide"
          >
            Countries
          </p>
          <p class="mt-1.5 shrink-0 text-lg font-bold tabular-nums text-teal-950 sm:mt-2 sm:text-2xl">
            {{ profile.countries_visited.length }}
          </p>
          <div
            class="mt-auto flex w-full flex-col items-center gap-0.5 pt-2 text-gray-600 sm:flex-row sm:items-center sm:justify-start sm:gap-1.5 sm:pt-3 sm:text-xs"
          >
            <Globe v-bind="iconProps" />
            <span class="text-[9px] text-teal-800 sm:text-xs">Visited</span>
          </div>
        </div>

        <div
          class="flex h-full min-h-0 min-w-0 flex-col items-center rounded-xl bg-white px-1.5 py-3 text-center shadow-sm ring-1 ring-teal-800/15 sm:items-start sm:px-4 sm:py-4 sm:text-left"
        >
          <p class="shrink-0 text-[9px] font-semibold uppercase leading-tight tracking-wide text-teal-800 sm:text-xs">
            Trips
          </p>
          <p class="mt-1.5 shrink-0 text-lg font-bold tabular-nums text-teal-950 sm:mt-2 sm:text-2xl">
            {{ profile.stats.trips }}
          </p>
          <div
            class="mt-auto flex w-full flex-col items-center gap-0.5 pt-2 text-gray-600 sm:flex-row sm:items-center sm:justify-start sm:gap-1.5 sm:pt-3 sm:text-xs"
          >
            <Route v-bind="iconProps" />
            <span class="text-[9px] text-teal-800 sm:text-xs">Journeys</span>
          </div>
        </div>

        <div
          class="flex h-full min-h-0 min-w-0 flex-col items-center rounded-xl bg-white px-1.5 py-3 text-center shadow-sm ring-1 ring-teal-800/15 sm:items-start sm:px-4 sm:py-4 sm:text-left"
        >
          <p
            class="shrink-0 text-[9px] font-semibold uppercase leading-tight tracking-wide text-teal-800 sm:text-xs"
          >
            Memories
          </p>
          <p class="mt-1.5 shrink-0 text-lg font-bold tabular-nums text-teal-950 sm:mt-2 sm:text-2xl">
            {{ profile.stats.memories }}
          </p>
          <div
            class="mt-auto flex w-full flex-col items-center gap-0.5 pt-2 text-gray-600 sm:flex-row sm:items-center sm:justify-start sm:gap-1.5 sm:pt-3 sm:text-xs"
          >
            <Camera v-bind="iconProps" />
            <span class="text-[9px] text-teal-800 sm:text-xs">Photos</span>
          </div>
        </div>

        <div
          class="flex h-full min-h-0 min-w-0 flex-col items-center rounded-xl bg-white px-1.5 py-3 text-center shadow-sm ring-1 ring-teal-800/15 sm:items-start sm:px-4 sm:py-4 sm:text-left"
        >
          <p class="shrink-0 text-[9px] font-semibold uppercase leading-tight tracking-wide text-teal-800 sm:text-xs">
            Last
          </p>
          <p
            class="mt-1.5 line-clamp-2 shrink-0 text-[11px] font-bold leading-tight text-teal-950 sm:mt-2 sm:text-xl sm:leading-snug"
          >
            {{ lastTrip.headline }}
          </p>
          <div
            class="mt-auto flex min-w-0 w-full flex-col items-center gap-0.5 pt-2 text-gray-600 sm:flex-row sm:items-center sm:justify-start sm:gap-1.5 sm:pt-3 sm:text-xs"
          >
            <MapPin v-bind="iconProps" />
            <span class="line-clamp-2 max-w-full text-[9px] text-teal-800 sm:truncate sm:text-xs">{{
              lastTrip.place
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
