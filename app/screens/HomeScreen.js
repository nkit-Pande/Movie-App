import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <ListItem
      name={item.show.name}
      image={item.show.image?.medium}
      rating={item.show.rating?.average}
      genres={item.show.genres.join(', ')} 
      language={item.show.language}
      onPress={() => navigation.navigate('Details', { movie: item.show })}     />
  );

  return (
    <View style={styles.container}>
       <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
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

function ListItem({ name, image, rating, genres, language, onPress }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>?</Text>
        </View>
      )}
      <View style={styles.textColumn}>
        <Text style={[styles.listItemText, { fontSize: 30, fontWeight: 'bold' }]}>{name}</Text>
        <Text style={styles.listItemText}>{language}</Text>
        <Text style={[styles.listItemRating, { color: 'green' }]} >
          Rating: {rating ? rating : 'N/A'}
        </Text>
        <Text style={[styles.listItemText, { fontSize: 14 }]}>Genres: {genres}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 5,
  },
  listItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
  },
  textColumn: {
    flexDirection: 'column',
    marginLeft: 20,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  imagePlaceholder: {
    width: 100,
    height: 150,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  imagePlaceholderText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchBar: {
    height: 50,
    width: '100%',
    borderBlockColor: 'black',
    borderWidth: 0.5,
    justifyContent: 'center',
    padding: 10,
  },
  searchText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  listItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItemRating: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
});
