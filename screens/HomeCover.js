import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeCover({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#315fa6" />
      <View style={styles.topbar}>
        <Text style={styles.topTitle}>Bitácora</Text>
        <View style={styles.topIcons}>
          <TouchableOpacity style={styles.iconBtn} accessibilityLabel="Actualizar">
            <Text style={styles.iconText}>⟳</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} accessibilityLabel="Sincronizar">
            <Text style={styles.iconText}>⇅</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} accessibilityLabel="Agregar">
            <Text style={styles.iconText}>＋</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Bitácora de Recorrido</Text>

        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>publicidad exterior</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Formulario')}
        >
          <Text style={styles.buttonText}>Empezar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  topbar: {
    height: 56,
    backgroundColor: '#315fa6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between'
  },
  topTitle: { color: '#fff', fontSize: 16, opacity: 0.95 },
  topIcons: { flexDirection: 'row' },
  iconBtn: { marginLeft: 12 },
  iconText: { color: '#fff', fontSize: 18 },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 28,
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2f4366',
    textAlign: 'center',
    marginBottom: 24
  },
  logo: {
    width: 220,
    height: 220,
    marginVertical: 6
  },
  subtitle: {
    fontSize: 18,
    color: '#6b6b6b',
    marginTop: 6,
    marginBottom: 20,
    textTransform: 'lowercase'
  },

  button: {
    marginTop: 18,
    backgroundColor: '#2659b0',
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 8,
    elevation: 3
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  }
});
