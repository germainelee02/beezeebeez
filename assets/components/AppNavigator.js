import * as Screens from "../screens/index";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./homeComponents/TabNavigator";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Screens.LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={Screens.SignUpScreen}
          options={{
            title: "Sign Up",
            headerStyle: { backgroundColor: "rgba(245, 233, 188, 1)" },
          }}
        />
        <Stack.Screen
          name="temp home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="monthly expenses"
          component={Screens.MonthlyExpenseScreen}
          options={{ headerShown: true, title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
