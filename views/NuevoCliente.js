import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Dialog, Headline, Paragraph, Portal, TextInput } from 'react-native-paper';
import { globalStyles } from '../styles/global';

export const NuevoCliente = ({ navigation, route }) => {

    const { setConsultarApi } = route.params

    // campos del formulario
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [alerta, setAlerta] = useState(false);

    // detectar si estamos editando o no
    useEffect(() => {
        if (route.params.cliente) {
            const { correo, empresa, nombre, telefono } = route.params.cliente
            setNombre(nombre)
            setTelefono(telefono)
            setCorreo(correo)
            setEmpresa(empresa)
        }
    }, [])


    // almacena cliente en la base de datos
    const guardarCliente = async () => {
        //    Validar
        if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
            setAlerta(true)
            return
        }
        // Generar cliente
        const cliente = {
            nombre,
            telefono,
            correo,
            empresa
        }


        // si estamos creando o editando un nuevo cliente

        if (route.params.cliente) {
            // en esta parte estamos editando caso contrario creando
            // extraemos el id
            const { id } = route.params.cliente
            // agregamos el id al cliente
            cliente.id = id

            const url = `http://192.168.0.6:3000/clientes/${id}`
            try {
// para editar
await axios.put(url, cliente)
            } catch (error) {
                console.log(error);
            }
        } else {
            // guardar el cliente creado en la api
            try {
                if (Platform.OS === 'ios') {
                    // para ios
                    await axios.post('http://localhost:3000/clientes', cliente)
                } else {
                    // le pongo que tipo de peticion seguido del endpoint y despues lo que voy a guardar
                    // para android
                    await axios.post('http://192.168.0.6:3000/clientes', cliente);
                }
            } catch (error) {
                console.log(error);
            }

        }


        // redireccionar
        navigation.navigate('Inicio');
        // limpiar el form
        setNombre('');
        setTelefono('');
        setCorreo('');
        setEmpresa('');
        // cambiar a true para traer nuevo cliente
        setConsultarApi(true)
    }



    return (
        <ScrollView>
            <View style={globalStyles.contenedor}>
                {/* Headline es como si fuera un h1  */}
                <Headline style={globalStyles.titulo}>Añadir Nuevo cliente</Headline>

                <TextInput
                    style={styles.input}
                    label='Nombre'
                    placeholder='Shue'
                    onChangeText={(texto) => setNombre(texto)}
                    value={nombre}
                />

                <TextInput
                    style={styles.input}
                    label='Telefono'
                    placeholder='9687458'
                    onChangeText={(texto) => setTelefono(texto)}
                    value={telefono}

                />
                <TextInput
                    style={styles.input}
                    label='Correo'
                    placeholder='correo@correo.com'
                    onChangeText={(texto) => setCorreo(texto)}
                    value={correo}

                />
                <TextInput
                    style={styles.input}
                    label='Empresa'
                    placeholder='Nombre Empresa'
                    onChangeText={(texto) => setEmpresa(texto)}
                    value={empresa}

                />


                <Button
                    icon='pencil-circle'
                    mode='contained'
                    onPress={() => guardarCliente()}
                >
                    Guardar Cliente
                </Button>

                {/* //  para mostrar la alerta con el modal de paper */}
                <Portal>
                    <Dialog visible={alerta}
                        // para cerrar el modal al dar clic afuera
                        onDismiss={() => setAlerta(false)}>
                        <Dialog.Title>Error</Dialog.Title>
                        <Dialog.Content>
                            {/* este es como un texto mas pequeño  */}
                            <Paragraph>Todos los campos son obligatorios  </Paragraph>
                        </Dialog.Content>
                        {/* esta es la parte de los botones */}
                        <Dialog.Actions>
                            <Button onPress={() => setAlerta(false)} >OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </ScrollView>

    )
}


const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    },

});
