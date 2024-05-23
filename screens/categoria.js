import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';

export function Categoria() {
  const [modalVisible, setModalVisible] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  const abrirModal = (categoria) => {
    setCategoriaSelecionada(categoria);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Categoria</Text>
      <View style={styles.tudo}>
        <TouchableOpacity style={styles.retangulo1} onPress={() => abrirModal('GRÃOS E MASSAS')}>
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
        <TouchableOpacity style={styles.retangulo2} onPress={() => abrirModal('FRIOS E LATÍCINIOS')}>
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
            {/* Adicione aqui o conteúdo do modal, como os produtos da categoria */}
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
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    color: '#3F3F3F',
    fontFamily: 'PoppinsMedium',
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
  retangulo1: {
    backgroundColor: '#E29D6C',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  retangulo2: {
    backgroundColor: '#FF5A4D',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  // Estilos para os outros retângulos
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
    alignItems: 'center'
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
  }
});
