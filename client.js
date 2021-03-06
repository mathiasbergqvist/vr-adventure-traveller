// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Location} from 'react-360-web';
import WebVRPolyfill from 'webvr-polyfill';
const polyfill = new WebVRPolyfill();

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('VrAdventureTraveller', { /* initial props */ }),
    r360.getDefaultSurface()
  );

  r360.renderToLocation(
    r360.createRoot('Models', { /* initial props */ }),
    new Location([0, 0.67, -1.8])
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
}

window.React360 = {init};
