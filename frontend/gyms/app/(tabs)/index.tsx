import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator,Button } from "react-native";



const GymList = () => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetch("http://10.110.200.251:8000/gyms")
      .then(response => response.json())
      .then(data => {
        setGyms(data); // Update state
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error("Error fetching gyms:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gym List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Show spinner while fetching
      ) : gyms.length > 0 ? (
        gyms.map((gym, index) => (
          <Text key={index} style={styles.gymText}>{gym.name},{gym.last_count}</Text>
        ))
      ) : (
        <Text style={styles.gymText}>No gyms available</Text>
      )}
      <View>
      <Button onPress={() => {
        fetch("http://10.110.200.251:8000/gyms")
        .then(response => response.json())
        .then(data => {
          setGyms(data); // Update state
          setLoading(false); // Stop loading
        })}} title="Reload"/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure it takes up the full screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#f5f5f5", // Light background
    paddingHorizontal: 20, // Prevents text from touching edges
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, // Space between title and list
  },
  gymText: {
    fontSize: 18,
    color: "black",
    marginBottom: 10, // Space between gym names
  },
});

export default GymList;
