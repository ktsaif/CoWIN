import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Switch, RefreshControl } from 'react-native';
import { screenDiagonal, CommonButton, Header, filterQuery } from '../components/customcomponents'
import { Middleware } from '../components/middleware'
import { colors } from '../components/stylesheetfactory'
import Toast from 'react-native-simple-toast';

const dgl = screenDiagonal()
const List = ({ ...props }) => {
    const [loading, setLoading] = useState(true);
    const [activeTitle, setActiveTitle] = useState('Today');
    const [pincode, setPincode] = useState();
    const [dctId, setDctId] = useState();
    const [dctName, setDctName] = useState();
    const [date, setDate] = useState('17-09-2021');
    const [centers, setCenters] = useState([]);
    const [ogData, setOgData] = useState([]);
    const [activeFtr, setActiveFtr] = useState();
    const [switchStatus, setSwitchStatus] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

   
    useEffect(() => {
        getSlotList();
    }, []);

    const getSlotList = async () => {
        //current date setting
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = dd + '-' + mm + '-' + yyyy;
        setDate(today)
 
        var queryParams = {}
        var url = ''
        var routeData = props.route.params
        if ( routeData.pincode ){
            var pin = routeData.pincode
            setPincode(pin)
            var queryParams = {
                pincode: pin, 
                date: today 
            }
            url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin'
        } else if ( routeData.dctId ){
            var district_id = routeData.dctId
            setDctId(district_id)
            var queryParams = {
                district_id: district_id,
                date: today
            }
            url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict'
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
        if (resultMain) {
            if (resultMain.sessions) {
                setCenters(resultMain.sessions)
                setOgData(resultMain.sessions)
            }
            setLoading(false)
        } else {
            Toast.show('Somthing went wrong, try again later!')
            setLoading(false)
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
        setCenters(ogData); setActiveFtr()
        setActiveTitle(title)
    }

    const renderSearchNavbar = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => switchScreens(item.title)} style={[styles.navTab, { borderBottomWidth: item.title == activeTitle ? dgl * 0.0022 : dgl * 0.0015, borderBottomColor: item.title == activeTitle ? '#014ED0' : colors.borderColor1 }]}>
                <Text style={styles.navTabHeader}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    const renderCenterList = ({ item, index}) => {
        return(
            <View style={styles.centerBox}>
                <Text style={styles.centerName}>{item.name} </Text>
                <Text style={styles.centerAddr}>{item.address}, {item.block_name}, {item.district_name}, {item.state_name}</Text>
                <View style={styles.countBoxWrap}>
                    {(item.slots).map((value,index)=>{
                        return(
                            <View style={styles.countBox}>
                                <View style={[styles.sessionBlock, { backgroundColor: item.available_capacity > 50 ? '#23CD75' : '#FB0000'}]}>
                                    <Text style={styles.count}>{item.available_capacity || 0}</Text>
                                </View>
                                <Text style={styles.vaciName}>{capitalSentence(item.vaccine)}</Text>
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

    const filterSlotList = (key) => {
        setActiveFtr(key)
        setLoading(true)
        switch (key) {
            case 'age18':
                var age18 = []
                age18 = ogData.filter(item => (item.min_age_limit == 18))
                setCenters(age18)
                break;
            case 'age40':
                var age40 = []
                age40 = ogData.filter(item => (item.min_age_limit == 40))
                setCenters(age40)
                break;
            case 'fee_type':
                var free = []
                free = ogData.filter(item => (item.fee_type == "Free"))
                setCenters(free)
                break;
            case 'paid_type':
                var paid = []
                paid = ogData.filter(item => (item.fee_type == "Paid"))
                setCenters(paid)
                break;
            default:
                setCenters(ogData)
        }
        setLoading(false)
    }

    const onRefresh = () => {
       setLoading(true);
       setCenters([]); setOgData([]);
       setActiveFtr(); setActiveTitle('Today');
       setSwitchStatus(false);
       getSlotList()
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
        centerWrap: { flex: 1, backgroundColor: colors.backgroundColor, paddingHorizontal: dgl * 0.035, paddingVertical: dgl * 0.02 },
        filter: { width:'100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.backgroundColor, paddingHorizontal: dgl * 0.035, paddingTop: dgl * 0.02, paddingBottom: dgl * 0.009 },
        filterWrap: { flexDirection: "row", width: '58%', justifyContent: "space-between",alignItems:"center" },
        filterButton: { justifyContent: "center", alignItems: 'center', padding: dgl * 0.008, shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10, borderRadius: dgl * 0.016 },
        filterLabel: { fontFamily: 'Poppins-Medium', textAlign: "center", fontSize: dgl * 0.013 },
        toggleWrap: { flexDirection: "row", justifyContent: "space-between", alignItems: 'center', width: '32%' },
        navTabHeader: { fontFamily: 'Poppins-Regular', fontSize: dgl * 0.015 }
    })

    const filterKey = [
        { key: 'age18', value: 18, label: '18+' },
        { key: 'age45', value: 45, label: '45+' },
        { key: 'fee_type', value: 'free', label: 'Free' },
        { key: 'paid_type', value: 'paid', label: 'Paid' },
    ]

    const toggleSwitch = () => {
        Toast.show('Dose filter disabled. 😞')
        setSwitchStatus(previousState => !previousState);
    }

    const NoDataView = () => {
        return(
            <View style={{ justifyContent: "center", alignItems: 'center', padding: dgl * 0.02}}>
                <Text style={[styles.navTabHeader,{textAlign:'center'}]}> No Vaccination Center is available for booking. </Text>
            </View>
        )
    }

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
            <View style={styles.filter}>
                <View style={styles.filterWrap}>
                    {filterKey.map((filter,index) => {
                        return (
                            <TouchableOpacity onPress={() => filterSlotList(filter.key)} style={[styles.filterButton,{ shadowColor: activeFtr == filter.key ? colors.buttonColor : colors.borderColor,backgroundColor: activeFtr == filter.key ? colors.buttonColor : colors.backgroundColor}]}>
                                <Text style={[styles.filterLabel,{ color: activeFtr == filter.key ? colors.backgroundColor : colors.headerTitle }]}>{filter.label}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={styles.toggleWrap}>
                    <Text style={styles.filterLabel}>First Dose</Text>
                    <Switch
                        style={{marginRight: -dgl*0.013}}
                        onValueChange={toggleSwitch}
                        trackColor={{ true: '#357EC7', false:'#E9E9EA' }}
                        thumbColor={switchStatus ? colors.buttonColor : colors.backgroundColor}
                        value={switchStatus}
                    />
                </View>
            </View>
            <View style={styles.centerWrap}>
                <View style={styles.screenWrap}>
                    <FlatList
                        data={centers}
                        contentContainerStyle={styles.list}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderCenterList}
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
                        ListEmptyComponent={() => { return (<NoDataView />) }}
                    />
                </View>
            </View>
            <View style={styles.footerBox}>
                <CommonButton
                    onPress={() => Toast.show('Thank you, Let’s join our hands to beat COVID forever. 🤝')}
                    text={'Notify Me'}
                />
            </View>
        </>

    );
}

export default React.memo(List);
