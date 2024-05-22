import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export function Categoria() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Categoria</Text>
      <View style={styles.tudo}>
        <View style={styles.retangulo1}>
          <Text style={styles.tituloCat}>GRÃOS E MASSAS</Text>
          <Image source={require('../images/graos.png')} style={styles.image} />
        </View>
        <View style={styles.retangulo1}>
          <Text style={styles.tituloCat}>AÇOUGUE</Text>
          <Image source={require('../images/acougue.png')} style={styles.image} />
        </View>
        <View style={styles.retangulo1}>
          <Text style={styles.tituloCat}>BEBIDAS</Text>
          <Image source={require('../images/bebidas.png')} style={styles.image} />
        </View>
        <View style={styles.retangulo1}>
          <Text style={styles.tituloCat}>HORTIFRUTI</Text>
          <Image source={require('../images/frutas.png')} style={styles.image} />
        </View>
        <View style={styles.retangulo1}>
          <Text style={styles.tituloCat}>FRIOS E LATICÍNIOS</Text>
          <Image source={require('../images/frios.png')} style={styles.image} />
        </View>
        <View style={styles.retangulo1}>
          <Text style={styles.tituloCat}>HIGIENE E LIMPEZA</Text>
          <Image source={require('../images/higiene.png')} style={styles.image} />
        </View>
        <View style={styles.retangulo1}>
          <Text style={styles.tituloCat}>PADARIA</Text>
          <Image source={require('../images/padaria.png')} style={styles.image} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'medium',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    color: '#3F3F3F',
    fontFamily: 'PoppinsMedium',
  },
  tudo: {
    margin: 20
  },
  retangulo1:{
    backgroundColor: '#E29D6C',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20
  },
  tituloCat:{
    color: '#FFF',
    fontSize: 18
  }
});
