import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button, FAB, Headline, Subheading } from 'react-native-paper'
import { globalStyles } from '../styles/global';
import axios from 'axios';

export const DetallesCliente = ({ navigation, route }) => {

  const { setConsultarApi } = route.params
  const { correo, empresa, id, nombre, telefono } = route.params.item


  const mostrarConfirmacion = () => {
    Alert.alert(
      'Deseas eliminar este cliente',
      'Un contacto eliminado no se puede recuperar',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Si, Eliminar', onPress: () => eliminarContacto() },

      ]
    )
  }



  const eliminarContacto = async () => {
    const url = `http://192.168.0.6:3000/clientes/${id}`;
    try {
      await axios.delete(url)
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('Inicio');
    setConsultarApi(true)
  }


  return (
    <View style={globalStyles.contenedor}>

      <Headline style={globalStyles.titulo}>{nombre}</Headline>

      <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading> </Text>
      <Text style={styles.texto}>Telefono: <Subheading>{telefono}</Subheading> </Text>
      <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading> </Text>

      <Button
        style={styles.boton}
        icon='cancel'
        mode='contained'
        onPress={() => mostrarConfirmacion()}
      >Eliminar Cliente</Button>

      <FAB
        icon='pencil'
        style={globalStyles.fab}
        onPress={() => navigation.navigate('NuevoCliente', { cliente: route.params.item, setConsultarApi })}
      />

    </View>

  )
}


const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  boton: {
    marginTop: 100,
    backgroundColor: 'red'
  }
});
