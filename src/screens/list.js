import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { screenDiagonal, CustomTextInput, CommonButton, Header, TouchableBoxView, ModalStructure, filterQuery } from '../components/customcomponents'
import { Middleware } from '../components/middleware'
import { StyleSheetFactory, colors } from '../components/stylesheetfactory'
import Toast from 'react-native-simple-toast';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const dgl = screenDiagonal()
const commonStyles = StyleSheetFactory()

const List = ({ ...props }) => {
    const [loading, setLoading] = useState(true);
    const [activeTitle, setActiveTitle] = useState('Today');
    const [pincode, setPincode] = useState();
    const [dctId, setDctId] = useState();
    const [dctName, setDctName] = useState();
    const [date, setDate] = useState('14-09-2021');
    const [centers, setCenters] = useState([]);
   
    // const [modalState, setModalState] = useState(false);
    // const [modalDct, setModalDct] = useState(false);

    useEffect(() => {
        getSlotList();
    }, []);

    const getSlotList = async () => {
        var queryParams = {}
        var url = ''
        var routeData = props.route.params
        if ( routeData.pincode ){
            var pin = routeData.pincode
            setPincode(pin)
            var queryParams = {
                pincode: '679322',
                date: '17-09-2021'
            }
            url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin'
        } else if ( routeData.dctId ){
            var district_id = routeData.dctId
            setDctId(district_id)
            var queryParams = {
                district_id: '302',
                date: '17-09-2021'
            }
            url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict'
        } else {
            Toast.show('Somthing went wrong, try again later!')
            setLoading(false)
            return;
        }

        if ( routeData.dctName ){
            setDctName(routeData.dctName)
        }

        var value = {
            url: url,
            method: 'GET',
            queryParams: filterQuery(queryParams)
        }

        var resultMain = await Middleware(value) || [];
        console.warn('resultMain', resultMain);
        if (resultMain) {
            if (resultMain.centers || resultMain.sessions) {
                setCenters(resultMain.centers || resultMain.sessions)
            }
            setLoading(false)
        } else {
            if (err) {
                setLoading(false)
                Toast.show('Somthing went wrong, try again later!')
            } else {
                setLoading(false)
                Toast.show('Somthing went wrong, try again later!')
            }
        }
    }


    const goBackFn = () => {
        props.navigation.goBack()
    }

    const searchTypes = [
        { key: 1, title: 'Today', value: 'today' },
        { key: 2, title: 'This Week', value: 'thisweek' },
    ]

    const switchScreens = (title) => {
        setActiveTitle(title)
    }

    const renderSearchNavbar = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => switchScreens(item.title)} style={[styles.navTab, { borderBottomWidth: item.title == activeTitle ? dgl * 0.0022 : dgl * 0.0015, borderBottomColor: item.title == activeTitle ? '#014ED0' : colors.borderColor1 }]}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: dgl * 0.015 }}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    const renderCenterList = ({ item, index}) => {
        return(
            <View style={styles.centerBox}>
                <Text style={styles.centerName}>{item.name} </Text>
                <Text style={styles.centerAddr}>{item.address}, {item.block_name}, {item.district_name}, {item.state_name}</Text>
                <View style={styles.countBoxWrap}>
                    {(item.sessions || item.slots).map((value,index)=>{
                        return(
                            <View style={styles.countBox}>
                                <View style={[styles.sessionBlock, { backgroundColor: value.available_capacity || item.available_capacity > 50 ? '#23CD75' : '#FB0000'}]}>
                                    <Text style={styles.count}>{value.available_capacity || item.available_capacity || 0}</Text>
                                </View>
                                <Text style={styles.vaciName}>{capitalSentence(value.vaccine || item.vaccine)}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

    function capitalSentence(word) {
        let words = String(word).toLowerCase();
        let w = words.charAt(0).toUpperCase() + words.substring(1);
        return w;
    }

    const styles = StyleSheet.create({
        searchNave: { backgroundColor: colors.backgroundColor, width: '100%', height: dgl * 0.07 },
        list: { backgroundColor: colors.backgroundColor, width: '100%' },
        navTab: { height: dgl * 0.07, width: '50%', padding: dgl * 0.01, justifyContent: "center", alignItems: "center" },
        screenWrap: { flex: 1, flexDirection: 'column', justifyContent: 'space-between' },
        footerBox: { backgroundColor: colors.backgroundColor, paddingHorizontal: dgl * 0.035, paddingBottom: dgl * 0.035},
        centerBox: { padding: dgl * 0.015, backgroundColor: colors.backgroundColor, marginVertical: 10, elevation: 2,borderWidth:dgl*0.0008, borderColor:colors.borderColor1 },
        centerName: { color: '#242424', fontFamily: 'Poppins-Bold', fontSize: dgl * 0.015, paddingBottom: dgl*0.0035 },
        centerAddr: { color: '#242424', fontFamily: 'Poppins-Regular', fontSize: dgl * 0.012 },
        sessionBlock: { justifyContent: 'center', alignItems: 'center', padding: dgl * 0.01,  borderRadius: dgl * 0.01},
        count: { color: colors.backgroundColor, fontSize: dgl * 0.012, fontFamily: 'Poppins-Medium', alignSelf: 'center' },
        countBoxWrap: { flexDirection: 'row', paddingVertical: dgl * 0.008, alignItems: 'center', flexWrap: 'wrap' },
        countBox: { justifyContent: 'center', alignItems: 'center', paddingRight: dgl * 0.02 },
        vaciName: { fontSize: dgl * 0.009, fontFamily: 'Poppins-Regular', paddingVertical: dgl * 0.003 },
    })

    return (
        <>
            <Header menu={true} title={dctName ? dctName : pincode} goBack={goBackFn} loading={loading} subtitle={'edit'}/>

            <View>
                <FlatList
                    data={searchTypes}
                    contentContainerStyle={styles.searchNave}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={renderSearchNavbar}
                />
            </View>

            <View style={commonStyles.appcontainer}>
                <View style={styles.screenWrap}>
                    <FlatList
                        data={centers}
                        contentContainerStyle={styles.list}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderCenterList}
                    />
                </View>
            </View>
            <View style={styles.footerBox}>
                <CommonButton
                    onPress={() => Toast.show('Successfully Registerd.')}
                    text={'Notify Me'}
                />
            </View>
            

        </>

    );
}

export default React.memo(List);
