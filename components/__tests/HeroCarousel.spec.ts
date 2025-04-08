import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroCarousel from '../HeroCarousel.vue'
import { mockShow } from '../../tests/mocks/shows'

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
          // Stub all Nuxt components that cause issues in tests
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    
    // Simple test to verify component mounts
    expect(wrapper.exists()).toBe(true)
  })
}) 