import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const adicionarAoCarrinho = () => {
    setQuantidade(1)
    if (nomeProduto && precoProduto) {
      const novoItem = { nome: nomeProduto, preco: parseFloat(precoProduto), quantidade: quantidade };
      setCarrinho([...carrinho, novoItem]);
      setNomeProduto('');
      setPrecoProduto('');
    }
  };


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

  const alterarQuantidade = (index, novaQuantidade) => {
    const novoCarrinho = [...carrinho]; //copiei o carrinho
    novoCarrinho[index].quantidade = novaQuantidade; //atualizei a nova quantidade que eu coloquei (+ ou -)
    setCarrinho(novoCarrinho); //defini o novo carrinho com os novos valores
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.cabecalho}>
        <Image source={require('../images/logo.png')} style={styles.image} />
        <MaterialCommunityIcons name="account" color="#CFCFCF" size={30} style={styles.icon} />
      </View>
      <Text style={styles.titulo}>Meu Carrinho</Text>
      <ScrollView style={styles.scrollView}>
        {carrinho.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.nome}</Text>
            <Text>R${(item.preco * item.quantidade).toFixed(2)}</Text>
            <View style={styles.controls}>
              <Button title="-" onPress={() => alterarQuantidade(index, item.quantidade - 1)} />
              <Text>{item.quantidade}</Text>
              <Button title="+" onPress={() => alterarQuantidade(index, item.quantidade + 1)} />
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text>Total: R${calcularTotal().toFixed(2)}</Text>
        <View style={styles.controls}>
          <Button title="-" onPress={diminuirQuantidade} />
          <Text>{quantidade}</Text>
          <Button title="+" onPress={aumentarQuantidade} />
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço do Produto"
        value={precoProduto}
        onChangeText={setPrecoProduto}
        keyboardType="numeric"
      />
      <Button title="Adicionar Item ao Carrinho" onPress={adicionarAoCarrinho} />
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
    marginBottom: 20,
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalContainer: {
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
});