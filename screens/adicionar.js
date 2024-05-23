import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, TextInput, Button, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
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
    'MulishBold': require('../assets/fonts/Mulish-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Adicionar />;
}

export function Adicionar({ navigation }) {

  const [carrinho, setCarrinho] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [modalVisivel, setModalVisivel] = useState(false);
  const categorias = ['Grãos e Massas', 'Açougue', 'Bebidas', 'Hortifruti', 'Frios e Laticínios', 'Higiene e Limpeza', 'Padaria', 'Congelados', 'Biscoitos e Doces', 'Mercearia'];
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const categoriaImagens = {
    'Grãos e Massas': require('../images/graos.png'),
    'Açougue': require('../images/acougue.png'),
    'Bebidas': require('../images/bebidas.png'),
    'Hortifruti': require('../images/frutas.png'),
    'Frios e Laticínios': require('../images/frios.png'),
    'Higiene e Limpeza': require('../images/higiene.png'),
    'Padaria': require('../images/padaria.png'),
    'Congelados': require('../images/congelados.png'),
    'Biscoitos e Doces': require('../images/biscoitos.png'),
    'Mercearia': require('../images/mercearia.png'),
  };

  const adicionarAoCarrinho = () => {
    setQuantidade(1);
    if (nomeProduto && precoProduto && categoriaSelecionada) {
      const novoItem = { nome: nomeProduto, preco: parseFloat(precoProduto), quantidade: quantidade, categoria: categoriaSelecionada};
      const novoCarrinho = [...carrinho, novoItem];
      setCarrinho(novoCarrinho);

      try {
        AsyncStorage.setItem('@carrinho', JSON.stringify(novoCarrinho))
          .catch(error => console.error('Erro ao salvar o carrinho:', error));
      } catch (error) {
        console.error('Erro ao salvar o carrinho:', error);
      }
    }
  };

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

  // const adicionarAoCarrinho = () => {
  //   setQuantidade(1)
  //   if (nomeProduto && precoProduto) {
  //     const novoItem = { nome: nomeProduto, preco: parseFloat(precoProduto), quantidade: quantidade };
  //     setCarrinho([...carrinho, novoItem]);
  //     setNomeProduto('');
  //     setPrecoProduto('');

  //   }
  // };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1)
    }
  };

  const aumentarQuantidade = () => {
    setQuantidade(quantidade + 1)
  };

  const abrirModal = () => {
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  const selecionarCategoria = (categoria) => {
    setCategoriaSelecionada(categoria);
    fecharModal();
  };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={fecharModal}
      >
        <ScrollView>
          <View style={styles.modalView}>
            <Text style={styles.modalTexto}>Escolha a categoria:</Text>
            {categorias.map((categoria, index) => (
              <TouchableOpacity key={index} style={styles.categoriaItem} onPress={() => selecionarCategoria(categoria)}>
                <Image source={categoriaImagens[categoria]} style={styles.catImg} />
                <Text style={styles.categoriaTexto}>{categoria}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={fecharModal} style={styles.fecharButton}>
              <Text style={styles.fecharTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      <View style={styles.cabecalho}>
        <Image source={require('../images/logo.png')} style={styles.image} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />

      <TouchableOpacity onPress={abrirModal} style={styles.categoria}>
        <Text style={styles.catTexto}>{categoriaSelecionada || 'Adicionar a categoria'}</Text>
        <View style={styles.imgEseta}>
        <Image source={categoriaImagens[categoriaSelecionada] || require('../images/categoria.png')} style={styles.catImg} />
          <MaterialCommunityIcons name="arrow-right" color="#000" size={28} />
        </View>
      </TouchableOpacity>

      <View style={styles.caixinhaPrecoEQuant}>
        <TextInput
          style={styles.input2}
          placeholder="Preço"
          value={precoProduto}
          onChangeText={setPrecoProduto}
          keyboardType='numeric'
        />
        <View style={styles.controlesBaixo}>
          <TouchableOpacity style={styles.botoesControle1} onPress={aumentarQuantidade}>
            <Text style={{ color: '#FFF', fontSize: 14, fontWeight: 800 }}><MaterialCommunityIcons name="plus" color="#FFF" size={23} /></Text>
          </TouchableOpacity>
          <View style={styles.quant}>
            <Text>{quantidade}</Text>
          </View>
          <TouchableOpacity style={styles.botoesControle2} onPress={diminuirQuantidade}>
            <Text style={{ color: '#FFF', fontSize: 14, fontWeight: 800 }}><MaterialCommunityIcons name="minus" color="#F2A922" size={23} /></Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.adicionar} onPress={adicionarAoCarrinho}>
        <Text style={styles.textoBotao}>Adicionar ao carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFAF1',
    padding: 20
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  image: {
    width: 50,
    height: 35.2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#f5f2fc',
    borderRadius: 5,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
    fontFamily: 'MulishRegular',
    fontSize: 18
  },
  input2: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#f5f2fc',
    borderRadius: 5,
    padding: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  caixinhaPrecoEQuant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    justifyContent: 'center'
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
  totalContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  total: {
    color: '#939393',
    fontSize: 16,
  },
  adicionar: {
    backgroundColor: '#f2a922',
    padding: 10,
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18
  },
  categoria: {
    borderColor: '#F5F2FC',
    borderStyle: 'solid',
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    marginBottom: 22,
    padding: 18,
    alignItems: 'center',
    borderRadius: 10
  },
  imgEseta: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  catTexto: {
    fontFamily: 'MulishRegular',
    fontSize: 16
  },
  catImg: {
    width: 40,
    height: 40,
    marginRight: 10
  },


  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTexto: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  categoriaItem: {
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  categoriaTexto: {
    fontSize: 16,
  },
  fecharButton: {
    marginTop: 20,
    backgroundColor: '#f2a922',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  fecharTexto: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
