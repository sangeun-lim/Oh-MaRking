import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Error(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 5000);
  }, [navigate]);

  return (
    <div>
      <h1>존재하지 않는 페이지 입니다.</h1>
    </div>
  );
}

export default Error;
