import { StyleSheet } from 'react-native';

const headerButtonsSideGap = 11

export const globalstyles = StyleSheet.create({
    flatList: {
        height: 10,
        width: '100%'
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    text: {
        justifyContent: 'center',
        display: 'flex'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerButton: {
        height: '100%',
        top: 15,
        zIndex: 4
    },
    headerRightButton: {
        right: headerButtonsSideGap
    },
    headerLefttButton: {
        left: headerButtonsSideGap
    }
});
