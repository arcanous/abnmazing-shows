import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from '../LoadingSpinner.vue'

describe('LoadingSpinner Component', () => {
  it('renders the spinner and loading text', () => {
    const wrapper = mount(LoadingSpinner)
    
    expect(wrapper.exists()).toBe(true)
    
    const spinner = wrapper.find('.animate-spin')
    expect(spinner.exists()).toBe(true)
    
    expect(wrapper.text()).toContain('Loading...')
  })
}) 