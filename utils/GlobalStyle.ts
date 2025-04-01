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
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderRadius: 8
    },
    invalidEmailText: {
      marginTop: -15,
      color: 'red'
    },
    tableContainer: {
        width: '100%',
        padding: Styles.mainPadding,
        borderRadius: 10,
        maxWidth: 430
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
