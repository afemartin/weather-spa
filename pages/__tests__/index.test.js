/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import Index from '../index.js'

describe('(Page) Index', () => {
  it('renders correctly', () => {
    const page = renderer.create(<Index />)
    const tree = page.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
