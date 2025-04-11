import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pill from '../Pill.vue'

describe('Pill Component', () => {
  it('renders the text prop correctly', () => {
    const text = 'Action'
    const wrapper = mount(Pill, {
      props: { text }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toBe(text)
    expect(wrapper.classes()).toContain('px-3')
  })
}) 