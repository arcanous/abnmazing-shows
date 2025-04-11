import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Overlay from '../Overlay.vue'

describe('Search Overlay Component', () => {
  it('emits close event when clicking overlay background', () => {
    const wrapper = shallowMount(Overlay, {
      props: {
        modelValue: '',
        animationStage: 1
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    wrapper.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close')?.length).toBe(1)
  })
  
  it('emits update:modelValue when input changes', () => {
    const wrapper = shallowMount(Overlay, {
      props: {
        modelValue: '',
        animationStage: 1
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    const input = wrapper.find('input')
    input.setValue('test query')
    input.trigger('input')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
  
  it('applies animation classes based on animationStage prop', () => {
    // Hidden state
    const hiddenWrapper = shallowMount(Overlay, {
      props: {
        modelValue: '',
        animationStage: 0
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    const searchContainer = hiddenWrapper.find('.flex.items-center.bg-gray-800\\/70')
    expect(searchContainer.classes()).toContain('scale-90')
    expect(searchContainer.classes()).toContain('opacity-0')
    
    // Visible state
    const visibleWrapper = shallowMount(Overlay, {
      props: {
        modelValue: '',
        animationStage: 1
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    const visibleSearchContainer = visibleWrapper.find('.flex.items-center.bg-gray-800\\/70')
    expect(visibleSearchContainer.classes()).toContain('scale-100')
    expect(visibleSearchContainer.classes()).toContain('opacity-100')
  })
}) 