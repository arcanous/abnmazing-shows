import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ShowCard from '../ShowCard.vue'
import { mockShow } from '../../tests/mocks/shows'

const NuxtLinkStub = {
  template: '<a :href="to"><slot /></a>',
  props: ['to']
}

const NuxtImgStub = {
  template: '<img :src="src" :alt="alt" />',
  props: ['src', 'alt', 'width', 'height']
}

describe('ShowCard Component', () => {
  it('renders with correct props and links to show detail page', () => {
    const wrapper = shallowMount(ShowCard, {
      props: {
        show: mockShow
      },
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
          NuxtImg: NuxtImgStub
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    
    const link = wrapper.findComponent(NuxtLinkStub)
    expect(link.attributes('href')).toBe(`/shows/${mockShow.id}`)
    
    expect(wrapper.text()).toContain(mockShow.name)
  })
  
  it('displays rating when available', () => {
    const show = { ...mockShow }
    
    const wrapper = shallowMount(ShowCard, {
      props: { show },
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
          NuxtImg: NuxtImgStub
        }
      }
    })
    
    const ratingDiv = wrapper.find('.flex.items-center')
    expect(ratingDiv.exists()).toBe(true)
    expect(ratingDiv.text()).toContain(show.rating.average)
  })
}) 