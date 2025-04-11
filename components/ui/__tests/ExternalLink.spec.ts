import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ExternalLink from '../ExternalLink.vue'

describe('ExternalLink Component', () => {
  it('renders with correct props and attributes', () => {
    const props = {
      href: 'https://example.com',
      text: 'Visit Website',
      color: 'blue' as const
    }
    
    const wrapper = shallowMount(ExternalLink, {
      props,
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    
    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe(props.href)
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener')
    
    expect(wrapper.text()).toContain(props.text)
    
  })
}) 