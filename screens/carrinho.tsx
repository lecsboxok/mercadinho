import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Fontes: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Mulish': require('../assets/fonts/Mulish-VariableFont_wght.ttf'),
    'PoppinsMedium': require('../assets/fonts/Poppins-Medium.ttf'),
    'PoppinsRegular': require('../assets/fonts/Poppins-Regular.ttf'),
    'MulishRegular': require('../assets/fonts/Mulish-Regular.ttf'),
    'PoppinsLight': require('../assets/fonts/Poppins-Light.ttf'),
    'MulishLight': require('../assets/fonts/Mulish-Light.ttf'),
    'PoppinsExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'MulishExtraBold': require('../assets/fonts/Mulish-ExtraBold.ttf'),
    'MulishBold': require('../assets/fonts/Mulish-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  //return <Carrinho />;
};

interface CarrinhoProps {
  navigation: any;
}

export const Carrinho: React.FC<CarrinhoProps> = ({ navigation }) => {
  const [carrinho, setCarrinho] = useState<any[]>([]);

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
    navigation.addListener('focus', () => {
      atualizarCarrinho();
    });
  }, [navigation]);

  const alterarQuantidade = (index: number, novaQuantidade: number) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho[index].quantidade = novaQuantidade;
    setCarrinho(novoCarrinho);

    try {
      AsyncStorage.setItem('@carrinho', JSON.stringify(novoCarrinho)).catch(error =>
        console.error('Erro ao salvar o carrinho:', error)
      );
    } catch (error) {
      console.error('Erro ao salvar o carrinho:', error);
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  };

  const deletar = async (index: number) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);

    try {
      await AsyncStorage.setItem('@carrinho', JSON.stringify(novoCarrinho));
    } catch (error) {
      console.error('Erro ao salvar o carrinho:', error);
    }
  };

  const limpar = async () => {
    const novoCarrinho: any[] = [];
    setCarrinho(novoCarrinho);

    try {
      await AsyncStorage.setItem('@carrinho', JSON.stringify(novoCarrinho));
    } catch (error) {
      console.error('Erro ao salvar o carrinho:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.cabecalho}>
        <Image source={require('../images/logo.png')} style={styles.image} />
      </View>
      <Text style={styles.titulo}>Meu Carrinho</Text>
      <View style={styles.limpar}>
        <TouchableOpacity onPress={limpar}><Text style={styles.textoLimpar}>Limpar tudo</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {carrinho.map((item, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.nomePreco}>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemPreco}>R${(item.preco * item.quantidade).toFixed(2)}</Text>
            </View>
            <View style={styles.lixoEbotoes}>
              <TouchableOpacity onPress={() => deletar(index)}>
                <MaterialIcons name="delete" color="#B70000" size={30} />
              </TouchableOpacity>

              <View style={styles.controlesBaixo}>
                <TouchableOpacity onPress={() => alterarQuantidade(index, item.quantidade + 1)} style={styles.botoesControle1}>
                  <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '800' }}><MaterialIcons name="add" color="#FFF" size={23} /></Text>
                </TouchableOpacity>
                <View style={styles.quant}>
                  <Text>{item.quantidade}</Text>
                </View>

                <TouchableOpacity onPress={() => alterarQuantidade(index, item.quantidade - 1)} style={styles.botoesControle2}>
                  <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '800' }}><MaterialIcons name="remove" color="#F2A922" size={23} /></Text>
                </TouchableOpacity>
              </View>
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
};

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
    fontWeight: '500',
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
  botoesControle1: {
    backgroundColor: '#F2A922',
    color: '#FFF',
    padding: 9,
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
    padding: 9,
    borderRadius: 7,
    textAlign: 'center',
    borderColor: '#D1D1D1',
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    justifyContent: 'center'
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
    marginTop: 20,
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
    fontWeight: '300',
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
    backgroundColor: '#FFF',
    borderColor: '#d1d1d1',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 7,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  quant: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    fontFamily: 'MulishRegular'
  },
  lixoEbotoes: {
    alignItems: 'flex-end'
  },
  limpar: {
    marginTop: 28,
    textAlign: 'right',
    alignItems: 'flex-end',
    marginRight: 20
  },
  textoLimpar: {
    color: '#A5A5A5',
    fontFamily: 'PoppinsMedium',
    fontSize: 15
  }
});

export default Fontes;
