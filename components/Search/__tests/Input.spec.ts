import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Input from '../Input.vue'

describe('Search Input Component', () => {
  it('emits update event when input changes', () => {
    const wrapper = shallowMount(Input, {
      props: {
        modelValue: '',
        isVisible: true
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    const input = wrapper.find('input')
    input.setValue('test query')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test query'])
  })
  
  it('shows clear button only when input has value', async () => {
    const wrapper = shallowMount(Input, {
      props: {
        modelValue: '',
        isVisible: true
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    // No clear button initially
    expect(wrapper.find('button').exists()).toBe(false)
    
    // Update the component with a value
    await wrapper.setProps({ modelValue: 'test' })
    
    // Clear button should now be visible
    expect(wrapper.find('button').exists()).toBe(true)
  })
  
  it('applies correct visibility classes', () => {
    // Visible state
    const visibleWrapper = shallowMount(Input, {
      props: {
        modelValue: '',
        isVisible: true
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    expect(visibleWrapper.classes()).toContain('w-full')
    expect(visibleWrapper.classes()).toContain('opacity-100')
    
    // Hidden state
    const hiddenWrapper = shallowMount(Input, {
      props: {
        modelValue: '',
        isVisible: false
      },
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    expect(hiddenWrapper.classes()).toContain('w-10')
    expect(hiddenWrapper.classes()).toContain('opacity-0')
  })
}) 