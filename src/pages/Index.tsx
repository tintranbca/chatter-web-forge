
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index: React.FC = () => {
  // Redirect to conversations page
  return <Navigate to="/conversations" replace />;
};

export default Index;
