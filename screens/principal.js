import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, FlatList } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const data = [
  { url: require('../images/carrossel01.png') },
  { url: require('../images/carrossel02.png') },
  { url: require('../images/carrossel03.png') },
  { url: require('../images/carrossel04.png') },
];

const CarouselItem = ({ item }) => (
  <View style={styles.slide}>
    <Image source={item.url} style={styles.imageCarousel} />
    <Text style={styles.title}>{item.title}</Text>
  </View>
);

const Carousel = () => (
  <FlatList
    data={data}
    renderItem={({ item }) => <CarouselItem item={item} />}
    keyExtractor={(item, index) => index.toString()}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    style={styles.carousel}
  />
);

export function Principal() {
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image source={require('../images/logo.png')} style={styles.image} />
      </View>
      <Carousel />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFAF1',
    padding: 20,
  },
  cabecalho: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 35.2,
  },
  carousel: {
    flexGrow: 0,
  },
  slide: {
    width: viewportWidth - 40,
    marginHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCarousel: {
    width: '100%',
    height: 85,
    resizeMode: 'cover',
  },
});