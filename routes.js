import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { Principal } from './screens/principal';
import { Carrinho } from './screens/carrinho';
import { Adicionar } from './screens/adicionar';
import { Receita } from './screens/receita';
import { Categoria } from './screens/categoria';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function AdicionarStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Adicionar" component={Adicionar} />
      </Stack.Navigator>
    );
  }

export function Routes() {

    return (
        <Tab.Navigator
            initialRouteName="principal"
            activeColor="#409A3C"
            inactiveColor='#CFCFCF'
            barStyle={{ backgroundColor:'#FFF'}}
            shifting={true}
        >
            <Tab.Screen
                name="principal"
                component={Principal}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={30}/>
                    ),
                }}
                tabBarAccessibilityLabel="Início"

            />
            <Tab.Screen
                name="categoria"
                component={Categoria}
                options={{
                    tabBarLabel: 'Categoria',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="shape-outline" color={color} size={30} />
                    ),
                }}
                tabBarAccessibilityLabel="Categoria"
            />
             <Tab.Screen
                name="adicionar"
                component={Adicionar}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="plus-circle" color='#409A3C' size={30} />
                    ),
                }}
                tabBarAccessibilityLabel="Adicinar"
            />
            <Tab.Screen
                name="carrinho"
                component={Carrinho}
                options={{
                    tabBarLabel: 'Carrinho',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={30} />
                    ),
                }}
                tabBarAccessibilityLabel="Carrinho"
            />
            <Tab.Screen
                name="receita"
                component={Receita}
                options={{
                    tabBarLabel: 'Receita',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="silverware-fork-knife" color={color} size={30} />
                    ),
                }}
                tabBarAccessibilityLabel="Receita"
            />
        </Tab.Navigator>
    );
}

// const ESTILO = StyleSheet.create({
//     tabNavigator: {
//         borderRadius: 10,
//         shadowRadius: 5,
//         shadowColor: '#000000',
//         shadowOpacity: 0.5,
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         elevation: 5,
//     }
// })
