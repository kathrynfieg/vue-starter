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
  class: 'size-3.5 shrink-0 text-gray-500',
  strokeWidth: 1.5,
} as const
</script>

<template>
  <header>
    <!-- Top: avatar, identity, actions -->
    <div
      class="flex flex-col gap-6 pb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:pb-10"
    >
      <div class="flex min-w-0 gap-4 sm:gap-5">
        <img
          :src="profile.profile_photo"
          :alt="profile.name"
          class="h-20 w-20 shrink-0 rounded-full object-cover shadow-md ring-4 ring-white sm:h-[5.5rem] sm:w-[5.5rem]"
        />
        <div class="min-w-0 pt-0.5">
          <h1 class="text-2xl font-bold tracking-tight text-black sm:text-[1.65rem]">
            {{ profile.name }}
          </h1>
          <p class="mt-0.5 text-sm text-gray-500">@{{ profile.username }}</p>
          <p class="mt-2 text-sm text-gray-600">
            <span class="font-medium text-gray-800">Homebase:</span>
            {{ profile.homebase }}
          </p>
          <p v-if="profile.bio" class="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
            {{ profile.bio }}
          </p>
        </div>
      </div>

      <div class="flex shrink-0 flex-row gap-2 sm:flex-col sm:items-end">
        <button
          type="button"
          class="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
        >
          Follow
        </button>
        <button
          type="button"
          class="rounded-lg bg-white px-6 py-2 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
        >
          Share
        </button>
      </div>
    </div>

    <!-- Stat cards -->
    <div class="border-b border-gray-200 pb-8">
      <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div class="flex flex-col rounded-xl bg-white px-4 py-4 shadow-sm ring-1 ring-gray-200">
          <p class="text-xs font-medium text-gray-500">Countries</p>
          <p class="mt-2 text-2xl font-bold tabular-nums text-black">
            {{ profile.countries_visited.length }}
          </p>
          <div class="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
            <Globe v-bind="iconProps" />
            <span>Visited</span>
          </div>
        </div>

        <div class="flex flex-col rounded-xl bg-white px-4 py-4 shadow-sm ring-1 ring-gray-200">
          <p class="text-xs font-medium text-gray-500">Trips</p>
          <p class="mt-2 text-2xl font-bold tabular-nums text-black">
            {{ profile.stats.trips }}
          </p>
          <div class="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
            <Route v-bind="iconProps" />
            <span>Journeys</span>
          </div>
        </div>

        <div class="flex flex-col rounded-xl bg-white px-4 py-4 shadow-sm ring-1 ring-gray-200">
          <p class="text-xs font-medium text-gray-500">Memories</p>
          <p class="mt-2 text-2xl font-bold tabular-nums text-black">
            {{ profile.stats.memories }}
          </p>
          <div class="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
            <Camera v-bind="iconProps" />
            <span>Photos</span>
          </div>
        </div>

        <div class="flex flex-col rounded-xl bg-white px-4 py-4 shadow-sm ring-1 ring-gray-200">
          <p class="text-xs font-medium text-gray-500">Last</p>
          <p class="mt-2 line-clamp-2 text-xl font-bold leading-snug text-black">
            {{ lastTrip.headline }}
          </p>
          <div class="mt-3 flex min-w-0 items-center gap-1.5 text-xs text-gray-500">
            <MapPin v-bind="iconProps" />
            <span class="truncate">{{ lastTrip.place }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
