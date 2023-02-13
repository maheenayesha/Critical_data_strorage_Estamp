import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme'
import Fir from './Fir';


it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Fir match={{ params: { id: "1" }, isExact: true, path: "/listalldata/:id", name: "Fir details" }} />
    </MemoryRouter>
  );
  expect(wrapper.containsMatchingElement(<strong>Samppa Nori</strong>)).toEqual(true)
  wrapper.unmount()
});
