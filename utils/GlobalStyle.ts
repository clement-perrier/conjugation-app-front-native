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
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
      },
    text: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center'
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
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    invalidEmailText: {
      marginTop: -15,
      color: 'red'
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
