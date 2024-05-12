import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function Carrinho() {
  return (
    <View style={styles.container}>
      <View style={styles.tudo}>
        <StatusBar style="auto" />
        <View style={styles.cabecalho}>
          <Image source={require('../images/logo.png')} style={styles.image} />
          <MaterialCommunityIcons name="account" color="#CFCFCF" size={30} style={styles.icon} />
        </View>
        <View style={styles.titulo}>
          <Text>Meu carrinho</Text>
        </View>
      </View >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFAF1',
  },
  tudo: {
    margin: 30
  },
  image: {
    width: 50,
    height: 35.2,
    marginTop: 20,
    marginRight: 'auto',
  },
  icon: {
    marginLeft: 'auto',
    marginTop: 20,
    marginRight: 10,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  titulo:{
    color: '#3F3F3F',
    fontSize: 18,
  }
});
