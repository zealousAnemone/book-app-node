import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import DupePopup from './components/DupePopup';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render popup with text correctly', () => {
  act(() => {
    ReactDOM.render(<DupePopup dupe="Llama Llama Red Pajama" />, container);
  });
  const text = container.querySelector('p');
  expect(text.textContent).toBe(
    'Which book is Llama Llama Red Pajama a duplicate of?'
  );
});
