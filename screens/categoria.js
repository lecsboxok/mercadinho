import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export function Categoria() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Categoria</Text>
      <View style={styles.tudo}>
        <View style={styles.retangulo1}>
          <Text style={styles.tituloCat}>GRÃOS E MASSAS</Text>
          <Image source={require('../images/graos.png')} style={styles.image} />
        </View>
        <View style={styles.retangulo2}>
          <Text style={styles.tituloCat}>AÇOUGUE</Text>
          <Image source={require('../images/acougue.png')} style={styles.image} />
        </View>
        <View style={styles.retangulo3}>
          <Text style={styles.tituloCat}>BEBIDAS</Text>
          <Image source={require('../images/bebidas.png')} style={styles.image} />
        </View>
        <View style={styles.retangulo4}>
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
        <View style={styles.retangulo1}>
          <Text style={styles.tituloCat}>CONGELADOS</Text>
          <Image source={require('../images/congelados.png')} style={styles.image} />
        </View>
        <View style={styles.retangulo1}>
          <Text style={styles.tituloCat}>BISCOITOS E DOCES</Text>
          <Image source={require('../images/biscoitos.png')} style={styles.image} />
        </View>
        <View style={styles.retangulo1}>
          <Text style={styles.tituloCat}>MERCARIA</Text>
          <Image source={require('../images/mercearia.png')} style={styles.image} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
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
    margin: 50
  },
  tituloCat:{
    color: '#FFF',
    fontSize: 18
  },
  image:{
    width: 50,
    height: 50
  },
  retangulo1:{
    backgroundColor: '#E29D6C',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  retangulo2:{
    backgroundColor: '#FF5A4D',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  retangulo3:{
    backgroundColor: '#5698B0',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  retangulo4:{
    backgroundColor: '#EB9560',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
