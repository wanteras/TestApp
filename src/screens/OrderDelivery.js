import React from "react";
import {

    View,
    Text,
    Image,
    TouchableOpacity,
    Animated
    
} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import MapView , {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import {COLORS, icons, FONTS, SIZES, images, GOOGLE_API_KEY} from "../constants";
import { NativeRouter, Route, Link } from "react-router-native";
import MapViewDirections from 'react-native-maps-directions';

const OrderDelivery = ({route, navigation}) => {
    const [restaurant, setRestaurant] = React.useState(null)
    const [streetName, setStreetName] = React.useState("")
    const [fromLocation, setFromLocation] = React.useState(null)
    const [toLocation, setToLocation] = React.useState(null)
    const [region, setRegion] = React.useState(null)

    const origin = {latitude: 37.3318456, longitude: -122.0296002};
    const destination = {latitude: 37.771707, longitude: -122.4053769};

    React.useEffect( () => {
        let {restaurant, currentLocation} = route.params

        let fromLoc = currentLocation.gps 
        let toLoc = restaurant.location
        let street = currentLocation.streetName

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude)/2 ,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta : Math.abs(fromLoc.longitude - toLoc.longitude) *  2

            
        }
        setRestaurant(restaurant)
        setStreetName(street)
        setFromLocation(fromLoc)
        setToLocation(toLoc)
        setRegion(mapRegion)

    }, [])

    function zoomIn(){
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2

        }
        setRegion(newRegion)
        MapView.current.animateToRegion(newRegion, 200)
    } 

    function zoomOut(){
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2

        }
        setRegion(newRegion)
        MapView.current.animateToRegion(newRegion, 200)
    }


    function renderMap(){

       const  destinationMarker = () => (
           <Marker
           coordinate = {toLocation}>
               <View
               style = {{
                   height: 30,
                   width: 30,
                   borderRadius: 20,
                   alignItems: 'center',
                   justifyContent: 'center',
                   backgroundColor: COLORS.primary,
               }}>
                   <View
                   style = {{
                    height: 10,
                    width:10,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:COLORS.primary,
                   }}>

                       <Image
                       source = {icons.pin}
                       style = {{
                           width:25,
                           height: 25,
                           tintColor:COLORS.black }}/>

                   </View>

               </View>

           </Marker>
       )

       const carIcon = () => (
           <Marker
           coordinate = {fromLocation}
           anchor = {{ x: 0.5, y: 0.5}}
           flat = {true}
           >
               <Image
               source = {icons.car}
               style = {{
                   width: 40,
                   height: 40
               }} />     
           </Marker>
           )
        return(
        <View style = {{ flex:1 }}>
            <MapView 
            provider = {PROVIDER_GOOGLE}
            initialRegion = {region}
            style = {{flex:1}} 
            zoomEnabled = {true}>
                <MapViewDirections
                origin = {fromLocation}
                destination={toLocation}
                apikey = {GOOGLE_API_KEY}
                strokeWidth = {5}
                strokeColor = {COLORS.primary}
                optimizeWaypoints = {true}  />
            {destinationMarker()}
            {carIcon()}
            </MapView>
        </View>
        )
    }

    function renderDestinationHeader() {
        return(
            <View
            style = {{
                position: 'absolute',
                top:50,
                left: 0,
                right:0,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center'
            }}>


                <View
                style = {{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: SIZES.width * 0.9,
                    paddingVertical: SIZES.padding, 
                    paddingHorizontal:SIZES.padding * 2,
                    borderRadius: SIZES.radius,
                    backgroundColor:COLORS.white,
                }}>
                    <Image
                    source = {icons.red_pin}
                    style = {{
                        width: 30,
                        height:30,
                        marginRight: SIZES.padding
                    }}
                    />
                    <View style = {{flex: 1}}>
                        <Text style = {{...FONTS.body3}}>{streetName}</Text>
                    </View>

                    <Text>7 mins</Text>

                </View>

            </View>

        )
    }

    function renderDeliveryInfo(){

        return( 
            <View
            style = {{
                position: 'absolute',
                bottom: 50,
                left: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center'

            }}>

                <View
                style = {{
                    width: SIZES.width * 0.9,
                    paddingVertical: SIZES.padding * 3,
                    paddingHorizontal: SIZES.padding * 2,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white
                }}>
                    <View style = {{ flexDirection: 'row',alignItems: 'center'}}>
                    {/* Avatar */}
                    <Image
                    source = {restaurant?.courier.avatar}
                    style = {{
                        width: 50,
                        height:50,
                        borderRadius: 25}}/>
                         

                        <View style = {{
                            flex:1 , marginLeft:SIZES.padding }}>
                                <View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}></View>
                                    <Text style = {{...FONTS.h4}}>{restaurant?.courier.name}</Text>
                                    <View style = {{ flexDirection: 'row'}}>
                                    <Image
                                        source = {icons.star}
                                        style = {{
                                            width:18,
                                            height: 18,
                                            tintColor:COLORS.primary,
                                            marginRight: SIZES.padding
                                        }}
                                        />
                                        <Text style = {{ ...FONTS.body3}}>{restaurant?.rating}</Text>
                                 </View> 
                            </View>
                            <Text style = {{...FONTS.body3, color:COLORS.darkgray}}>{restaurant?.name}</Text>
                        </View>
                        <View
                    style = {{
                        flexDirection:  'row',
                        marginTop:SIZES.padding * 2,
                        justifyContent: 'space-between',
                    }}>
                        <TouchableOpacity
                        style = {{
                            height: 50,
                            width: SIZES.width * 0.5 - SIZES.padding * 6,
                            backgroundColor:COLORS.primary,
                            alignItems: 'center',
                            justifyContent:'center',
                            borderRadius: 10 }}
                            onPress = {() => navigation.navigate("Home")}
                        >

                            <Text style = {{ ...FONTS.h4,color:COLORS.white}}>Call</Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                                style = {{
                                height: 50,
                                width: SIZES.width * 0.5 - SIZES.padding * 6,
                                backgroundColor:COLORS.secondary,
                                alignItems: 'center',
                                justifyContent:'center',
                                borderRadius: 10 }}
                                onPress = {() => navigation.goBack()}
                        >
                                <Text style = {{ ...FONTS.h4,color:COLORS.white}}>Cancel</Text>

                        </TouchableOpacity>
                    </View>
                   
                        
                    </View>
                </View>
        )
    }

    function renderButtons() {

        return(
        <View
            style = {{
            position: 'absolute',
            bottom: SIZES.height * 0.35,
            right: SIZES.padding * 2,
            width: 60,
            justifyContent: 'space-between'
            }}>
                {/* Zomm in */}
                <TouchableOpacity
                style = {{
                    width:50,
                    height: 50,
                    borderRadius: 30,
                    backgroundColor:COLORS.white,
                    alignItems:'center',
                    justifyContent: 'center',
                    marginBottom: 10
                }}
                onPress = { ()=> zoomIn()}
                >
                    <Text style = {{ ...FONTS.h3}}>+</Text>

                </TouchableOpacity>


                {/* Zoom Out */}

                <TouchableOpacity
                style = {{
                    width:50,
                    height: 50,
                    borderRadius: 30,
                    backgroundColor:COLORS.white,
                    alignItems:'center',
                    justifyContent: 'center'
                }}
                onPress = { ()=> zoomOut()}
                >
                    <Text style = {{ ...FONTS.h3}}>-</Text>

                </TouchableOpacity>

        </View>
        )
    }

    return(
        <View style = {{ flex:1 }}>
           {renderMap()}
           {renderDestinationHeader()}
           {renderDeliveryInfo()}
           {renderButtons()}
          
           
        </View>
    );
}

export default OrderDelivery;