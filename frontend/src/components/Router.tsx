import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Error from '../Error';

function AppRouter(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/error" element={<Error />} />
        {/* 나중에 path "*" 로 변경 */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
