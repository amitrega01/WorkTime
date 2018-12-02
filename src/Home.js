import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import firebase from 'firebase'
import WorkItem from './WorkItem';

require('firebase/firestore')
var config = {
    apiKey: "AIzaSyA8wSqWjBWUlv9e60_BJchKMs3H7xyuE20",
    authDomain: "moj-super-projekt.firebaseapp.com",
    databaseURL: "https://moj-super-projekt.firebaseio.com",
    projectId: "moj-super-projekt",
    storageBucket: "moj-super-projekt.appspot.com",
    messagingSenderId: "722895876897"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
var db = firebase.firestore()
db.settings({
    timestampsInSnapshots: true,
})

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentWillMount() {
        this.fetchData().then((list) =>
        {
            this.setState({
                list: list,
            })
        })
    }
    fetchData = async () => {
        let list = [];
        console.log("Pobieranie z bazy")
        db.collection('worktimes').onSnapshot((snap) => {
            const tab = [];
            snap.forEach((doc) => {
                const {  czasPracy,data, dniowka, odT, doT, stawka} = doc.data();
                tab.push({
                    key: doc.id,
                    doc, // DocumentSnapshot
                    czasPracy, 
                    data,
                    dniowka,
                    odT,
                    doT,
                    stawka                });
                    
                });
                this.setState({
                    list: tab,
                });
                console.log(tab);
            })
        }
        
        
        render() {
            
            return (
                <View style={styles.container}>
                <Text style={styles.header}>WorkTime</Text>
                
                <FlatList 
                    data={this.state.list}
                    renderItem={({item}) => <WorkItem 
                        data={new Date(item.data).toISOString().substring(0,10)}
                        odT = {item.odT}
                        doT = {item.doT}
                        stawka = {item.stawka}
                        dniowka = {item.dniowka}
                         />}
                />
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
        