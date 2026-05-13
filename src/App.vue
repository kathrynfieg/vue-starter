<script setup lang="ts">
export const mockUserProfile = {
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

const mockTrips = [
  {
    id: 't1',
    title: 'Japan Adventure',
    caption: 'Two weeks of slow mornings, city chaos, and way too much ramen',
    start_date: '2026-05-01',
    end_date: '2026-05-14',
    location_text: 'Japan',
    cover_image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c',
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
        photo_url: 'https://images.unsplash.com/photo-1526481280695-3c687fd5432c',
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
    cover_image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03',
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
        photo_url: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642',
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
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
</template>
