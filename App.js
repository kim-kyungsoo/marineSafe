/* npm install react-native-nmap --save
npm install --save react-navigation
npm install @react-navigation/stack
npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/bottom-tabs
npm install @react-navigation/native
*/

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, Align} from "./map";
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
 
const P0 = {latitude: 36.396762, longitude: 127.352879};
const P1 = {latitude: 37.565051, longitude: 126.978567};
const P2 = {latitude: 37.565383, longitude: 126.976292};
const P4 = {latitude: 37.564834, longitude: 126.977218};
const P5=''

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const App = () => {
    
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomeScreen}/>
            <Stack.Screen name="원래대로" component={MapViewScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
}


const HomeScreen = () =>
    <Tab.Navigator>
        <Tab.Screen name={"map"} component={MapViewScreen}/>
        <Tab.Screen name={"text"} component={TextScreen}/>
    </Tab.Navigator>
 
const TextScreen = () => {
    return <Text>text</Text>
}
 
const MapViewScreen = ({navigation}) => {
    // useEffect(() => {
    //     requestLocationPermission();
    // }, []);
    const [pgroup, setPgroup]=useState([])
    let markerSet=[];

    function setMarker() {
      // let st=(<><Marker coordinate={P0}  /></>)
      // let st1=(<><Marker coordinate={P4}  /> </>)
      // markerSet.push(st)
        
			setPgroup(pgroup.push(<Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "세드나", align: Align.center}}/>))
			setPgroup(pgroup.push(<Marker  coordinate={P4} onClick={() => console.warn('onClick! p0')} caption={{text: "next caption", align: Align.center}}/>))
        console.log('markerset',markerSet)
        return pgroup;
            //  <>
            // <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "세드나", align: Align.center}}/> 
            // <Marker  coordinate={P4} onClick={() => console.warn('onClick! p0')} caption={{text: "next caption", align: Align.center}}/> 
            // </>
    
    }
    //setMarker();
    return <>
    <NaverMapView style={{width: '100%', height: '100%'}}
                  showsMyLocationButton={true}
                  //center={{...P0, zoom: 16}}
                //   onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                //   onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                //   onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                  useTextureView>
       {setMarker()}
        {/* <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} caption={{text: "세드나", align: Align.center}}/>  
        <Marker coordinate={P4} onClick={() => console.warn('onClick! p0')} caption={{text: "next caption", align: Align.center}}/> */}
        {/* <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
        <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>
        <Marker coordinate={P4} onClick={() => console.warn('onClick! p4')} image={require("./marker.png")} width={48} height={48}/> */}
        {/* <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>
        <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>
        <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
        <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/> */}
    </NaverMapView>
    
    <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress={() => navigation.navigate('원래대로')}>
        <View style={{backgroundColor: 'gray', padding: 4}}>
            <Text style={{color: 'white'}}>자세히</Text>
        </View>
    </TouchableOpacity>
    {/* <Text style={{position: 'absolute', top: '95%', width: '100%', textAlign: 'center'}}>Icon made by Pixel perfect from www.flaticon.com</Text> */}
    </>
};
 
async function requestLocationPermission() {
    if (Platform.OS !== 'android') return;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'show my location need Location permission',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}
 
 
export default App;
