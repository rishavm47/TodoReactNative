/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Node } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import { Provider, useDispatch } from 'react-redux';
import TodoList from './components/TodoList';
import store from './redux/store';
import { addTodoAsync, updateTodoAsync } from './redux/todoSlice';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [field, setField] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});


  const dispatch = useDispatch();



  // function handleEditInputChange(e) {
  //   setCurrentTodo({ ...currentTodo, title: e.target.value });
  //   // console.log(currentTodo);
  // }

  // function handleInputChange(e) {
  //   setField(e.target.value);
  // }

  function handleEditClickMain(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }


  function handleFormSubmit(e) {
    e.preventDefault();
    // console.log("hi");

    if (field) {
      dispatch(
        addTodoAsync({
          title: field,
          completed: false,
        })
      );

    }
    setField("");
    // console.log(field);

  }
  function handleUpdateTodo(id, updatedTodo) {
    // const updatedItem = todos.map((todo) => {
    //     if (todo.id === id) {
    //         axios.patch(`http://localhost:8080/todos/${id}`, {
    //             title: updatedTodo.title
    //         })
    //         return updatedTodo
    //     }
    //     else
    //         return todo;
    // });
    dispatch(updateTodoAsync(updatedTodo));
    setIsEditing(false);
    // setTodos(updatedItem);
  }
  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    // <SafeAreaView style={backgroundStyle}>
    // <ScrollView
    //   contentInsetAdjustmentBehavior="automatic"
    //   style={backgroundStyle}>
    // <Provider store={store}>
    <View style="App">
      <View className="App-header">
        {
          isEditing ? (
            <View>
              <View style={styles.container}>
                <Text style={styles.heading}>Edit todo</Text>
              </View>
              <View style={{ padding: 10 }}>
                <TextInput
                  style={{ marginBottom: 10, marginTop: 100, height: 50, fontSize: 20, borderColor: 'gray', borderWidth: 1 }}
                  placeholder="Updated Text"
                  value={currentTodo.title}
                  onChangeText={(editValue) => {
                    setCurrentTodo({ ...currentTodo, title: editValue });
                  }}
                />
                <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button title='Update' onPress={handleEditFormSubmit}></Button>
                  <Button color={'red'} title='Cancel' onPress={() => setIsEditing(false)}></Button>
                </View>

              </View>

            </View>
          ) : (
            <View>
              <View style={styles.container}>
                <Text style={styles.heading}>todos</Text>
              </View>
              <View style={{ padding: 10 }}>
                <TextInput
                  style={{ height: 50, fontSize: 20, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                  placeholder="Enter the task"
                  onChangeText={(newText) => {
                    setField(newText)
                  }}
                  value={field}
                />
                <View style={{ marginBottom: 20 }}>
                  <Button title='Add' onPress={handleFormSubmit}></Button>
                </View>
                <TodoList handleEditClickMain={handleEditClickMain} />
              </View>


            </View>
          )
        }

      </View>
    </View>
    // </Provider>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
