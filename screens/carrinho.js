import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);

  // Adiciona um novo item ao carrinho
  const adicionarAoCarrinho = (nome, preco) => {
    const novoItem = { nome, preco };
    setCarrinho([...carrinho, novoItem]);
  };

  // Calcula o total dos itens no carrinho
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco, 0);
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
        {/* Exibe os itens do carrinho */}
        {carrinho.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.nome}</Text>
            <Text>R${item.preco.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Exibe o total */}
      <View style={styles.totalContainer}>
        <Text>Total: R${calcularTotal().toFixed(2)}</Text>
      </View>
      {/* Botão para adicionar um item fictício ao carrinho */}
      <Button title="Adicionar Item ao Carrinho" onPress={() => adicionarAoCarrinho("Produto X", 10.99)} />
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
  },
});
