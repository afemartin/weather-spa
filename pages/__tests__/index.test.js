/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import Index from '../index.js'

describe('(Page) Index', () => {
  const props = {
    location: null,
    data: {},
    loading: false,
    error: null
  }
  it('renders correctly', () => {
    const page = renderer.create(<Index {...props} />)
    const tree = page.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
