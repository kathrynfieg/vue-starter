<script setup lang="ts">
import { computed } from 'vue'
import type { Trip, UserProfile } from '@/types/journal'
import ProfileHeader from '@/components/ProfileHeader.vue'
import TripSection from '@/components/journal/TripSection.vue'

const mockUserProfile: UserProfile = {
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
    cover_image:
      'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
  {
    id: 't6',
    title: 'Tokyo City Nights',
    caption: 'Neon lights, late trains, and way too much convenience store food',
    start_date: '2026-03-11',
    end_date: '2026-03-16',
    location_text: 'Tokyo, Japan',
    cover_image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    memories: [
      {
        id: 'm17',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1505253213348-cd54c92b37c9',
        caption: 'Shibuya crossing at night',
        location_text: 'Shibuya',
        created_at: '2026-03-12',
      },
      {
        id: 'm18',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1526481280695-3c687fd5432c',
        caption: 'Quiet temple escape in the middle of chaos',
        location_text: 'Asakusa',
        created_at: '2026-03-13',
      },
      {
        id: 'm19',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c',
        caption: 'First ramen that changed everything',
        location_text: 'Shinjuku',
        created_at: '2026-03-14',
      },
    ],
  },

  {
    id: 't7',
    title: 'A Slow Week at Home',
    caption: 'No flights, no plans — just resetting life for a bit',
    start_date: '2026-02-01',
    end_date: '2026-02-07',
    location_text: 'Adelaide, Australia',
    cover_image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    memories: [
      {
        id: 'm20',
        type: 'text',
        text: 'I didn’t realise how much I needed a week with no plans. Just mornings with coffee and evenings where nothing is scheduled.',
        created_at: '2026-02-02',
      },
      {
        id: 'm21',
        type: 'text',
        text: 'Went for walks without my phone. It felt weird at first, then really nice.',
        created_at: '2026-02-03',
      },
      {
        id: 'm22',
        type: 'text',
        text: 'Sometimes the best trips are the ones where you don’t go anywhere.',
        created_at: '2026-02-05',
      },
    ],
  },

  {
    id: 't8',
    title: 'Coastal Photo Days',
    caption: 'Just chasing light along the coast for a few days',
    start_date: '2025-12-18',
    end_date: '2025-12-20',
    location_text: 'South Australia',
    cover_image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    memories: [
      {
        id: 'm23',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
        caption: 'Early morning light on empty beaches',
        location_text: 'Yorke Peninsula',
        created_at: '2025-12-18',
      },
      {
        id: 'm24',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
        caption: 'Windy cliffs and salty air',
        location_text: 'Clifftop trail',
        created_at: '2025-12-19',
      },
      {
        id: 'm25',
        type: 'photo',
        photo_url: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
        caption: 'Last sunset before heading home',
        location_text: 'Moana Beach',
        created_at: '2025-12-20',
      },
    ],
  },
]

const lastTripCard = computed(() => {
  const sorted = [...mockTrips].sort(
    (a, b) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime(),
  )
  const trip = sorted[0]
  if (!trip) return { headline: '—', place: '—' }

  for (let i = trip.memories.length - 1; i >= 0; i--) {
    const m = trip.memories[i]
    if (m.type === 'photo' && m.location_text) {
      return { headline: m.location_text, place: trip.location_text }
    }
  }
  return { headline: trip.title, place: trip.location_text }
})
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900 antialiased">
    <div
      class="mx-auto max-w-xl px-5 pb-16 pt-10 sm:max-w-2xl sm:px-8 lg:max-w-6xl xl:max-w-7xl"
    >
      <div
        class="flex flex-col lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:gap-12"
      >
        <aside
          class="lg:sticky lg:top-8 lg:self-start lg:border-r lg:border-gray-200 lg:pr-8 xl:pr-10"
        >
          <ProfileHeader :profile="mockUserProfile" :last-trip="lastTripCard" />
        </aside>

        <!-- Feed -->
        <main class="mt-10 min-w-0 space-y-6 lg:mt-0 lg:space-y-8">
          <p class="text-xs font-medium uppercase tracking-wide text-stone-500">Journal</p>

          <TripSection v-for="trip in mockTrips" :key="trip.id" :trip="trip" />
        </main>
      </div>
    </div>
  </div>
</template>
