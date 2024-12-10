import { StyleSheet, Text, View, FlatList, TextInput, ActivityIndicator, Image, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState } from 'react';

export default function SearchScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('Details', { movie: item.show })}
    >
      {item.show.image && <Image source={{ uri: item.show.image.medium }} style={styles.image} />}
      <View style={styles.textColumn}>
        <Text style={styles.listItemText}>{item.show.name}</Text>
        <Text style={styles.listItemText}>Genres: {item.show.genres.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a movie or show"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.show.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:5,
    paddingTop:10
  },
  searchBar: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal:14,
    marginBottom: 20,
    fontSize:16,
    marginHorizontal:10
    
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 20,
    borderRadius: 5,
  },
  textColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  listItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
