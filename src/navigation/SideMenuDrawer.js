import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Contact, Home } from '../screens';


const Drawer = createDrawerNavigator();
const SideMenuDrawer = () => {
    
    return (
        <Drawer.Navigator>
          {/* Define your screens for the drawer */}
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Contact" component={Contact} />
          {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
        </Drawer.Navigator>
      )
}

export default SideMenuDrawer