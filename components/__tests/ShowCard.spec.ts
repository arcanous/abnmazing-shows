import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowCard from '../ShowCard.vue'
import { mockShow } from '../../tests/mocks/shows'

describe('ShowCard Component', () => {
  it('mounts without errors', () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: mockShow
      },
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    
    // Simple test to verify component mounts
    expect(wrapper.exists()).toBe(true)
  })
}) 