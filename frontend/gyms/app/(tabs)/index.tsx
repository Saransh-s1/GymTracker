import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

const App = () => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCircleColor = (data_percent) => {
    if (data_percent > 80) return 'red';
    if (data_percent >= 30) return 'yellow';
    return 'green';
  };

  const fetchGyms = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://10.110.200.251:8000/gyms");
      const data = await response.json();
      setGyms(data);
    } catch (error) {
      console.error("Error fetching gyms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGyms();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gym List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : gyms.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {gyms.map((gym, index) => (
            <View key={index} style={styles.gymContainer}>
              <View style={[styles.circle, { backgroundColor: getCircleColor(gym.data_percent) }]}>
                <Text style={styles.percentText}>{Math.round(gym.data_percent)}%</Text>
              </View>
              <Text style={styles.gymText}>{gym.name}, {gym.last_count}, {gym.last_updated}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.gymText}>No gyms available</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={fetchGyms}
        >
          <Text style={styles.buttonText}>Reload Gyms</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollViewContent: {
    width: '100%',
    paddingHorizontal: 20,
  },
  gymContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  percentText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gymText: {
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20, 
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    width: '80%', 
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default App;
