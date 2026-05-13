<script setup lang="ts">
import type { Trip } from '@/types/journal'
import TripSection from '@/components/journal/TripSection.vue'

const mockUserProfile = {
  id: 'u1',
  name: 'Kathryn Fieg',
  username: 'kathryntravels',
  profile_photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
  bio: 'Collecting small moments from big and small trips. Mostly sunsets, coffee, and camping nights.',
  homebase: 'Adelaide, Australia',
  countries_visited: ['Australia', 'Japan', 'Italy', 'New Zealand', 'Thailand', 'France'],
  stats: {
    trips: 12,
    memories: 87,
    photos: 42,
  },
}

const mockTrips: Trip[] = [
  {
    id: 't1',
    title: 'Japan Adventure',
    caption: 'Two weeks of slow mornings, city chaos, and way too much ramen',
    start_date: '2026-05-01',
    end_date: '2026-05-14',
    location_text: 'Japan',
    cover_image:
      'https://images.unsplash.com/photo-1728877648326-1e571d43c32b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    memories: [
      {
        id: 'm1',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989',
        caption: 'First night in Shibuya felt overwhelming in the best way',
        location_text: 'Tokyo',
        created_at: '2026-05-02',
      },
      {
        id: 'm2',
        type: 'quote',
        text: 'I didn’t realise how much I needed to slow down until I got here',
        created_at: '2026-05-03',
      },
      {
        id: 'm3',
        type: 'photo',
        photo_url:
          'https://images.unsplash.com/photo-1717649389730-ba6d16053b43?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        caption: 'Kyoto temples in the early morning fog',
        location_text: 'Kyoto',
        created_at: '2026-05-07',
      },
      {
        id: 'm4',
        type: 'qa',
        question: 'Best moment of the trip?',
        answer: 'Walking through Kyoto at sunrise with no crowds',
        created_at: '2026-05-08',
      },
      {
        id: 'm5',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
        caption: 'Late night ramen after getting lost in Osaka',
        location_text: 'Osaka',
        created_at: '2026-05-10',
      },
    ],
  },
  {
    id: 't2',
    title: 'Great Ocean Road Camping',
    caption: 'No reception, no plans, just cliffs, fire, and ocean sounds',
    start_date: '2026-04-18',
    end_date: '2026-04-20',
    location_text: 'Victoria, Australia',
    cover_image:
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    memories: [
      {
        id: 'm6',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        caption: 'Camp setup right on the cliffs',
        location_text: 'Apollo Bay',
        created_at: '2026-04-18',
      },
      {
        id: 'm7',
        type: 'list',
        title: 'What made this trip perfect',
        items: ['No phone reception', 'Fire cooked dinner', 'Ocean sounds at night', 'Zero plans'],
        created_at: '2026-04-19',
      },
      {
        id: 'm8',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
        caption: 'Twelve Apostles at sunset',
        location_text: 'Great Ocean Road',
        created_at: '2026-04-19',
      },
    ],
  },
  {
    id: 't3',
    title: 'Adelaide Hills Weekend Escape',
    caption: 'Slow mornings, foggy hills, and coffee that lasted too long',
    start_date: '2026-03-08',
    end_date: '2026-03-10',
    location_text: 'South Australia',
    cover_image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    memories: [
      {
        id: 'm9',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        caption: 'Morning coffee with fog rolling over the hills',
        location_text: 'Hahndorf',
        created_at: '2026-03-09',
      },
      {
        id: 'm10',
        type: 'quote',
        text: 'Slow weekends are underrated',
        created_at: '2026-03-09',
      },
    ],
  },
  {
    id: 't4',
    title: 'Italy Summer Days',
    caption: 'Walked everywhere, ate everything, and never checked the time',
    start_date: '2025-06-10',
    end_date: '2025-06-22',
    location_text: 'Italy',
    cover_image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0',
    memories: [
      {
        id: 'm11',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0',
        caption: 'Venice canals at golden hour',
        location_text: 'Venice',
        created_at: '2025-06-12',
      },
      {
        id: 'm12',
        type: 'qa',
        question: 'What surprised you most?',
        answer: 'How small and walkable everything felt',
        created_at: '2025-06-13',
      },
      {
        id: 'm13',
        type: 'photo',
        photo_url:
          'https://images.unsplash.com/photo-1686199859328-7660f648e70d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXRhbHklMjBwYXN0YXxlbnwwfHwwfHx8Mg%3D%3D',
        caption: 'Pasta that ruined all future pasta for me',
        location_text: 'Rome',
        created_at: '2025-06-16',
      },
    ],
  },
  {
    id: 't5',
    title: 'Flinders Ranges Camping Trip',
    caption: 'Red dirt roads, freezing nights, and the clearest sky I’ve ever seen',
    start_date: '2025-10-02',
    end_date: '2025-10-05',
    location_text: 'South Australia',
    cover_image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
    memories: [
      {
        id: 'm14',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
        caption: 'Endless red roads',
        location_text: 'Flinders Ranges',
        created_at: '2025-10-03',
      },
      {
        id: 'm15',
        type: 'list',
        title: 'Things I didn’t expect to matter',
        items: ['Warm jacket at night', 'Good coffee', 'No reception', 'Just sitting still'],
        created_at: '2025-10-04',
      },
      {
        id: 'm16',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
        caption: 'Stars felt unreal here',
        location_text: 'Wilpena Pound',
        created_at: '2025-10-04',
      },
    ],
  },
]
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-stone-900 antialiased">
    <div class="mx-auto max-w-xl px-5 pb-16 pt-10 sm:max-w-2xl sm:px-8">
      <!-- Profile -->
      <header class="border-b border-stone-200 pb-10">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
          <img
            :src="mockUserProfile.profile_photo"
            :alt="mockUserProfile.name"
            class="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-teal-800/20"
          />
          <div class="min-w-0 flex-1 space-y-3">
            <div>
              <h1 class="text-2xl font-semibold tracking-tight text-stone-900">
                {{ mockUserProfile.name }}
              </h1>
              <p class="mt-0.5 text-sm text-teal-800">@{{ mockUserProfile.username }}</p>
            </div>
            <p class="text-sm leading-relaxed text-stone-600">
              {{ mockUserProfile.bio }}
            </p>
            <p class="text-sm text-stone-700">
              <span class="font-medium text-stone-900">Homebase</span>
              <span class="text-stone-400"> · </span>
              {{ mockUserProfile.homebase }}
            </p>
            <div>
              <p class="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">
                Countries visited
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="country in mockUserProfile.countries_visited"
                  :key="country"
                  class="rounded-full border border-teal-800/25 bg-white px-3 py-1 text-xs font-medium text-teal-900"
                >
                  {{ country }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <dl
          class="mt-8 grid grid-cols-3 gap-4 border-t border-stone-200 pt-8 text-center sm:text-left"
        >
          <div>
            <dt class="text-xs font-medium uppercase tracking-wide text-stone-500">Trips</dt>
            <dd class="mt-1 text-xl font-semibold tabular-nums text-teal-900">
              {{ mockUserProfile.stats.trips }}
            </dd>
          </div>
          <div>
            <dt class="text-xs font-medium uppercase tracking-wide text-stone-500">Memories</dt>
            <dd class="mt-1 text-xl font-semibold tabular-nums text-teal-900">
              {{ mockUserProfile.stats.memories }}
            </dd>
          </div>
          <div>
            <dt class="text-xs font-medium uppercase tracking-wide text-stone-500">Photos</dt>
            <dd class="mt-1 text-xl font-semibold tabular-nums text-teal-900">
              {{ mockUserProfile.stats.photos }}
            </dd>
          </div>
        </dl>
      </header>

      <!-- Feed -->
      <main class="mt-12 space-y-6">
        <p class="text-xs font-medium uppercase tracking-wide text-stone-500">Journal</p>

        <TripSection v-for="trip in mockTrips" :key="trip.id" :trip="trip" />
      </main>
    </div>
  </div>
</template>
