import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar,KeyboardAvoidingView,Platform} from 'react-native';
import { screenDiagonal, CustomTextInput, CommonButton } from '../components/customcomponents'
import { StyleSheetFactory, colors } from '../components/stylesheetfactory'
import { LoginBg } from '../assets/svg'
import Toast from 'react-native-simple-toast';
import { ScrollView } from 'react-native-gesture-handler';

const dgl = screenDiagonal()
const commonStyles = StyleSheetFactory()
const Login = ({ ...props }) => {
    const [mobileNumber, setMobileNumber] = useState();
    const [password, setPassword] = useState();
    const [securePass, setSecurePass] = useState(true);

    useEffect(() => {
        Toast.show('Welcome');
    }, []);

    const handleLogin = () => {
        props.navigation.navigate('Search')
    }

    const handlePasswordSecure = () => {
        setSecurePass(!securePass);
    }

    const styles = StyleSheet.create({
        titleContainer: { marginTop: dgl * 0.07, marginBottom: dgl * 0.03 },
        title1: { fontFamily: 'Poppins-Medium', color: '#757575', fontSize: dgl * 0.028 },
        title2: { fontFamily: 'Poppins-Medium', color: '#262626', fontSize: dgl * 0.013 },
        imageWrap: { flex: 1, backgroundColor: colors.backgroundColor }
    })

    return (
        <>  
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={commonStyles.appcontainer}>
                    <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title1}>Welcome</Text>
                        <Text style={styles.title2}>vaccinator & verifier</Text>
                    </View>
                    <CustomTextInput 
                        label={'Mobile Number *'}
                        placeholder={'Mobile Number'}
                        onChangeText={(text) => setMobileNumber(text)}
                        value={mobileNumber}
                    />
                    <CustomTextInput 
                        label={'Password *'}
                        placeholder={'Password'}
                        secure ={true}
                        secureTextEntry={securePass}
                        handlePasswordSecure={handlePasswordSecure}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    <CommonButton
                        onPress={handleLogin}
                        text={'Log in'}
                    />
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.imageWrap}
                >
                    <LoginBg width={'100%'}/>
                </KeyboardAvoidingView>
            </ScrollView>
        </>

    );
}

export default React.memo(Login);
