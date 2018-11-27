import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import firebase from 'firebase'
let list = []
var config = {
    databaseURL: 'https://moj-super-projekt.firebaseio.com',
    projectId: 'moj-super-projekt',
}
if (!firebase.apps.length) {
    firebase.initializeApp(config)
}
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [1],
            data: null,
        }
    }
    componentWillMount() {
        this.fetchData()
    }
    fetchData = async () => {
        //TODO pobieranie danych z firebase
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>WorkTime</Text>
                <FlatList
                    data={this.state.list}
                    renderItem={({ item }) => <Text>{item}</Text>}
                />
                <Text>{this.state.list}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        height: 100 + '%',
    },
    header: {
        padding: 16,
        fontSize: 32,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    pole: {
        flexDirection: 'row',
        borderColor: '#D9D9D9',
        borderBottomWidth: 1,
    },
    inputTextHeader: {
        flex: 1,
        fontSize: 18,
        color: '#000',
        padding: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 18,
        color: '#000',
        padding: 16,
    },
    button: {
        backgroundColor: '#607D8B',
        margin: 16,
        borderRadius: 100,
        padding: 16,
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
})
