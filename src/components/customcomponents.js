import React, { } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { StyleSheetFactory, colors } from './stylesheetfactory'
import { EyeIcon, Menu, BackArrow, CloseIcon } from '../assets/svg'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const commonStyles = StyleSheetFactory()
const { width, height } = Dimensions.get('window');

export const screenDiagonal = () => {
    let diagonal = Math.sqrt((width * width) + (height * height))
    return parseFloat(diagonal.toFixed(2))
}

export async function OfflineNotice() {
    const state = await NetInfo.fetch();
    return state.isConnected == true ? true : false;
}

export function filterQuery(params) {
    var query = '';
    for (const [key, value] of Object.entries(params)) {
        if (value != null && value != undefined)
            query += `${key}=${encodeURIComponent(value)}&`;
    }
    query = query.substring(0, query.length - 1);
    return query;
}

const dgl = screenDiagonal()
export const CustomTextInput = ({ label, placeholder, secure, secureTextEntry, handlePasswordSecure, errText, value, onChangeText, editable, keyboardType }) => {
    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.labelContainer}>
                <Text style={commonStyles.labelStyle}>{label}</Text>
            </View>
            <View style={commonStyles.innerContainer}>
                <TextInput 
                    style={commonStyles.textInput}
                    placeholder={placeholder}
                    fontSize={dgl*0.014}
                    placeholderTextColor={'#5E5E5E'}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                    editable={editable}
                    keyboardType={keyboardType}
                />
                {secure ? 
                    <TouchableOpacity onPress={handlePasswordSecure} style={commonStyles.eyeIcon}>
                        <EyeIcon fill={secureTextEntry ? '#373737' : '#3F80F6'}  />
                    </TouchableOpacity>
                : null}
            </View>
            {errText ? <View style={{ width: '100%', height: dgl * 0.045 }}><Text style={commonStyles.commonFieldErr}>{errText}</Text></View> : null}

        </View>
    )
}

export const CommonButton = ({ text, onPress, disabled }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.6} style={commonStyles.commonButton}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {text ? <Text style={commonStyles.commonButtonText}>{text}</Text> : null}
            </View>
        </TouchableOpacity>
    )
}

export const Header = ({ title, goBack, menu, loading, subtitle, }) => {
    return (
        <View style={commonStyles.headerContainer}>
            <StatusBar translucent backgroundColor={colors.backgroundColor} barStyle='dark-content' />
            <View style={commonStyles.titleConatainer}>
                <TouchableOpacity onPress={goBack} style={commonStyles.arrowWrap} hitSlop={commonStyles.hitSlop}>
                    <BackArrow/>
                </TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    {title ? <Text style={commonStyles.headerTitle}>{title}</Text> : null}
                    {subtitle ?
                        <TouchableOpacity onPress={goBack} style={commonStyles.sunbtitleBox}>
                            <Text style={commonStyles.subtitle}>{subtitle}</Text> 
                    </TouchableOpacity>
                    : null}
                </View>
            </View>
            {menu ? 
                <TouchableOpacity>
                    <Menu/>
                </TouchableOpacity>
            : null }
            <LoadingCommon loading={loading ? true : false} />
        </View>
    )
}

export const TouchableBoxView = ({ label, value, onPressIn }) => {
    return (
        <TouchableOpacity style={commonStyles.container} onPress={onPressIn}>
            <View style={commonStyles.labelContainer}>
                <Text style={commonStyles.labelStyle}>{label}</Text>
            </View>
            <View style={commonStyles.innerContainer}>
                <Text style={commonStyles.touchBox}>{value}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const LoadingCommon = ({ loading }) => {
    return (
        <>
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                style={{ zIndex: 1100 }}
                onRequestClose={() => { }}>
                <View style={commonStyles.outterWrap}>
                    <View style={commonStyles.innerWrap}>
                        <ActivityIndicator animating={loading} color={'#014ED0'} />
                    </View>
                </View>
            </Modal>

        </>
    )
}

export const ModalStructure = (props) => {

    const {
        visible = false,
        header,
        hideModel,
        children,
    } = props;

    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={hideModel}>
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                <TouchableOpacity onPress={hideModel} style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={hideModel} style={{ flex: 1 }} />
                    <View style={{ alignSelf:'center', backgroundColor: colors.backgroundColor, width: '90%', maxHeight: '80%', borderRadius: dgl * 0.02, justifyContent: 'center', padding: dgl * 0.02 }}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.borderColor1, paddingVertical: dgl * 0.008, paddingHorizontal: dgl * 0.011 }}>
                            <View style={{ width:'70%'}}>
                                <Text style={{ color: '#3773E1', fontSize: 14, fontFamily: 'Poppins-SemiBold', paddingVertical: 1 }}>{header}</Text>
                            </View>
                            <TouchableOpacity onPress={hideModel} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                                <CloseIcon width={dgl * 0.02} height={dgl * 0.02} fill1={'#3773E1'} fill2={'#ffffff'} />
                            </TouchableOpacity>
                        </View>
                        {children}
                    </View>
                    <TouchableOpacity onPress={hideModel} style={{ flex: 1 }} />
                </View>
                <TouchableOpacity onPress={hideModel} style={{ flex: 1 }} />
            </View>
        </Modal>
    )
}