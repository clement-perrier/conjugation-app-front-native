import { StyleSheet } from 'react-native';

const headerButtonsSideGap = 11

export const globalstyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    flatList: {
        height: 10,
        width: '100%',
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 10
    },
    text: {
        // justifyContent: 'center',
        // display: 'flex',
        // alignItems: 'center',
        // alignContent: 'center'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20
    },
    headerButton: {
        // height: '100%',
        // top: 15,
        // zIndex: 4
    },
    headerRightButton: {
        // right: headerButtonsSideGap
    },
    headerLefttButton: {
        // left: headerButtonsSideGap
    },
    test: {
        height: 20
    }
});
