import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';
import CheerPage from 'pages/CheerPage';
import EventPage from 'pages/EventPage';
import NavBar from 'components/NavBar';
import Error from 'pages/Error';

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cheer/:userUrl" element={<CheerPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
