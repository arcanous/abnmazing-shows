import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BackButton from '../BackButton.vue'

const NuxtLinkStub = {
  template: '<a :href="to"><slot /></a>',
  props: ['to']
}

describe('BackButton Component', () => {
  it('renders with correct props and link', () => {
    const props = {
      to: '/test-route',
      text: 'Go Back'
    }
    
    const wrapper = shallowMount(BackButton, {
      props,
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
          Icon: true
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    
    const link = wrapper.findComponent(NuxtLinkStub)
    expect(link.attributes('href')).toBe(props.to)
    
    expect(wrapper.text()).toContain(props.text)
  })
}) 