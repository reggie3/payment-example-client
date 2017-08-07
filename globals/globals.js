const STAGE = "V6";
const API_BASE_URL = 'https://zcalf0em5a.execute-api.us-east-1.amazonaws.com';


let globals = {
    textUnderlineColor: "limeGreen",
    itemTypes: {
        THUMBNAIL_IMAGE: 'THUMBNAIL_IMAGE',
        LOCATION_ITEM: "LOCATION_ITEM",
        MESSAGE_ITEM: 'MESSAGE_ITEM',

        // buttons representing attachments to location items
        MESSAGE_POSTIT: "MESSAGE_POSTIT",
        SOUND_POSTIT: "SOUND_POSTIT",
        PICTURE_POSTIT: "PICTURE_POSTIT",

    },
    colors: {
        buttonBackgroundColor: 'green'
    },
    menuText: {
        color: 'white',
        //fontFamily: "Times New Roman, Times, serif",
        //fontFamily: 'Maitree, serif',
        fontSize: "100%",
        fontWeight: '200',
        fontStyle: 'normal'
    },
    API_URL: API_BASE_URL + "/" + STAGE,
    appBar: {
        statusBarHeight: 24,
        height: {
            standard:55,
            mobileLandscape: 48,
            mobilePortrait: 56,
            tabletDesktop: 64
        }
    }
}

export default globals;