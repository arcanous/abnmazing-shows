import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SectionHeader from '../SectionHeader.vue'

describe('SectionHeader Component', () => {
  it('renders with correct title', () => {
    const props = {
      title: 'Test Section',
      icon: 'test-icon'
    }
    
    const wrapper = shallowMount(SectionHeader, {
      props,
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    
    expect(wrapper.text()).toContain(props.title)
  })
}) 