import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const Restaurant = ({navigation}) =>{
    return (
        <View style = {styles.container}>
            <Text>User</Text>
            <Button
            title = "Click Here"
            onPress = {() => alert('Button Clicked') }
            
            />
        </View>
    );
}

export default Restaurant;

const styles = StyleSheet.create ({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});