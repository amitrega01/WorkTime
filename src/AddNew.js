import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    DatePickerAndroid,
    TimePickerAndroid,
    TextInput,
} from 'react-native'

let ID = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
  };

import firebase from 'firebase'
var config = {
    databaseURL: 'https://moj-super-projekt.firebaseio.com',
    projectId: 'moj-super-projekt',
}
if (!firebase.apps.length) {
    firebase.initializeApp(config)
}
let koncowka = 'zł/h'
let today = new Date()
let stringDate = today.toISOString().substring(0, 10)

export default class AddNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataPracy: 'dzisiaj',
            od: '8:00',
            do: '16:00',
            stawka: '-',
        }
    }

    componentDidMount = () => {
        this.setState({
            dataPracy: stringDate,
        })
    }
    async openAndroidDatePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
            })
            if (action == DatePickerAndroid.dateSetAction) {
                this.setState({
                    dataPracy: year + '-' + month + '-' + day,
                })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message)
        }
    }

    async openTimePicker(pole) {
        if (pole == 1) {
            try {
                const { action, hour, minute } = await TimePickerAndroid.open({
                    hour: 8,
                    minute: 0,
                    is24Hour: true, // Will display '2 PM'
                })
                if (action !== TimePickerAndroid.dismissedAction) {
                    if (minute == 0) var minuty = minute + '0'
                    else minuty = minute
                    this.setState({
                        od: hour + ':' + minuty,
                    })
                }
            } catch ({ code, message }) {
                console.warn('Cannot open time picker', message)
            }
        } else if (pole == 2) {
            try {
                const { action, hour, minute } = await TimePickerAndroid.open({
                    hour: 16,
                    minute: 0,
                    is24Hour: true, // Will display '2 PM'
                })
                if (action !== TimePickerAndroid.dismissedAction) {
                    if (minute == 0) var minuty = minute + '0'
                    else minuty = minute
                    this.setState({
                        do: hour + ':' + minuty,
                    })
                }
            } catch ({ code, message }) {
                console.warn('Cannot open time picker', message)
            }
        }
    }
    pokazDatePicker() {}
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Zanotuj pracę</Text>
                <View style={styles.pole}>
                    <Text style={styles.inputTextHeader}>Data:</Text>
                    <TouchableOpacity
                        style={{ flex: 3, alignItems: 'center' }}
                        onPress={() => {
                            this.openAndroidDatePicker()
                        }}
                    >
                        <Text style={styles.date}>{this.state.dataPracy}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.pole}>
                    <Text style={styles.inputTextHeader}>Od:</Text>
                    <TouchableOpacity
                        style={{ flex: 3, alignItems: 'center' }}
                        onPress={() => {
                            this.openTimePicker(1)
                        }}
                    >
                        <Text style={styles.date}>{this.state.od}</Text>
                    </TouchableOpacity>
                </View>

                
                <View style={styles.pole}>
                    <Text style={styles.inputTextHeader}>Do:</Text>
                    <TouchableOpacity
                        style={{ flex: 3, alignItems: 'center' }}
                        onPress={() => {
                            this.openTimePicker(2)
                        }}
                    >
                        <Text style={styles.date}>{this.state.do}</Text>
                    </TouchableOpacity>
                </View>
				<View style={styles.pole}>
                    <Text style={styles.inputTextHeader}>Stawka:</Text>
                    <TouchableOpacity style={{ flex: 3, alignItems: 'center' }}>
                        <TextInput
                            style={styles.date}
                            keyboardType="number-pad"
                            onTouchEnd={() => {
                                this.setState({
                                    stawka: '',
                                })
                            }}
                            onChangeText={text => {
                                this.setState({
                                    stawka: text,
                                })
                            }}
                            onSubmitEditing={() => {
                                this.setState({
                                    stawka: this.state.stawka + koncowka,
                                })
                            }}
                        >
                            {this.state.stawka}
                        </TextInput>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button}
				onPress={() => {
					//dodawanie do 
					let path = 'worktimes/'+ID();
					firebase.database().ref(path).set({
			data: Date.parse(this.state.dataPracy),
			od: this.state.od,
			do: this.state.do,
			stawka: this.state.stawka
		}).then((data) => {
			console.log('data', data);
		}).catch((error) => {
			console.log('error',error)
		})
				}}>
				{/* //tutaj powrocic do home */}
                    <Text style={styles.buttonText}>Dodaj</Text>
					
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        backgroundColor: '#000',
        height: 100 + '%',
    },
    header: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    pole: {
        flexDirection: 'row',
        margin: 16,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
    },
    inputTextHeader: {
        flex: 1,
        fontSize: 18,
        color: '#fff',
        padding: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 18,
        color: '#eee',
        padding: 16,
    },
    button: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 10,
        padding: 16,
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
})
