import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { FavouritesProvider } from './modules/shared/context';
import { Root } from './modules/shared/components/Root';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <FavouritesProvider>
      <Root />
    </FavouritesProvider>
  </Router>,
);
