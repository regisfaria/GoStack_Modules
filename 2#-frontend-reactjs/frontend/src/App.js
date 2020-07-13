import React, { useState, useEffect } from 'react'
import api from './services/api'

import Header from './components/Header'

import './App.css'

export default function App() {
  // useState returns a two-position array
  //
  // 1. Variable with it's initial value
  // 2. Function to update the first variable value
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repository created at ${Date.now()}`,
      url: `github.com/regis/${Date.now()}`,
      techs: "Node, ReactJS"
    })
    
    const repository = response.data

    setRepositories([...repositories, repository])
  }

  return (
    <>
      <Header title="repositories">
      <button type="button" onClick={handleAddRepository}>Create Repository</button>
        <ul>
          {repositories.map(repository => <li key={repository.id}>{repository.title}</li>)}
        </ul>
      </Header>
    </>
  )
}