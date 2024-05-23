import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

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

export function Categoria({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [carrinho, setCarrinho] = useState([]);

  const abrirModal = (categoria) => {
    setCategoriaSelecionada(categoria);
    setModalVisible(true);
  };

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

  const deletar = async (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1); // Remove o item do carrinho
    setCarrinho(novoCarrinho); // Atualiza o estado local do carrinho

    try {
      await AsyncStorage.setItem('@carrinho', JSON.stringify(novoCarrinho)); // Salva o novo carrinho no AsyncStorage
    } catch (error) {
      console.error('Erro ao salvar o carrinho:', error);
    }
  };

  const itensFiltrados = carrinho.filter(item => item.categoria?.toLowerCase() === categoriaSelecionada.toLowerCase());

  const calcularTotalModal = () => {
    let total = 0;
    itensFiltrados.forEach(item => {
      total += item.preco * item.quantidade;
    });
    return total.toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.cabecalho}>
        <Image source={require('../images/logo.png')} style={styles.imageCab} />
      </View>
      <Text style={styles.titulo}>Categoria</Text>
      <View style={styles.tudo}>
        <TouchableOpacity style={styles.retangulo2} onPress={() => abrirModal('GRÃOS E MASSAS')}>
          <Text style={styles.tituloCat}>GRÃOS E MASSAS</Text>
          <Image source={require('../images/graos.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.retangulo2} onPress={() => abrirModal('AÇOUGUE')}>
          <Text style={styles.tituloCat}>AÇOUGUE</Text>
          <Image source={require('../images/acougue.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.retangulo2} onPress={() => abrirModal('BEBIDAS')}>
          <Text style={styles.tituloCat}>BEBIDAS</Text>
          <Image source={require('../images/bebidas.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.retangulo2} onPress={() => abrirModal('HORTIFRUTI')}>
          <Text style={styles.tituloCat}>HORTIFRUTI</Text>
          <Image source={require('../images/frutas.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.retangulo2} onPress={() => abrirModal('FRIOS E LATiCÍNIOS')}>
          <Text style={styles.tituloCat}>FRIOS E LATÍCINIOS</Text>
          <Image source={require('../images/frios.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.retangulo2} onPress={() => abrirModal('HIGIENE E LIMPEZA')}>
          <Text style={styles.tituloCat}>HIGIENE E LIMPEZA</Text>
          <Image source={require('../images/higiene.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.retangulo2} onPress={() => abrirModal('PADARIA')}>
          <Text style={styles.tituloCat}>PADARIA</Text>
          <Image source={require('../images/padaria.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.retangulo2} onPress={() => abrirModal('CONGELADOS')}>
          <Text style={styles.tituloCat}>CONGELADOS</Text>
          <Image source={require('../images/congelados.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.retangulo2} onPress={() => abrirModal('BISCOITOS E DOCES')}>
          <Text style={styles.tituloCat}>BISCOITOS E DOCES</Text>
          <Image source={require('../images/biscoitos.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.retangulo2} onPress={() => abrirModal('MERCEARIA')}>
          <Text style={styles.tituloCat}>MERCEARIA</Text>
          <Image source={require('../images/mercearia.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{categoriaSelecionada}</Text>
            <ScrollView style={styles.scrollView}>
              {itensFiltrados.map((item, index) => (
                <View key={index} style={styles.item}>
                  <View style={styles.nomePreco}>
                    <Text style={styles.itemNome}>{item.nome}</Text>
                    <Text style={styles.itemPreco}>R${(item.preco * item.quantidade).toFixed(2)}</Text>
                  </View>
                  <View style={styles.lixoEbotoes}>
                    <TouchableOpacity onPress={() => deletar(index)}>
                      <MaterialCommunityIcons name="trash-can-outline" color="#B70000" size={30} />
                    </TouchableOpacity>
                  </View>

                </View>
              ))}
              <Text style={styles.total}>R$ {calcularTotalModal()}</Text>
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.fecharTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  imageCab: {
    width: 50,
    height: 35.2,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    color: '#3F3F3F',
    fontFamily: 'PoppinsMedium'
  },
  tudo: {
    margin: 20
  },
  tituloCat: {
    color: '#FFF',
    fontSize: 18
  },
  image: {
    width: 50,
    height: 50
  },
  retangulo2: {
    backgroundColor: '#4D9169',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  fecharTexto: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue'
  },
  scrollView: {
    width: '100%'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  nomePreco: {
    flexDirection: 'column',
    flex: 1
  },
  itemNome: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemPreco: {
    fontSize: 14,
    color: '#888'
  },
  lixoEbotoes: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  controlesBaixo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  botoesControle1: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 5
  },
  botoesControle2: {
    backgroundColor: '#FFC107',
    borderRadius: 5,
    padding: 5
  },
  quant: {
    marginHorizontal: 10,
    fontSize: 16
  }
});
