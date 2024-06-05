import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Keyboard, Alert } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
//import { useFonts, Poppins_500Medium, Poppins_400Regular, Poppins_300Light, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';

SplashScreen.preventAutoHideAsync();

const KEY_GPT = ''; // Insira a sua chave GPT aqui

export function Receita() {
  const [load, setLoad] = useState(false);
  const [receita, setReceita] = useState("");

  const [prato, setPrato] = useState("");
  const [ingr1, setIngr1] = useState("");
  const [ingr2, setIngr2] = useState("");
  const [ingr3, setIngr3] = useState("");
  const [showIngredients, setShowIngredients] = useState(true);
  const [showPrato, setShowPrato] = useState(true);

  const handlePratoChange = (texto) => {
    setPrato(texto);
    if (texto !== "") {
      setShowPrato(true);
      setShowIngredients(false);
    } else {
      setShowPrato(true);
      setShowIngredients(true);
    }
  };

  const handleIngredientChange = (index, texto) => {
    if (index === 1) setIngr1(texto);
    if (index === 2) setIngr2(texto);
    if (index === 3) setIngr3(texto);

    if (texto !== "") {
      setShowPrato(false);
      setShowIngredients(true);
    } else {
      setShowPrato(true);
      setShowIngredients(true);
    }
  };

  async function gerarReceita() {
    if (prato === "" && (ingr1 === "" || ingr2 === "" || ingr3 === "")) {
      Alert.alert("Atenção", "Informe um prato ou todos os ingredientes!", [{ text: "Beleza!" }]);
      return;
    }
    setReceita("");
    setLoad(true);
    Keyboard.dismiss();

    const prompt = prato
      ? `Sugira uma receita detalhada para ${prato}.`
      : `Sugira uma receita detalhada usando os ingredientes: ${ingr1}, ${ingr2}, e ${ingr3} e pesquise a receita no YouTube. Caso encontre, informe o link.`;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${KEY_GPT}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
          max_tokens: 500,
          top_p: 1,
        }),
      });

      const data = await response.json();
      console.log("API Response: ", data); // Log para inspecionar a resposta da API

      if (data.choices && data.choices.length > 0) {
        setReceita(data.choices[0].message.content);
      } else {
        setReceita("Não foi possível gerar a receita. Tente novamente.");
      }
      
    } catch (error) {
      console.log(error);
      setReceita("Ocorreu um erro ao tentar gerar a receita. Tente novamente.");
    } finally {
      setLoad(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cabecalho}>
        <Image source={require('../images/logo.png')} style={styles.image} />
      </View>
      <View style={styles.form}>
        {showPrato && (
          <TextInput
            placeholder="Escreva uma receita, um tipo de prato..."
            style={styles.input}
            value={prato}
            onChangeText={handlePratoChange}
          />
        )}
        {showIngredients && (
          <>
            <View style={styles.ou}>
              <View style={styles.linha}></View>
              <Text style={styles.textou}>OU</Text>
              <View style={styles.linha}></View>
            </View>
            <TextInput
              placeholder="Ingrediente 1"
              style={styles.input}
              value={ingr1}
              onChangeText={(texto) => handleIngredientChange(1, texto)}
            />
            <TextInput
              placeholder="Ingrediente 2"
              style={styles.input}
              value={ingr2}
              onChangeText={(texto) => handleIngredientChange(2, texto)}
            />
            <TextInput
              placeholder="Ingrediente 3"
              style={styles.input}
              value={ingr3}
              onChangeText={(texto) => handleIngredientChange(3, texto)}
            />
          </>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={gerarReceita}>
        <Text style={styles.buttonText}>Procurar receita</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }} style={styles.containerScroll} showsVerticalScrollIndicator={false}>
        {load && (
          <View style={styles.content}>
            <Text style={styles.title}>Produzindo receita...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {receita && (
          <View style={styles.content}>
            <Text style={styles.title}>Sua receita 👇</Text>
            <Text style={{ lineHeight: 24 }}>{receita}</Text>
          </View>
        )}
      </ScrollView>
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
    margin: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 35.2,
  },
  form: {
    width: '100%',
    borderRadius: 8,
    padding: 16,
    marginBottom: 5,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#F5F2FC',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    width: '100%',
    height: 60,
    fontFamily: 'PoppinsRegular', // Aqui deve ser uma das fontes carregadas
  },
  button: {
    backgroundColor: '#F2A922',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  ou: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  textou: {
    marginLeft: 10,
    marginRight: 10,
    color: '#939393',
    fontSize: 16,
  },
  linha: {
    height: 2,
    width: 80,
    backgroundColor: '#939393',
  },
  containerScroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
