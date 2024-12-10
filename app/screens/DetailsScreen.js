import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar } from 'react-native';

export default function DetailsScreen({ route }) {
  const { movie } = route.params; 

  return (
    <View style={{flex:1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <ScrollView style={styles.container} scrollEnabled={true}>
       
       {movie.image && <Image source={{ uri: movie.image.medium }} style={styles.image} />}
       <Text style={styles.title}>{movie.name}</Text>
       <Text style={styles.subtitle}>Language: {movie.language}</Text>
       <Text style={styles.subtitle}>Genres: {movie.genres.join(', ')}</Text>
       <Text style={styles.rating}>Rating: {movie.rating?.average || 'N/A'}</Text>
       <Text style={styles.summary}>{movie.summary}</Text>
       <View style={{paddingVertical:50}}/>
     </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height:500,
    resizeMode: 'stretch',
    borderRadius: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  rating: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  summary: {
    fontSize: 14,
    color: '#333',
  },
});
