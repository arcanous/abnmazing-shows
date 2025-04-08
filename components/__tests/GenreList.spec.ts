import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GenreList from '../GenreList.vue'

// Mock the NuxtImg component to avoid Nuxt-specific errors
vi.mock('#components', () => ({
  NuxtImg: {
    template: '<img />'
  }
}))

describe('GenreList Component', () => {
  it('mounts without errors', () => {
    // Create a minimal mock TV show that satisfies the TypeScript interface
    const mockShow = {
      id: 1,
      url: 'https://example.com',
      name: 'Test Show',
      type: 'Scripted',
      language: 'English',
      genres: ['Drama'],
      status: 'Running',
      runtime: 60,
      averageRuntime: 60,
      premiered: '2020-01-01',
      ended: null,
      officialSite: null,
      schedule: { time: '20:00', days: ['Monday'] },
      rating: { average: 8.5 },
      weight: 95,
      network: {
        id: 1,
        name: 'Test Network',
        country: { name: 'United States', code: 'US', timezone: 'America/New_York' },
        officialSite: null
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: null, thetvdb: null, imdb: 'tt0000000' },
      image: { medium: 'test-image.jpg', original: 'test-image-large.jpg' },
      summary: '<p>Test summary</p>',
      updated: 123456789,
      _links: { self: { href: 'https://api.example.com/shows/1' } }
    }

    // Create a mock genre with shows
    const mockGenre = {
      name: 'Drama',
      shows: [mockShow]
    }
    
    const wrapper = mount(GenreList, {
      props: {
        genre: mockGenre
      },
      global: {
        stubs: {
          NuxtImg: true
        }
      }
    })
    
    // Simple test to verify component mounts
    expect(wrapper.exists()).toBe(true)
  })
}) 