import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    margin: 10
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
export default function (props) {return(
  <Document>
    <Page size="A4" style={styles.page}>
      <View >
      <Text style={{marginBottom: '25px'}}>TURNO: {props.data.turno}</Text>
        <Text>Gracias por registrarte:</Text>
        <Text style={{marginBottom: '50px'}}>{props.data.nombre_tramite}</Text>
        <Text>Estos son los datos de tu turno:</Text>
        <Text style={{marginBottom: '25px'}}>CURP: {props.data.curp}</Text>
        <Text style={{marginBottom: '25px'}}>CIUDAD: {props.data.ciudad.nombre}</Text>
        <Text style={{marginBottom: '25px'}}>NIVEL: {props.data.nivel}</Text>
        <Text style={{marginBottom: '25px'}}>ASUNTO: {props.data.asunto}</Text>
        <Text>CODIGO QR</Text>
        <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${props.data.curp}`} />
      </View>
    </Page>
  </Document>
)};
