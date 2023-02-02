import React from 'react'
import { Button } from 'react-native-paper'

export const BarraSuperior = ({ navigation, route }) => {

    const handlePress = () => {
        navigation.navigate('NuevoCliente')

    }


    return (
        <>
            <Button
                // para poner icono de ionicons a los botones solo ocupo el nombre
                icon='plus-circle'
                color='#FFF'
                onPress={() => handlePress()}
            >
                Cliente
            </Button>

        </>
    )
}
