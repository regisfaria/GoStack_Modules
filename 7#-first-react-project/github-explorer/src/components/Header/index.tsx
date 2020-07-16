import React from 'react';

import logoImg from '../../assets/logo.svg';
import { Title } from './styles';

const Header: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore GitHub Repositories</Title>
    </>
  );
};

export default Header;
