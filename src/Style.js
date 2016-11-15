mport {StyleSheet} from 'react-native';

var Style = StyleSheet.create({
  rootContainer: {
    flex:1
  },

  displayContainer: {
    flex:2,
    backgroundColor: 'white',
    justifyContent: 'center'
  },

  displayText: {
    color: 'black',
    fontSize: 38,
    fontWeight: 'normal',
    textAlign: 'right',
    padding: 20
  },


  inputContainer: {
    flex: 8,
    backgroundColor: 'whitesmoke'
  },

  inputButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'grey'
  },

  inputButtonText: {
    fontSize: 22,
    fontWeight: 'normal',
    color: 'black'
  },

  inputRow: {
    flex:1,
    flexDirection: 'row'
  }

});

export default Style;
