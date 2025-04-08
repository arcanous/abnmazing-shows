import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TVShow from '../TVShow.vue'

// Import the mock data from the centralized location
import { mockShow } from '../../tests/mocks/shows'

describe('TVShow Component', () => {
  it('renders properly', () => {
    const wrapper = mount(TVShow, {
      props: {
        show: mockShow
      }
    })
    
    // Simple test to verify component renders
    expect(wrapper.exists()).toBe(true)
    
    // Verify show name is displayed
    expect(wrapper.text()).toContain('Under the Dome')
    
    // Verify rating is displayed
    expect(wrapper.text()).toContain('Rating: 6.5')
  })
})
