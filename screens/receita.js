import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';


SplashScreen.preventAutoHideAsync();


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

  return <Receita />;
}

export function Receita() {

  const [load, defLoad] = useState(false);
  const [receita, defReceita] = useState("");

  const [ingr1, defIngr1] = useState("");
  const [ingr2, defIngr2] = useState("");
  const [ingr3, defIngr3] = useState("");

  async function gerarReceita() {
    if (ingr1 === "" || ingr2 === "" || ingr3 === "") {
      Alert.alert("Atenção", "Informe todos os ingredientes!", [{ text: "Beleza!" }])
      return;
    }
    defReceita("");
    defLoad(true);
    Keyboard.dismiss();

    const prompt = `Sugira uma receita detalhada usando os ingredientes: ${ingr1}, ${ingr2} e ${ingr3}  e pesquise a receita no YouTube. Caso encontre, informe o link.`;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY_GPT}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 500,
        top_p: 1,
      })
    })

  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image source={require('../images/logo.png')} style={styles.image} />
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Escreva uma receita, um tipo de prato..."
          style={styles.input}
        />
        <View style={styles.ou}>
          <View style={styles.linha}></View>
          <Text style={styles.textou}>OU</Text>
          <View style={styles.linha}></View>
        </View>
        <TextInput
          placeholder="Ingrediente 1"
          style={styles.input}
          value={ingr1}
          onChangeText={(texto) => defIngr1(texto)}
        />
        <TextInput
          placeholder="Ingrediente 2"
          style={styles.input}
          value={ingr2}
          onChangeText={(texto) => defIngr2(texto)}
        />
        <TextInput
          placeholder="Ingrediente 3"
          style={styles.input}
          value={ingr3}
          onChangeText={(texto) => defIngr3(texto)}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Proucurar receita</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={styles.containerScroll} showsVerticalScrollIndicator={false} >
        {load && (
          <View style={styles.content}>
            <Text style={styles.title}>Produzindo receita...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {receita && (
          <View style={styles.content}>
            <Text style={styles.title}>Sua receita 👇</Text>
            <Text style={{ lineHeight: 24 }}>{receita} </Text>
          </View>
        )}
      </ScrollView>
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
    marginTop: 16,
    marginBottom: 8,
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
    fontFamily: 'MulishRegular',
    fontSize: 18,
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
  }

})
