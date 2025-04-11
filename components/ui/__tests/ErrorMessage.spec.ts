import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorMessage from '../ErrorMessage.vue'

describe('ErrorMessage Component', () => {
  it('renders the error message correctly', () => {
    const wrapper = mount(ErrorMessage)
    
    expect(wrapper.exists()).toBe(true)
    
    expect(wrapper.find('h2').text()).toContain('Oops! Something went wrong')
    
    expect(wrapper.find('p').text()).toContain('We\'re having trouble loading content')
  })
}) 