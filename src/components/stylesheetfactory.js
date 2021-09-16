import { StyleSheet, Dimensions } from 'react-native';
var { width, height } = Dimensions.get('screen');
const SCREEN_HEIGHT = height;
const IS_IPHONE_X = SCREEN_HEIGHT >= 812;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 40 : 20) : 20;

let diagonal = Math.sqrt((width * width) + (height * height))
const dgl = parseFloat(diagonal.toFixed(2))
const colors = {
    backgroundColor: '#FFFFFF',
    buttonColor: '#014ED0',
    headerTitle: '#242424',
    inputTitle: '#00000099',
    borderColor: 'rgba(0, 0, 0, 0.6)',
    borderColor1: '#E5E5E5'
}

const StyleSheetFactory = () => {
    return StyleSheet.create({
        //commonlyUsed
        appcontainer: { flex: 1, backgroundColor: colors.backgroundColor, padding: dgl*0.035 },
        commonFieldErr: { fontSize: dgl * 0.012, fontFamily: 'Poppins-Regular', color: '#fd397a', marginTop: dgl * 0.005, marginLeft: dgl * 0.005 },
        hitSlop: { top: 15, right: 15, bottom: 15, left: 15 },
        touchBox: { paddingHorizontal: dgl * 0.02, flex: 1, color: colors.headerTitle, fontSize: dgl * 0.014, fontFamily: 'Poppins-Bold' },
        
        //textInput
        container: { height: dgl*0.06, position: 'relative', marginBottom:dgl*0.02 },
        innerContainer: { flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0.8, borderColor: colors.borderColor, height: dgl * 0.06, borderRadius: dgl * 0.008, opacity: 0.3, alignItems: 'center' },
        labelStyle: { fontFamily: 'Poppins-Medium', fontSize: dgl * 0.012, color: colors.borderColor, opacity: 0.7},
        labelContainer: { position: 'absolute', backgroundColor: '#FFF', top: -10, left: 18, padding: 2, zIndex: 50 },
        textInput: { flex: 1, paddingHorizontal: dgl * 0.02,  fontFamily:'Poppins-Bold', color: colors.headerTitle },
        eyeIcon: { alignSelf: 'center', paddingRight: dgl * 0.018 },
        
        //commonButton
        commonButton: { backgroundColor: colors.buttonColor, width: '100%', height: dgl * 0.06, borderRadius: dgl * 0.008, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: dgl * 0.015 },
        commonButtonText: { color: colors.backgroundColor, fontSize: dgl * 0.015, fontFamily: 'Poppins-Medium', textAlign: 'center', marginHorizontal: 10 },

        //header
        headerContainer: { paddingVertical: dgl * 0.017, paddingHorizontal: dgl * 0.035, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.backgroundColor, marginTop: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT * 1.2 : dgl * 0.036, alignItems: 'center', borderBottomWidth: dgl * 0.002, borderBottomColor: colors.borderColor1 },
        titleConatainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
        arrowWrap: { marginRight: 10, alignItems: 'center' },
        headerTitle: { color: colors.headerTitle, fontFamily: 'Poppins-Medium', fontSize: dgl * 0.015, textAlign: "center",  },
        sunbtitleBox: { marginLeft: dgl * 0.006, alignItems: 'center' },
        subtitle: { textAlign: 'center', fontFamily: 'Poppin-ExtraLightItalic', color: colors.buttonColor, fontSize: dgl * 0.014, textDecorationLine: 'underline' },

        //loadingModal
        outterWrap: { flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: '#rgba(0, 0, 0, 0.5)', zIndex: 1000 },
        innerWrap: { backgroundColor: colors.backgroundColor, height: 100, width: 100, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-around' },

        //modalStructure
        wraper1: { flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0, 0, 0, 0.6)' },
        wraper2: { alignSelf: 'center', backgroundColor: colors.backgroundColor, width: '90%', maxHeight: '80%', borderRadius: dgl * 0.02, justifyContent: 'center', padding: dgl * 0.02 },
        wraper3: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.borderColor1, paddingVertical: dgl * 0.008, paddingHorizontal: dgl * 0.011 },
        modalHeader: { color: colors.buttonColor, fontSize: 14, fontFamily: 'Poppins-SemiBold', paddingVertical: 1 }

    })
} 
    
export { StyleSheetFactory, colors }