import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Animated
    
} from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import { useRoute } from '@react-navigation/native';

import {COLORS, icons, FONTS, SIZES, images} from "../constants";





const Restaurant = ({route, navigation}) => {

    const ScrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderItems, setOrderItems] =React.useState([]); 

    React.useEffect(() => {
        const {item, currentLocation} = route.params;


        setRestaurant(item)
        setCurrentLocation(currentLocation)
    })

    function editOrder(action,menuId,price){

        let orderList = orderItems.slice()
        let item = orderList.filter(a =>a.menuId ==menuId)

        if(action == "+"){
            if(item.length > 0){
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price

            }else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total:price 
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        }else {

              if(item.length > 0 ){
                  if(item[0]?.qty > 0){
                      let newQty = item[0].qty - 1
                      item[0].qty = newQty
                      item[0].total = newQty * price
                  }
              }  
             setOrderItems(orderList)  
        }
        
    }

    function getOrderQuantity(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if(orderItem.length > 0 ){
            return orderItem[0].qty
        }
        return 0

    }

    function getBasketItemCount(){
        let itemCount = orderItems.reduce((a,b) => a + (b.qty || 0 ), 0 )
        return itemCount
    }

    function sumOrder(){
        let total = orderItems.reduce((a, b) =>  a + (b.total || 0  ), 0)
        return total.toFixed(2)
    }

    function renderHeader() {
        return(
    
            <View style  = {{ flexDirection: 'row', height: 50 }}>
    
                <TouchableOpacity
                    style = {{ 
                        width:50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent:'center'
                    }}
                    onPress = { () => navigation.goBack()}>
    
                        <Image
                        
                            source = {icons.back}
                            resizeMode = 'contain'
                            style = {{
                                width: 30,
                                height:30,
                            }}/>
                </TouchableOpacity>
    
                <View style = {{ flex:1, alignItems:'center', justifyContent:'center'}}>
                    <View
                        style = {{
                            width: '60%',
                            height: '100%',
                            backgroundColor: COLORS.lightGray4,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius: SIZES.radius
                        }}>
                            <Text style = {{ ...FONTS.h4}}>{restaurant?.name}</Text>
                    </View>
              </View>
                <TouchableOpacity
                style = {{ 
                    width:50,
                    paddingRight:SIZES.padding * 2,
                    justifyContent:'center' }}>
                        <Image
                            source = {icons.list}
                            resizeMode = 'contain'
                            style = {{
                                width: 30,
                                height: 30
                            }}
    
                        />
                </TouchableOpacity>
            </View>
    
        )
    }

   // const key = Math.random().toString(36).substring(2,9)

     function renderFoodInfo() {
          return(
               <Animated.ScrollView
                 horizontal
                 pagingEnable
                 ScrollEventThrottle  = {16}
                 snapToAlignment = "center"
                showsHorizontalScrollIndicator = {false}
                onScroll = {Animated.event([
                    {nativeEvent: {contentOffset: {x: ScrollX } } }
                    
                    ],{useNativeDriver:false})}
                  >
                    {
                          restaurant?.menu.map((item, index) => (
                            <View
                            key ={index} 
                            style = {{ alignItems: 'center'}} >


                                <View style = {{ height: SIZES.height * 0.35}}>
                                    {/* Food Image */}
                            <Image
                            source = {item.photo}
                            resizeMode = "cover"
                            style = {{
                                width:SIZES.width,
                                height: "100%"
                            }}/>

                             {/* Quantity */}

                             <View 
                            style = {{
                                position: 'absolute',
                                bottom: -20,
                                width: SIZES.width,
                                height:50,
                                justifyContent: 'center',
                                flexDirection: 'row',  
                            }}>
                                <TouchableOpacity
                                style = {{
                                    width: 50,
                                    backgroundColor:COLORS.white,
                                    alignItems:'center',
                                    justifyContent: 'center',
                                    borderTopLeftRadius:25,
                                    borderBottomLeftRadius:25,
                                }}
                                 onPress = { () => editOrder("-", item.menuId, item.price)}
                                >
                                <Text style = {{...FONTS.body1}}>-</Text>
                                </TouchableOpacity>

                                <View
                                style = {{
                                    width:50,
                                    backgroundColor: COLORS.white,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                >
                                    <Text style = {{ ...FONTS.h2}}>{getOrderQuantity(item.menuId)}</Text>
                                </View>

                                <TouchableOpacity
                                style = {{
                                    width:50,
                                    backgroundColor:COLORS.white,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottomRightRadius: 25,
                                    borderTopRightRadius: 25,
                                    }}
                                    onPress = {() => editOrder("+", item.menuId,item.price)}
                                    >
                                        <Text style = {{...FONTS.body1}}>+</Text>

                                </TouchableOpacity>
                            </View>                           
                         </View>

                              {/* Name and description       */}

                                <View
                                style = {{
                                    width:SIZES.width,
                                    alignItems: 'center',
                                    marginTop:15,
                                    paddingHorizontal: SIZES.padding * 2
                                }}>
                                    <Text style = {{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{item.name} - {item.price.toFixed(2)}</Text>
                                    <Text style = {{...FONTS.body3}}>{item.description}</Text>
                                </View>

                                {/* Calories */}

                                        <View
                                        style = {{
                                            flexDirection: 'row',
                                            marginTop: 10

                                        }}>

                                            <Image
                                            source = {icons.fire}
                                            style = {{
                                                width:20,
                                                height:20,
                                                marginRight: 10
                                            }}
                                            />
                                                <Text style = {{ ...FONTS.body3, color:COLORS.darkgray}}>{item.calories.toFixed(2)} cal</Text>
                                        </View>
                                </View>

                        ))
                    }
              </Animated.ScrollView>
          )
                
     }

     function renderDots(){
        const dotPosition = Animated.divide(ScrollX ,SIZES.width)
        return(
            <View style = {{ height:30 }}>
                 <View
                 style = {{
                     flexDirection: 'row',
                     alignItems: 'center',
                     justifyContent: 'center',
                     height: SIZES.padding

                 }}>  
                 {
                     restaurant?.menu.map((item, index) =>{
                        
                        const opacity = dotPosition.interpolate({
                            inputRange : [index - 1, index, index + 1],
                            outputRange: [0.3, 1 , 0.3],
                            extrapolate: "clamp"
                        })

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1 ],
                        outputRange: [SIZES.base * 0.8, 10 , SIZES.base * 0.8],
                        extrapolate: "clamp"
                    })

                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                        extrapolate: "clamp"

                    })

                        return (
                            <Animated.View
                            
                            key = {index}
                            opacity = {opacity}
                            style = {{
                                borderRadius: SIZES.radius,
                                marginHorizontal: 6,
                                width: dotSize,
                                height: dotSize,
                                backgroundColor: dotColor
                            }} />
                        )
                     })}

                </View>
            </View>

        )

     }

        
     function  renderOrder() {

        return(
             <View>

            {
                renderDots()
            }
            <View 
            style = {{
                backgroundColor:COLORS.white,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40

            }}>
                    <View
                    style = {{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: SIZES.padding * 2,
                        paddingHorizontal: SIZES.padding * 3,
                        borderBottomColor: COLORS.lightGray2,
                        borderBottomWidth: 1


                    }}>
                        <Text style = {{ ...FONTS.h3}}>{getBasketItemCount()} items in Cart</Text>
                        <Text style = {{ ...FONTS.h3}}>{sumOrder()} </Text>
                        </View>

                        <View
                        style = {{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal:SIZES.padding * 3 }}>

                                    <View
                                    style = {{
                                        flexDirection: 'row'}}
                                        resizeMode = "contain">
                                        <Image
                                        source = {icons.pin}
                                        style = {{
                                            width:20,
                                            height:20,
                                            tintColor:COLORS.darkgray}}/>
                                            <Text style = {{ ...FONTS.h4,marginLeft:SIZES.padding}}>Location</Text>
                                        </View>
                                  <View style = {{ flexDirection: 'row'}}>
                                        <Image
                                        source = {icons.mastercard}
                                        resizeMode = "contain"
                                        style = {{
                                            width:20,
                                            height:20,
                                            tintColor: COLORS.darkgray
                                        }} 
                                        />
                                        
                                        <Text style = {{ marginLeft:SIZES.padding, ... FONTS.h4}}>8888</Text>
                                </View>
                         </View>
                         {/* Order Button */}
                             <View
                             style = {{
                                 padding: SIZES.padding * 2,
                                 alignItems: 'center',
                                 justifyContent: 'center'
                             }}>

                                 <TouchableOpacity
                                 style = {{
                                     width:SIZES.width * 0.9,
                                     padding:SIZES.padding,
                                     backgroundColor: COLORS.primary,
                                     alignItems:'center',
                                     borderRadius: SIZES.radius
                                 }}
                                 onPress = {() => navigation.navigate("OrderDelivery",{
                                     restaurant:restaurant,
                                     currentLocation:currentLocation
                                 })}
                                 >
                                     <Text style = {{ ...FONTS.h2,color:COLORS.white}}>Order</Text>
                                     
                                 </TouchableOpacity>

                             </View>
                    </View>
                    {/* {isIphoneX() && 
                    <View 
                    style = {{
                       position: 'absolute',
                       bottom: -34,
                       left:0,
                       right:0,
                       height:34,
                       backgroundColor: COLORS.white 
                    }}>

                    </View> */}
                    
            </View>

            
        )
     }
                    
           
    
    return(
        <SafeAreaView style = {styles.container}>
        {renderHeader()}
        {renderFoodInfo()}
        {renderOrder()}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: COLORS.lightGray4,
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset:{
            width:0,
            height:3,
        },
        shadowOpacity:0.1,
        shadowRadius:3,
        elevation:1,
    }
})
export default Restaurant;