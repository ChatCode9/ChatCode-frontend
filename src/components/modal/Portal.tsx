import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
  containerId: string;
}

const Portal: React.FC<PortalProps> = ({ children, containerId }) => {
  const container = document.getElementById(containerId);
  return container ? ReactDOM.createPortal(children, container) : null;
};

export default Portal;