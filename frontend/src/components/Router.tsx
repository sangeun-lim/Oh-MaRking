import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import CheerPage from '../pages/CheerPage';
import EventPage from '../pages/EventPage';
import Error from '../pages/Error';
import NavBar from './NavBar';
import CallBack from '../pages/CallBack';

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cheer/:codedEmail" element={<CheerPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/callback" element={<CallBack />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
