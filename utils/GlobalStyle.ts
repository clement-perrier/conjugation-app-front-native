import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import { StyleSheet } from 'react-native';

const headerButtonsSideGap = 11

export const globalstyles = StyleSheet.create({
    backgroundColor: {
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    flatList: {
        // height: 10,
        width: '100%',
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'center',
        // paddingVertical: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 20,
        textAlign: 'center',
        color: Colors.textPrimary,
        textTransform: 'uppercase'
      },
    text: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        color: Colors.textSecondary
    },
    uppercase: {
        textTransform: 'uppercase',
    },
    lowercase: {
        textTransform: 'lowercase',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        columnGap: 15
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 15
    },
    flexCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexEnd: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    flexStart: {
        display: 'flex',
        // alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    input: {
        height: 50,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderRadius: 8,
        width: '100%',
        maxWidth: Styles.maxWidth
    },
    invalidEmailText: {
      marginTop: -10,
      color: Colors.error
    },
    invalidInput: {
        borderColor: Colors.error
    },
    tableContainer: {
        // width: '100%',
        padding: 30,
        borderRadius: 10,
        justifyContent: 'center'
        // maxWidth: 500,
        // paddingVertical: 20,
        // paddingHorizontal: 50,
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
