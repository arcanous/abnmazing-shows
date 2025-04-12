import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from '../Index.vue'

describe('Search Component', () => {
  it('renders without errors', () => {
    const wrapper = shallowMount(Component, {
      global: {
        stubs: {
          SearchButton: true,
          SearchInput: true,
          SearchOverlay: true,
          SearchResults: true,
          SearchCloseButton: true,
          Teleport: true,
          NuxtLink: true
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
  })
}) 