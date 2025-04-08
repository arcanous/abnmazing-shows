import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroCarousel from '../HeroCarousel.vue'
import { mockShow } from '../../tests/mocks/shows'

// Mock the NuxtImg component to avoid Nuxt-specific errors
vi.mock('#components', () => ({
  NuxtImg: {
    template: '<img />'
  }
}))

describe('HeroCarousel Component', () => {
  it('mounts without errors', () => {
    // Create an array of shows for testing
    const testShows = Array(3).fill(null).map(() => ({...mockShow}))
    
    const wrapper = mount(HeroCarousel, {
      props: {
        shows: testShows
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