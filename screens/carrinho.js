import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export function Carrinho() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={require("../images/logo.png")}
      />
      <Text>Carrinho</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFAF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
