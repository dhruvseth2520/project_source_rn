import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


const PromoterRegisterScreen = ({ navigation }) => {

    const handlerRegister = () => {
        navigation.navigate('PromoterHome')
    }

    const [nickname, setNickname] = useState('')
    const [id, setID] = useState('')

    return (
        <View style={styles.screen}>
            <SafeAreaView style={styles.safeArea}>
                <TextInput style={styles.defaultTextInput} onChangeText={text => setNickname(text)} value={nickname} placeholder='Nickname' />
                <TextInput style={styles.defaultTextInput} onChangeText={text => setID(text)} value={id} placeholder='Attach ID' />
                <Button style={styles.defaultButton} title='Register' onPress={handlerRegister} />
            </SafeAreaView>
        </View>
    );
}

export default PromoterRegisterScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    safeArea: {
        flex: 1,
        justifyContent: "center"
    },
    defaultTextInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        marginTop: 10,
        marginLeft: 10, 
        marginRight: 10
    },
    defaultButton : {
        height: 40,
        marginTop: 40
    }
})