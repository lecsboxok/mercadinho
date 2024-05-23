import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function Fontes() {
  const [fontsLoaded] = useFonts({
    'Mulish': require('../assets/fonts/Mulish-VariableFont_wght.ttf'),
    'PoppinsMedium': require('../assets/fonts/Poppins-Medium.ttf'),
    'PoppinsRegular': require('../assets/fonts/Poppins-Regular.ttf'),
    'MulishRegular': require('../assets/fonts/Mulish-Regular.ttf'),
    'PoppinsLight': require('../assets/fonts/Poppins-Light.ttf'),
    'MulishLight': require('../assets/fonts/Mulish-Light.ttf'),
    'PoppinsExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'MulishExtraBold': require('../assets/fonts/Mulish-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Principal />;
}


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
  const navigation = useNavigation()

  const irAdicionar = () => {
    navigation.navigate('adicionar')
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image source={require('../images/logo.png')} style={styles.image} />
      </View>
      <Carousel />
      <TouchableOpacity style={styles.adicionarProduto} onPress={irAdicionar}>
        <Text style={styles.textoAdicionar}>Adicionar Produto</Text>
        <MaterialCommunityIcons name="plus-circle" color="#8DC63F" size={55} style={styles.icon} />
      </TouchableOpacity>
      <View>
        <Text>Categoria</Text>
      </View>
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
    margin: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 35.2,
  },
  carousel: {
    flexGrow: 0,
  },
  slide: {
    width: viewportWidth - 48,
    marginHorizontal: -2,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCarousel: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  adicionarProduto: {
    width: '100%',
    backgroundColor: '#E5EFCB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 50,
  },
  textoAdicionar: {
    fontSize: 18,
    marginLeft: 20,
    fontFamily: 'MulishRegular',
  },
});