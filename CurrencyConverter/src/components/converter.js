import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default class Converter extends Component {

  state = {
    tl: 0,
    usd: 0,
    cad: 0,
    jpy: 0,
    eur: 0,
    input: '',
    rates: []
  }

  getRates() {
    axios.get('http://data.fixer.io/api/latest?access_key=e2833b34a93151a60c75aae0c883d7c7&symbols=EUR,TRY,USD,CAD,JPY')
      .then(response => {
        console.log(response);
        const rates = response.data.rates;
        this.setState({
          rates
        })
      })
  }

  componentDidMount() {
    this.getRates();
  }

  render() {
    const { converterWrapper, inputStyle, textStyle } = styles;
    const { input, tl, usd, cad, jpy, eur, rates } = this.state;

    return (
      <View style={converterWrapper}>
        <TextInput placeholder='Enter EUR Value'
                   style={inputStyle}
                   keyboardType='numeric'
                   onChangeText={(text) => {
                     const i = parseFloat(text) || 0;

                     this.setState({
                       input: text,
                       tl: (i * rates['TRY']).toFixed(3),
                       usd: (i * rates['USD']).toFixed(3),
                       cad: (i * rates['CAD']).toFixed(3),
                       jpy: (i * rates['JPY']).toFixed(3),
                       eur: (i * rates['EUR']).toFixed(3)
                     })
                   }}
                   value={`${input}`} />

        <Text style={textStyle}>TRY : {tl} </Text>
        <Text style={textStyle}>USD : {usd} </Text>
        <Text style={textStyle}>CAD : {cad} </Text>
        <Text style={textStyle}>JPY : {jpy} </Text>
        <Text style={textStyle}>EUR : {eur} </Text>
        <View>
            <Button title="Yenile" onPress={() => { this.getRates() }} />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  converterWrapper: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center'

  },
  inputStyle: {
    width: 200,
    height: 50,
    paddingBottom: 25
  },
  textStyle: {
    width: 170,
    height: 50,
    fontWeight: 'bold'
  }
});