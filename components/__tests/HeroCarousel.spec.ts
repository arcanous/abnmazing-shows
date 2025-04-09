import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HeroCarousel from '../HeroCarousel.vue'
import { mockShow } from '../../tests/mocks/shows'

// Mock the Nuxt components and Icon component
vi.mock('#components', () => ({
  Icon: {
    render: () => null
  },
  NuxtImg: {
    render: () => null
  },
  NuxtLink: {
    render: () => null
  }
}))

// Mock UiPill component
vi.mock('../ui/Pill.vue', () => ({
  default: {
    name: 'UiPill',
    render: () => null,
    props: ['text']
  }
}))

describe('HeroCarousel Component', () => {
  it('mounts without errors', () => {
    // Create an array of shows for testing
    const testShows = Array(3).fill(null).map(() => ({...mockShow}))
    
    const wrapper = shallowMount(HeroCarousel, {
      props: {
        shows: testShows
      },
      // Use shallow mounting and stubbing all components
      shallow: true,
      global: {
        stubs: {
          'Transition': true,
          'NuxtImg': true,
          'NuxtLink': true,
          'Icon': true,
          'UiPill': true
        }
      }
    })
    
    // Simple test to verify component mounts
    expect(wrapper.exists()).toBe(true)
  })
}) 