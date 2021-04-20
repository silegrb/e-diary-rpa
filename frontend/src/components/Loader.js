import React from 'react';
import Spinner from 'react-loader-spinner';

const Loader = () => (
  <div className="w-100 h-100 d-flex justify-content-center align-items-center">
    <Spinner type="Bars" color="#FFFFFF" height={80} width={80} />
  </div>
);

export default Loader;
