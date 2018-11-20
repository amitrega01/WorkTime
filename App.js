import React, {Component} from 'react';
import { View} from 'react-native';
import Home from './src/Home';
import AddNew from './src/AddNew';

export default class App extends React.Component {
  render() {
    return (
      <View>
          <AddNew />
      </View>
    );
  }
}
