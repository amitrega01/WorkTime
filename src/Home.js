import React, { Component } from 'react'
import { View, Text } from 'react-native'

import firebase from 'firebase';

var config = {
    databaseURL: "https://moj-super-projekt.firebaseio.com",
    projectId: "moj-super-projekt"
  };
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [1, 2, 3],
        }
    }
    componentDidMount = () => {
      this.setState({
      })
    };
    
    render() {
        return (
            <View>
                <Text>Test</Text>
            </View>
        )
    }
}
