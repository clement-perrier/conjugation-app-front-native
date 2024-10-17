import Colors from '@/constants/Colors';
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
        height: 10,
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
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        columnGap: 10
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20
    },
    flexEnd: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
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
