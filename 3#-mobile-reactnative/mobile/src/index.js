import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity, Button} from 'react-native'
import api from './services/api'

export default function App() {
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
      techs: "Node, ReactNative"
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <Text style={styles.title}>{repository.title}</Text>
          )}
        />
        
        <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddRepository}>
          <Text style={styles.buttonText}>Add Repository</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1"
  },

  title: {
    color: '#FFF',
    fontSize: 20
  },

  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    width:200,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
})