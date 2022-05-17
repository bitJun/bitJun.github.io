import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Index from './pages/index/index';
import Detail from './pages/detail';

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </HashRouter>
  );
};
export default Router;
