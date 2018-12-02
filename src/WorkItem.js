import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default class WorkItem extends Component {
    constructor(props) {
        super(props)
        let temp = this.props.stawka
        if (!temp.includes('zł/h')) temp += 'zł/h'
        this.state = {
            data: this.props.data,
            odT: this.props.odT,
            doT: this.props.doT,
            stawka: temp,
            dniowka: this.props.dniowka + 'zł',
        }
    }
    componentWillMount = () => {}

    render() {
        return (
            <View style={styles.item}>
                <View style={styles.left}>
                    <Image
                        source={require('../img/date.png')}
                        style={styles.img}
                    />
                    <Text style={styles.dateText}>{this.state.data}</Text>
                </View>
                <View style={styles.right}>
                    <View style={styles.rightItem}>
                        <Text style={styles.text1}>Od: </Text>
                        <Text style={styles.text2}>{this.state.odT}</Text>
                    </View>

                    <View style={styles.rightItem}>
                        <Text style={styles.text1}>Do: </Text>
                        <Text style={styles.text2}>{this.state.doT}</Text>
                    </View>
                    <View style={styles.rightItem}>
                        <Text style={styles.text1}>Stawka: </Text>
                        <Text style={styles.text2}>{this.state.stawka}</Text>
                    </View>
                    <View style={styles.rightItem}>
                        <Text style={styles.text1}>Dniówka: </Text>
                        <Text style={styles.text2}>{this.state.dniowka}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginVertical: 4,
        marginHorizontal: 8,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.75,
        shadowRadius: 1,
        elevation: 2,
        justifyContent: 'space-between',
        justifyContent: 'center',
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    right: {
        flexDirection: 'column',
        flex: 1,
    },
    rightItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    text2: {
        fontWeight: '700',
        color: '#000',
    },
    img: {
        marginHorizontal: 8,
		alignSelf: 'center',
		
    },
    dateText: {
        fontSize: 18,
        color: '#000',
        fontWeight: '600',
    },
})
