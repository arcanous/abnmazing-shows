import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PaginationLoader from '../PaginationLoader.vue'

describe('PaginationLoader Component', () => {
  it('renders the loading spinner', () => {
    const wrapper = mount(PaginationLoader)
    
    expect(wrapper.exists()).toBe(true)
    
    const spinner = wrapper.find('.animate-spin')
    expect(spinner.exists()).toBe(true)
    expect(spinner.classes()).toContain('border-t-transparent')
  })
}) 