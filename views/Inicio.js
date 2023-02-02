import React, { useEffect } from 'react';
import axios from 'axios';
import { FlatList, View } from 'react-native'
import { useState } from 'react';
import { Button, FAB, Headline, List } from 'react-native-paper';
import { globalStyles } from '../styles/global';

// navigation es un props
export const Inicio = ({ navigation }) => {

    const [clientes, setClientes] = useState([])
    // sirve para refrescar el Effect sin q se ejecute tantas vcs de forma innecesaria 
    const [consultarApi, setConsultarApi] = useState(true)

    useEffect(() => {
        //   para obtener los clientes de la api
        const obtenerClientesApi = async () => {
            try {
                if (Platform.OS === 'ios') {
                    // para ios
                    const resultado = await axios.get('http://localhost:3000/clientes')
                    setClientes(resultado.data);
                    setConsultarApi(false)
                } else {
                    // le pongo que tipo de peticion seguido del endpoint
                    // para android
                    const resultado = await axios.get('http://192.168.0.6:3000/clientes');
                    setClientes(resultado.data);
                    setConsultarApi(false)
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (consultarApi) {
            obtenerClientesApi();
        }
        // asi se va a ejecutar cada q este cambie
    }, [consultarApi])


    return (
        <View style={globalStyles.contenedor}>

            <Button
                icon='plus-circle'
                onPress={() => navigation.navigate('NuevoCliente', { setConsultarApi })}
            >
                Agregar Cliente
            </Button>

            <Headline style={globalStyles.titulo}>{clientes.length > 0 ? 'Clientes' : 'Aun no hay cliente'}</Headline>
            <FlatList
                data={clientes}
                // para poner un id unico 
                keyExtractor={cliente => (cliente.id).toString()}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.nombre}
                        description={item.empresa}
                        // aca pasamos toda la informacion que tiene el item seleccionado
                        onPress={() => navigation.navigate('DetallesCliente', { item, setConsultarApi }) }
                    />
                )}
            />

            <FAB
                icon='plus'
                style={globalStyles.fab}
                onPress={() => navigation.navigate('NuevoCliente', { setConsultarApi })}
            />


        </View>
    )
}

