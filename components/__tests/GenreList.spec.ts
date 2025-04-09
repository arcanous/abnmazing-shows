import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GenreList from '../GenreList.vue'
import { mockShow } from '../../tests/mocks/shows'

// Mock the Nuxt components and Icon component
vi.mock('#components', () => ({
  Icon: {
    render: () => null
  },
  NuxtLink: {
    render: () => null
  }
}))

// Mock ShowCard component
vi.mock('../ShowCard.vue', () => ({
  default: {
    name: 'ShowCard',
    render: () => null,
    props: ['show']
  }
}))

describe('GenreList Component', () => {
  it('mounts without errors', () => {
    // Create a mock genre with shows
    const mockGenre = {
      name: 'Drama',
      shows: [mockShow]
    }
    
    const wrapper = shallowMount(GenreList, {
      props: {
        genre: mockGenre
      },
      // Use shallow mounting and stubbing all components
      shallow: true,
      global: {
        stubs: {
          'NuxtLink': true,
          'Icon': true,
          'ShowCard': true
        }
      }
    })
    
    // Simple test to verify component mounts
    expect(wrapper.exists()).toBe(true)
  })
}) 