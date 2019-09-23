import React, { Component } from 'react';
import { View, Container, Content } from 'native-base';
import PureChart from 'react-native-pure-chart';
import { FlatList, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
 
class Chart extends Component {
    render() {
        let sampleData = [
            {
              seriesName: 'series1',
              data: [
                {x: '2018-02-01', y: 30},
                {x: '2018-02-02', y: 200},
                {x: '2018-02-03', y: 170},
                {x: '2018-02-04', y: 250},
                {x: '2018-02-05', y: 10}
              ],
              color: '#297AB1'
            },
            {
              seriesName: 'series2',
              data: [
                {x: '2018-02-01', y: 20},
                {x: '2018-02-02', y: 100},
                {x: '2018-02-03', y: 140},
                {x: '2018-02-04', y: 550},
                {x: '2018-02-05', y: 40}
              ],
              color: 'yellow'
            }
          ]
        return (
            <View style={CustomStyle.container}>
                <PureChart data={sampleData} type='bar' />
            </View>
        )
     }
}

const CustomStyle = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})

export default Chart;