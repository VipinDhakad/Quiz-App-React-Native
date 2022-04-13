import { StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({title}) => {
  return (
    
      <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#98ED62",
        padding:12,
        margin:12,
        borderRadius:6,
        
    },
    btnText:{
        color:'black',
        fontSize:16,
        textAlign:'center'
    }
    
})