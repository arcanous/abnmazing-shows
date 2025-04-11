import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppHeader from '../AppHeader.vue'

const NuxtLinkStub = {
  template: '<a :href="to"><slot /></a>',
  props: ['to']
}

describe('AppHeader Component', () => {
  it('renders with navigation link to shows page', () => {
    const wrapper = shallowMount(AppHeader, {
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
          SearchComponent: true
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    
    const link = wrapper.findComponent(NuxtLinkStub)
    expect(link.attributes('href')).toBe('/shows')
    expect(link.text()).toContain('ABNmazing Shows')
  })

  it('includes search component', () => {
    const wrapper = shallowMount(AppHeader, {
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
          SearchComponent: true
        }
      }
    })
    
    const searchComponent = wrapper.find('.ml-auto')
    expect(searchComponent.exists()).toBe(true)
  })
}) 