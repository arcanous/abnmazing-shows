import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GenreList from '../GenreList.vue'
import { mockShow } from '../../tests/mocks/shows'

describe('GenreList Component', () => {
  it('mounts without errors', () => {
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
          // Stub out all Nuxt components that cause issues in tests
          ShowCard: true,
          NuxtLink: true
        }
      }
    })
    
    // Simple test to verify component mounts
    expect(wrapper.exists()).toBe(true)
  })
}) 