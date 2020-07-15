import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer"/>
      <Title>Explore GitHub Repositories</Title>

      <Form action="">
        <input placeholder="Repository name" />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img src="https://avatars0.githubusercontent.com/u/44659603?s=460&u=9418cb394da1cdc1c4e103f1df7cad33009c595e&v=4" alt='regisfaria'/>
          <div>
            <strong>regisfaria/regisfaria.github.io</strong>
            <p>My portifolio desinged in HTML and CSS</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img src="https://avatars0.githubusercontent.com/u/44659603?s=460&u=9418cb394da1cdc1c4e103f1df7cad33009c595e&v=4" alt='regisfaria'/>
          <div>
            <strong>regisfaria/regisfaria.github.io</strong>
            <p>My portifolio desinged in HTML and CSS</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img src="https://avatars0.githubusercontent.com/u/44659603?s=460&u=9418cb394da1cdc1c4e103f1df7cad33009c595e&v=4" alt='regisfaria'/>
          <div>
            <strong>regisfaria/regisfaria.github.io</strong>
            <p>My portifolio desinged in HTML and CSS</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
