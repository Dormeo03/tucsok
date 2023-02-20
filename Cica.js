import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput } from 'react-native';
const IP=require('./Ipcim')

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      nev:"",
      megjegyzes:""
    }
  }

  uzenet=(szam)=>{
    alert(szam)
   
    var bemenet={
      bevitel1:szam,
      bevitel2:this.state.nev,
      bevitel3:this.state.megjegyzes
    }

  fetch(IP.ipcim + "uzenet", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => {
alert(y)
  }
  );

  }


  componentDidMount(){
    return fetch(IP.ipcim + 'cica')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          <Text style={{color:"black",textAlign:"center",fontSize:20,marginTop:50,marginBottom:0}} >{"Bejelentve:"}</Text>
          <Text style={{color:"green",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.cica_datum} </Text>
          <Text style={{color:"orange",fontSize:35,textAlign:"center",marginTop:50,marginBottom:0}}>{"Név:"}</Text>
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.cica_nev} </Text>
          <Image  source={{uri: IP.ipcim +item.cica_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />  
          
          <Text style={{marginLeft: 25, marginTop: 20}}>Név:</Text> 
        <TextInput
        style={{marginLeft: 25, marginTop: 5, height: 40}}
        placeholder="Írd be a neved!"
        onChangeText={(beirtszoveg)=>this.setState({nev:beirtszoveg})}
        value={this.state.nev}
      />

      <Text style={{marginLeft: 25, marginTop: 20}}>Megjegyzés:</Text> 
      <TextInput
      style={{marginLeft: 25, marginTop: 5, height: 40}}
      placeholder="Megjegyzés"
      onChangeText={(beirtszoveg)=>this.setState({megjegyzes:beirtszoveg})}
      value={this.state.megjegyzes}
    />
          <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.uzenet(item.cica_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Üzenet</Text>
      </TouchableOpacity>
          </View>
        
        }

        
          keyExtractor={({cica_id}, index) => cica_id}
        />
      </View>

      
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
  }
});