import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GenreList from '../GenreList.vue'
import { mockShow } from '../../tests/mocks/shows'

// Mock the Nuxt components and Icon component
vi.mock('#components', () => ({
  Icon: {
    render: () => null
  },
  NuxtLink: {
    props: ['to'],
    template: '<div><slot /></div>'
  }
}))

// Mock ShowCard component
vi.mock('../ShowCard.vue', () => ({
  default: {
    name: 'ShowCard',
    render: () => null,
    props: ['show']
  }
}))

describe('GenreList Component', () => {
  const mockGenre = {
    name: 'Drama',
    shows: [
      mockShow, 
      {...mockShow, id: mockShow.id + 1}, 
      {...mockShow, id: mockShow.id + 2}
    ]
  }

  let wrapper: ReturnType<typeof shallowMount>;

  beforeEach(() => {
    wrapper = shallowMount(GenreList, {
      props: {
        genre: mockGenre
      },
      global: {
        stubs: {
          'Icon': true,
          'ShowCard': true
        }
      }
    })
  })

  it('renders genre name correctly', () => {
    const heading = wrapper.find('h2')
    expect(heading.text()).toBe('Drama')
  })

  it('renders correct number of show cards', () => {
    const showCards = wrapper.findAllComponents({ name: 'ShowCard' })
    expect(showCards.length).toBe(3)
  })

  it('formats the view all link with correct URL', () => {
    const link = wrapper.findComponent({ name: 'NuxtLink' })
    expect(link.props('to')).toBe('/genre/drama')
  })

  it('has correct initial scroll state values', () => {
    const vm = wrapper.vm as any
    expect(vm.canScrollLeft).toBe(false)
  })

  it('scrolls right when right button is clicked', async () => {
    const vm = wrapper.vm as any
    
    const scrollByMock = vi.fn()
    vm.scrollContainer = { 
      scrollBy: scrollByMock 
    }

    const rightButton = wrapper.find('button[aria-label="Scroll right"]')
    await rightButton.trigger('click')
    
    expect(scrollByMock).toHaveBeenCalledWith({
      left: 300,
      behavior: 'smooth'
    })
  })
  
  it('updates scroll indicators when scroll position changes', async () => {
    const vm = wrapper.vm as any
    
    const mockScrollContainer = {
      scrollLeft: 50,
      scrollWidth: 1000,
      clientWidth: 400
    }
    
    vm.scrollContainer = mockScrollContainer
    
    vm.checkScrollPosition()
    
    expect(vm.canScrollLeft).toBe(true)
    expect(vm.canScrollRight).toBe(true)
    
    mockScrollContainer.scrollLeft = 595  // scrollWidth - clientWidth - 5
    
    vm.checkScrollPosition()
    
    expect(vm.canScrollRight).toBe(false)
  })
}) 