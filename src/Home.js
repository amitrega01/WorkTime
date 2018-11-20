import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [1, 2, 3],
        }
    }

    render() {
        return (
            <View>
                <Text>Test</Text>
            </View>
        )
    }
}
