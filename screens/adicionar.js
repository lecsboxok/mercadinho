import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Adicionar() {

  const [carrinho, setCarrinho] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const adicionarAoCarrinho = () => {
    setQuantidade(1);
    if (nomeProduto && precoProduto) {
      const novoItem = { nome: nomeProduto, preco: parseFloat(precoProduto), quantidade: quantidade };
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


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.cabecalho}>
        <Image source={require('../images/logo.png')} style={styles.image} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />
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
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total: </Text>
        <Text style={styles.total}>R$ {calcularTotal().toFixed(2)}</Text>
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
  }
});
