// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next/script
jest.mock('next/script', () => {
  return function Script(props) {
    return props.dangerouslySetInnerHTML ? 
      <script dangerouslySetInnerHTML={props.dangerouslySetInnerHTML} id={props.id} /> : 
      <script src={props.src} />;
  };
})

// Mock window.gtag and window.dataLayer
global.window.gtag = jest.fn();
global.window.dataLayer = [];

// Mock the process.env.NODE_ENV
process.env = {
  ...process.env,
  NODE_ENV: 'test',
}; 