import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import HeroCarousel from '../HeroCarousel.vue'
import { mockShow } from '../../tests/mocks/shows'

// Mock the window setInterval and clearInterval functions
vi.stubGlobal('setInterval', vi.fn(() => 123))
vi.stubGlobal('clearInterval', vi.fn())

// Mock the Nuxt components and Icon component
vi.mock('#components', () => ({
  Icon: {
    render: () => null
  },
  NuxtImg: {
    render: () => null
  },
  NuxtLink: {
    render: () => null
  }
}))

// Mock UiPill component
vi.mock('../ui/Pill.vue', () => ({
  default: {
    name: 'UiPill',
    render: () => null,
    props: ['text']
  }
}))

describe('HeroCarousel Component', () => {
  const testShows = [
    { ...mockShow, id: 1, name: 'Show 1', summary: 'This is a summary for show 1' },
    { ...mockShow, id: 2, name: 'Show 2', summary: 'This is a summary for show 2' },
    { ...mockShow, id: 3, name: 'Show 3', summary: 'This is a summary for show 3' }
  ]
  
  let wrapper: VueWrapper;
  
  beforeEach(() => {
    vi.clearAllMocks()
    
    wrapper = shallowMount(HeroCarousel, {
      props: {
        shows: testShows
      },
      global: {
        stubs: {
          'Transition': true,
          'NuxtImg': true,
          'NuxtLink': true,
          'Icon': true,
          'UiPill': true
        }
      }
    })
  })
  
  afterEach(() => {
    wrapper.unmount()
  })
  
  it('displays the first show by default', () => {
    const showTitle = wrapper.find('h2')
    expect(showTitle.text()).toBe('Show 1')
  })
  
  it('starts the carousel rotation timer on mount', () => {
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 10000)
    
    wrapper.unmount()
    expect(clearInterval).toHaveBeenCalled()
  })
  
  it('allows manual navigation between shows', async () => {
    const navButtons = wrapper.findAll('.h-3.rounded-full')
    expect(navButtons.length).toBe(3)
    
    await navButtons[1].trigger('click')
    
    const showTitle = wrapper.find('h2')
    expect(showTitle.text()).toBe('Show 2')
    
    expect(clearInterval).toHaveBeenCalled()
    expect(setInterval).toHaveBeenCalledTimes(2) // Once on mount, once after click
  })
  
  it('correctly truncates show summaries', () => {
    const vm = wrapper.vm as any
    
    const shortSummary = 'Short summary'
    expect(vm.truncatedSummary(shortSummary)).toBe(shortSummary)
    
    const longSummary = 'a'.repeat(250)
    const truncated = vm.truncatedSummary(longSummary)
    expect(truncated.length).toBeLessThan(longSummary.length)
    expect(truncated.endsWith('...')).toBe(true)
    
    const htmlSummary = '<p>This is a <strong>formatted</strong> summary</p>'
    expect(vm.truncatedSummary(htmlSummary)).not.toContain('<')
  })
}) 