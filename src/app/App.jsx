import Providers from './providers';

/**
 * App — Root application component.
 *
 * Intentionally thin: delegates routing and providers
 * to the Providers component. This keeps App.jsx clean
 * and easy to test.
 */
function App() {
  return <Providers />;
}

export default App;
