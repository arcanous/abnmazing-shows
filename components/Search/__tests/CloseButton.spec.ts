import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import CloseButton from '../CloseButton.vue'

describe('Search CloseButton Component', () => {
  it('emits click event when clicked', () => {
    const wrapper = shallowMount(CloseButton, {
      props: {
        animationStage: 3
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })
  
  it('applies correct class based on animation stage', () => {
    // When animation stage is less than 3
    const hiddenWrapper = shallowMount(CloseButton, {
      props: {
        animationStage: 2
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    expect(hiddenWrapper.classes()).toContain('opacity-0')
    
    // When animation stage is 3
    const visibleWrapper = shallowMount(CloseButton, {
      props: {
        animationStage: 3
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    expect(visibleWrapper.classes()).toContain('opacity-100')
  })
}) 