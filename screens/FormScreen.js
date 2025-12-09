import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { v4 as uuidv4 } from 'uuid';

const db = SQLite.openDatabase('bitacoras.db');

export default function FormScreen({ navigation }) {
  const [form, setForm] = useState({
    programa: '',
    fecha: new Date(),
    conductor: '',
    tipo_vehiculo: '',
    placa: '',
    tipo_registro: '',
    km_final: '',
    detalle: ''
  });
  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS bitacoras (
          id TEXT PRIMARY KEY,
          programa TEXT,
          fecha TEXT,
          conductor TEXT,
          tipo_vehiculo TEXT,
          placa TEXT,
          tipo_registro TEXT,
          km_final INTEGER,
          detalle TEXT,
          estado_sync TEXT DEFAULT 'pending',
          creado_en TEXT DEFAULT (datetime('now'))
        );`
      );
    });
  }, []);

  const saveLocal = () => {
    if (!form.programa || !form.conductor || !form.tipo_vehiculo || !form.placa || !form.tipo_registro) {
      Alert.alert('Faltan datos', 'Completa los campos obligatorios marcados con *');
      return;
    }
    const id = uuidv4();
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO bitacoras (id, programa, fecha, conductor, tipo_vehiculo, placa, tipo_registro, km_final, detalle)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
         [id, form.fecha.toISOString().split('T')[0], form.programa, form.conductor, form.tipo_vehiculo, form.placa, form.tipo_registro, form.km_final || null, form.detalle || ''],
         (_, result) => {
           Alert.alert('Guardado', 'Registro guardado localmente');
           navigation.goBack();
         },
         (_, error) => {
           console.log('Error insert', error);
           return false;
         }
      );
    });
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.h1}>Bitácora</Text>

        <Text style={styles.label}>Programa *</Text>
        <RNPickerSelect onValueChange={val => setForm({...form, programa: val})} items={[{label:'Bolivia',value:'Bolivia'},{label:'Honduras',value:'Honduras'}]} placeholder={{label:'Selecciona...'}} />

        <Text style={styles.label}>Fecha *</Text>
        <TouchableOpacity style={styles.dateBox} onPress={() => setShowDate(true)}>
          <Text>{form.fecha ? form.fecha.toISOString().split('T')[0] : 'Seleccionar fecha'}</Text>
        </TouchableOpacity>
        {showDate && (
          <DateTimePicker value={form.fecha || new Date()} mode="date" display={Platform.OS==='ios' ? 'spinner' : 'default'} onChange={(e, d)=>{ setShowDate(false); if(d) setForm({...form, fecha:d}); }} />
        )}

        <Text style={styles.label}>Nombre del Conductor *</Text>
        <RNPickerSelect onValueChange={val => setForm({...form, conductor: val})} items={[{label:'Azucena Serrano',value:'Azucena Serrano'},{label:'Juan Perez',value:'Juan Perez'}]} placeholder={{label:'Selecciona...'}} />

        <Text style={styles.label}>Tipo de Vehículo *</Text>
        <RNPickerSelect onValueChange={val => setForm({...form, tipo_vehiculo: val})} items={[{label:'Camioneta',value:'Camioneta'},{label:'Camión',value:'Camión'},{label:'Sedan',value:'Sedan'}]} placeholder={{label:'Selecciona...'}} />

        <Text style={styles.label}>N° de Placa *</Text>
        <TextInput style={styles.input} value={form.placa} onChangeText={t=>setForm({...form, placa:t})} placeholder="ABC-123" />

        <Text style={styles.label}>Tipo de Registro *</Text>
        <RNPickerSelect onValueChange={val => setForm({...form, tipo_registro: val})} items={[{label:'Salida',value:'Salida'},{label:'Llegada',value:'Llegada'},{label:'Mantenimiento',value:'Mantenimiento'}]} placeholder={{label:'Selecciona...'}} />

        <Text style={styles.label}>Km Final</Text>
        <TextInput style={styles.input} value={String(form.km_final)} keyboardType="numeric" onChangeText={t=>setForm({...form, km_final:t})} />

        <Text style={styles.label}>Detalle de Registro</Text>
        <TextInput style={[styles.input, {height:120, textAlignVertical:'top'}]} multiline value={form.detalle} onChangeText={t=>setForm({...form, detalle:t})} placeholder="Para Recorrido: agregar origen y destino..." />

        <TouchableOpacity style={styles.saveBtn} onPress={saveLocal}>
          <Text style={styles.saveText}>Guardar</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{ padding:20, paddingBottom:40 },
  h1:{ fontSize:24, fontWeight:'700', marginBottom:12, textAlign:'center' },
  label:{ marginTop:12, marginBottom:6, fontWeight:'600' },
  input:{ borderWidth:1, borderColor:'#ccc', padding:10, borderRadius:4 },
  dateBox:{ borderWidth:1, borderColor:'#ccc', padding:12, borderRadius:4 },
  saveBtn:{ marginTop:20, backgroundColor:'#2659b0', padding:14, borderRadius:8, alignItems:'center' },
  saveText:{ color:'#fff', fontWeight:'700' }
});
