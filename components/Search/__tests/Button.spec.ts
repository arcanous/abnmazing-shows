import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Search Button Component', () => {
  it('emits click event when clicked', () => {
    const wrapper = shallowMount(Button, {
      global: {
        stubs: {
          Icon: true
        }
      }
    })
    
    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })
}) 