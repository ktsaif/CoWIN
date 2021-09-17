import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { screenDiagonal, CustomTextInput, CommonButton, Header, TouchableBoxView, ModalStructure } from '../components/customcomponents'
import { Middleware } from '../components/middleware'
import { StyleSheetFactory, colors } from '../components/stylesheetfactory'
import Toast from 'react-native-simple-toast';
import { ScrollView } from 'react-native-gesture-handler';

const dgl = screenDiagonal()
const commonStyles = StyleSheetFactory()

const Search = ({ ...props }) => {
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeTitle, setActiveTitle] = useState('Search by pincode');
    const [pincode, setPincode] = useState();
    const [stateName, setStateName] = useState();
    const [stateId, setStateId] = useState();
    const [dctName, setDctName] = useState();
    const [dctId, setDctId] = useState();

    const [searchText, setSearchText] = useState('');
    const [stateArray, setStateArray] = useState([]);
    const [dctArray, setDctArray] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [modalDct, setModalDct] = useState(false);


    useEffect(() => {
        getSatates();
    }, []);

    const getSatates = async () => {

        var value = {
            url: 'https://cdndemo-api.co-vin.in/api/v2/admin/location/states',
            method: 'GET',
        }

        var resultMain = await Middleware(value) || [];
        if (resultMain) {
            if (resultMain.states){
                setStateArray(resultMain.states)
            } else {
                Toast.show('Somthing went wrong, try again later!')
            }
            setLoading(false)
            setIsRefreshing(false)
        }
    }

    const getDistricts = async (id) => {
        setLoading(true)
        var value = {
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/',
            method: 'GET',
            extraArg: id
        }

        var resultMain = await Middleware(value) || [];
        if (resultMain) {
            if (resultMain.districts){
                setDctArray(resultMain.districts)
            } else {
                Toast.show('Somthing went wrong, try again later!')
            }
            setLoading(false)
        } 
    }

    const goBackFn = () => {
        props.navigation.goBack()
    }

    const searchTypes = [
        { key: 1, title: 'Search by pincode', value: 'pincode' },
        { key: 2, title: 'Search by District', value: 'district'},
    ]
    
    const switchScreens = (title) => {
        setActiveTitle(title)
    }
    
    const renderSearchNavbar = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => switchScreens(item.title)} style={[styles.navTab, { borderBottomWidth: item.title == activeTitle ? dgl * 0.0022 : dgl * 0.0015, borderBottomColor: item.title == activeTitle ? '#014ED0' : colors.borderColor1}]}>
                <Text style={{fontFamily:'Poppins-Regular',fontSize:dgl*0.015}}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    const changeState = (item) => {
        setStateName(item.state_name)
        setStateId(item.state_id)
        setSearchText('')
        setModalState(false)
        setDctName()
        getDistricts(item.state_id)
    }

    const changeDistrict = (item) => {
        setDctName(item.district_name)
        setDctId(item.district_id)
        setSearchText('')
        setModalDct(false)
    }

    const handleSearch = (key) => {
        if (key == 'pincode') {
            if (pincode != null){
                var pat1 = /^\d{6}$/;
                if (!pat1.test(pincode)) {
                    Toast.show("Pin code should be 6 digits ");
                }else{
                    props.navigation.navigate('List',{ 'pincode': pincode })
                }
            }else{
                Toast.show('Enter a valid pincode to continue.')
            }

        } else {
            if ( stateId && dctId ){
                props.navigation.navigate('List', { 'dctId': dctId, 'dctName': dctName })
            } else {
                Toast.show('Select your state and district.')
            }
        }
    }
    
    const setDistricModal = () => {
        if (stateName != null){
            setModalDct(true)
        }else{
            Toast.show('Select your state first.')
        } 
    }

    const cleanText = (text) => {
        if (/^[a-zA-Z]+$/.test(text) == true || text === "") {
            setSearchText(text);
        }
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        setPincode(); setSearchText('');
        setDctName(); setDctId();
        setStateName(); setStateId();
        setStateArray([]); setDctArray([]);
        setActiveTitle('Search by pincode');
        getSatates()
    }

    const styles = StyleSheet.create({
        searchNave: { backgroundColor: colors.backgroundColor, width: '100%', height: dgl * 0.07},
        navTab: { height: dgl * 0.07, width: '50%', padding: dgl * 0.01, justifyContent: "center", alignItems: "center" },
        screenWrap: { flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginTop: dgl*0.008 },
        footerBox: { backgroundColor: colors.backgroundColor, paddingHorizontal: dgl * 0.035, paddingBottom: dgl * 0.035 },
        itemBox: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: dgl * 0.01, borderBottomColor: colors.borderColor1, borderBottomWidth: 0.5 }
    })

    return (
        <>
            <Header menu={true} title={'Change location'} goBack={goBackFn} loading={loading}/>

            <View style={{}}>
                <FlatList
                    data={searchTypes}
                    contentContainerStyle={styles.searchNave}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={renderSearchNavbar}
                    />
            </View>

            <ScrollView style={{backgroundColor:colors.backgroundColor}} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
                <View style={commonStyles.appcontainer}>
                    {activeTitle == 'Search by pincode' ? 
                        <View style={styles.screenWrap}>
                            <CustomTextInput
                                label={'Pincode'}
                                placeholder={'Pincode'}
                                onChangeText={(text)=>setPincode(text)}
                                value={pincode}
                                keyboardType={'numeric'}
                            />
                        </View>
                    :
                        <View style={styles.screenWrap}>
                            <View>
                                <TouchableBoxView
                                    label={'State'}
                                    onPressIn={()=>setModalState(true)}
                                    value={stateName}
                                />
                                <TouchableBoxView
                                    label={'District'}
                                    onPressIn={setDistricModal}
                                    value={dctName}
                                />
                            </View>
                        
                        </View>
                    }
                </View> 
            </ScrollView>
            <View style={styles.footerBox}>
                <CommonButton
                    onPress={() => handleSearch(activeTitle == 'Search by pincode' ? 'pincode' : 'district' )}
                    text={'Search'}
                />
            </View>

            {/* state modal */}
            <ModalStructure visible={modalState} hideModel={() => setModalState(false)} header={'Select state'}>
                <CustomTextInput
                    label={'Search State'}
                    placeholder={'State'}
                    onChangeText={(text) => cleanText(text)}
                />
                
                {searchText != '' ?
                    <FlatList
                        data={stateArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            var compareIndex = item.state_name.search(new RegExp(searchText, "i"));
                            if (compareIndex != -1) {
                                var firstPart = item.state_name.substring(0, compareIndex);
                                var searchPart = item.state_name.substring(compareIndex, compareIndex + searchText.length);
                                var name_length = item.state_name.length;
                                var lastPart = item.state_name.substring(compareIndex + searchText.length, name_length);
                                return (
                                    <TouchableOpacity onPress={() => changeState(item)} style={[styles.itemBox,{ backgroundColor: stateId == item.state_id ? colors.buttonColor : null }]}>
                                        <Text style={{ fontFamily: stateId == item.state_id ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: dgl * 0.015, color: stateId == item.state_id ? '#FFFFFF' : colors.buttonColor }} numberOfLines={1}>{firstPart}</Text>
                                        <Text style={{ fontFamily: stateId == item.state_id ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: dgl * 0.015, color: stateId == item.state_id ? '#FFFFFF' : colors.buttonColor }} numberOfLines={1}>{searchPart}</Text>
                                        <Text style={{ fontFamily: stateId == item.state_id ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: dgl * 0.015, color: stateId == item.state_id ? '#FFFFFF' : colors.buttonColor }} numberOfLines={1}>{lastPart}</Text>
                                    </TouchableOpacity>
                                )
                            } else {
                                return null
                            }
                        }}
                    />
                    :
                    <FlatList
                        data={stateArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return(
                                <TouchableOpacity onPress={() => changeState(item)} style={[styles.itemBox, { backgroundColor: stateId == item.state_id ? colors.buttonColor : null }]}>
                                    <Text style={{ fontFamily: stateId == item.state_id ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: dgl * 0.015, color: stateId == item.state_id ? '#FFFFFF' : colors.buttonColor }}>{item.state_name}</Text>
                                </TouchableOpacity>
                            )
                        }
                        }
                    />
                }
            </ModalStructure>

            {/* district modal */}
            <ModalStructure visible={modalDct} hideModel={() => setModalDct(false)} header={'Select district'}>
                <CustomTextInput
                    label={'Search District'}
                    placeholder={'District'}
                    onChangeText={(text) => cleanText(text)}
                />

                {searchText != '' ?
                    <FlatList
                        data={dctArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            var compareIndex = item.district_name.search(new RegExp(searchText, "i"));
                            if (compareIndex != -1) {
                                var firstPart = item.district_name.substring(0, compareIndex);
                                var searchPart = item.district_name.substring(compareIndex, compareIndex + searchText.length);
                                var name_length = item.district_name.length;
                                var lastPart = item.district_name.substring(compareIndex + searchText.length, name_length);
                                return (
                                    <TouchableOpacity onPress={() => changeDistrict(item)} style={[styles.itemBox, { backgroundColor: dctId == item.district_id ? colors.buttonColor : null }]}>
                                        <Text style={{ fontFamily: dctId == item.district_id ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: dgl * 0.015, color: dctId == item.district_id ? '#FFFFFF' : colors.buttonColor }} numberOfLines={1}>{firstPart}</Text>
                                        <Text style={{ fontFamily: dctId == item.district_id ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: dgl * 0.015, color: dctId == item.district_id ? '#FFFFFF' : colors.buttonColor }} numberOfLines={1}>{searchPart}</Text>
                                        <Text style={{ fontFamily: dctId == item.district_id ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: dgl * 0.015, color: dctId == item.district_id ? '#FFFFFF' : colors.buttonColor }} numberOfLines={1}>{lastPart}</Text>
                                    </TouchableOpacity>
                                )
                            } else {
                                return null
                            }
                        }}
                    />
                    :
                    <FlatList
                        data={dctArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => changeDistrict(item)} style={[styles.itemBox, { backgroundColor: dctId == item.district_id ? colors.buttonColor : null }]}>
                                    <Text style={{ fontFamily: dctId == item.district_id ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: dgl * 0.015, color: dctId == item.district_id ? '#FFFFFF' : colors.buttonColor }}>{item.district_name}</Text>
                                </TouchableOpacity>
                            )
                        }
                        }
                    />
                }
            </ModalStructure>
        </>
    );
}

export default React.memo(Search);
