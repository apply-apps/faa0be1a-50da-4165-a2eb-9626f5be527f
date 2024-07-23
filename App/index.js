// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Casino Games</Text>
      <GameHome />
    </SafeAreaView>
  );
};

const GameHome = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRollResult = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://apihub.p.appply.xyz:3300/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant. Please provide answers for given requests.',
            },
            {
              role: 'user',
              content: 'Roll a dice and give me the result',
            },
          ],
          model: 'gpt-4o',
        }),
      });

      const result = await response.json();
      setResult(result.response);
    } catch (error) {
      setResult('Error fetching the result');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.homeContainer}>
      <TouchableOpacity style={styles.button} onPress={fetchRollResult}>
        <Text style={styles.buttonText}>Roll Dice</Text>
      </TouchableOpacity>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        result && <Text style={styles.resultText}>Result: {result}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#ECF0F1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F39C12',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  loadingText: {
    fontSize: 18,
    color: '#555555',
  },
  resultText: {
    fontSize: 18,
    color: '#27AE60',
  },
});

export default App;