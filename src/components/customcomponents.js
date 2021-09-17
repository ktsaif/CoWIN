import React, { } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, Modal } from 'react-native';
import { Dimensions } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { StyleSheetFactory, colors } from './stylesheetfactory'
import { EyeIcon, Menu, BackArrow, CloseIcon } from '../assets/svg'

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
            <View style={commonStyles.wraper1}>
                <TouchableOpacity onPress={hideModel} style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={hideModel} style={{ flex: 1 }} />
                    <View style={commonStyles.wraper2}>
                        <View style={commonStyles.wraper3}>
                            <View style={{ width:'70%'}}>
                                <Text style={commonStyles.modalHeader}>{header}</Text>
                            </View>
                            <TouchableOpacity onPress={hideModel} hitSlop={commonStyles.hitSlop}>
                                <CloseIcon width={dgl * 0.02} height={dgl * 0.02} fill1={colors.buttonColor} fill2={'#ffffff'} />
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