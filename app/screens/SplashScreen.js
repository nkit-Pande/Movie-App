import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SplashScreen({navigation}) {
    React.useEffect(() => {
        setTimeout(() => {
          navigation.replace('Home');
        }, 2000); 
      }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Movie App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text: { color: 'black', fontSize: 24, fontWeight: 'bold' },
})