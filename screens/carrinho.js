import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  return <Carrinho />;
}


export function Carrinho({ navigation }) {

  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => { 
    const carregarCarrinho = async () => {
      try {
        const carrinhoSalvo = await AsyncStorage.getItem('@carrinho');
        if (carrinhoSalvo) {
          setCarrinho(JSON.parse(carrinhoSalvo));
        }
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
      }
    };

    carregarCarrinho();
  }, []);

  const atualizarCarrinho = async () => {
    try {
      const carrinhoSalvo = await AsyncStorage.getItem('@carrinho');
      if (carrinhoSalvo) {
        setCarrinho(JSON.parse(carrinhoSalvo));
      }
    } catch (error) {
      console.error('Erro ao carregar o carrinho:', error);
    }
  };

  useEffect(() => {
    const carregarCarrinho = async () => {
      navigation.addListener('focus', () => {
        atualizarCarrinho();
      });
    };

    carregarCarrinho();
  }, [navigation]);

  const alterarQuantidade = (index, novaQuantidade) => {
    const novoCarrinho = [...carrinho]; //copiei o carrinho
    novoCarrinho[index].quantidade = novaQuantidade; //atualizei a nova quantidade que eu coloquei (+ ou -)
    setCarrinho(novoCarrinho); //defini o novo carrinho com os novos valores
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.cabecalho}>
        <Image source={require('../images/logo.png')} style={styles.image} />
        <MaterialCommunityIcons name="account" color="#CFCFCF" size={35} style={styles.icon} />
      </View>
      <Text style={styles.titulo}>Meu Carrinho</Text>
      <ScrollView style={styles.scrollView}>
        {carrinho.map((item, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.nomePreco}>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemPreco}>R${(item.preco * item.quantidade).toFixed(2)}</Text>
            </View>
            <View style={styles.controlesBaixo}>
              <TouchableOpacity onPress={() => alterarQuantidade(index, item.quantidade + 1)} style={styles.botoesControle1}>
                <Text style={{ color: '#FFF', fontSize: 14, fontWeight: 800 }}><MaterialCommunityIcons name="plus" color="#FFF" size={23} /></Text>
              </TouchableOpacity>
              <Text style={styles.quant}>{item.quantidade}</Text>
              <TouchableOpacity onPress={() => alterarQuantidade(index, item.quantidade - 1)} style={styles.botoesControle2}>
                <Text style={{ color: '#FFF', fontSize: 14, fontWeight: 800 }}><MaterialCommunityIcons name="minus" color="#F2A922" size={23} /></Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValor}>R${calcularTotal().toFixed(2)}</Text>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  image: {
    width: 50,
    height: 35.2,
  },
  icon: {
    marginLeft: 'auto',
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
  scrollView: {
    margin: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#FFF',
    padding: 20,
    borderColor: '#E1E1E1',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nomePreco: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  controles: {
    backgroundColor: '#F9F9F9',
    borderColor: '#D1D1D1',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 7,
    textAlign: 'center'
  },
  botoesControle1: {
    backgroundColor: '#F2A922',
    color: '#FFF',
    padding: 10,
    borderRadius: 7,
    textAlign: 'center',
    borderColor: '#D1D1D1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  botoesControle2: {
    backgroundColor: '#FFE6B7',
    color: '#F2A922',
    padding: 10,
    borderRadius: 7,
    textAlign: 'center',
    borderColor: '#D1D1D1',
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    justifyContent: 'center'
  },
  numeroQuant: {
    paddingBottom: 3,
    paddingTop: 3,
    textAlign: 'center',
    fontSize: 15,
  },
  itemNome: {
    fontSize: 20,
    color: '#3F3F3F',
    fontFamily: 'MulishRegular',
  },
  itemPreco: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3F3F',
    fontFamily: 'MulishExtraBold',
  },
  totalContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'light',
    color: '#3F3F3F',
    fontFamily: 'MulishLight'
  },
  totalValor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#01642E'
  },
  controlesBaixo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  controlesBaixo: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderColor: '#d1d1d1',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 7,
    textAlign: 'center',
    justifyContent: 'center'
  },
  quant: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    fontFamily: 'MulishRegular'
  },
});