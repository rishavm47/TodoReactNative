import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAsync, getTodosAsync, updateTodoAsync } from '../redux/todoSlice';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

const TodoList = ({ handleEditClickMain }) => {
    const todos = useSelector((state) => state.todos);
    //console.log(todos.length);
    // const todos = [{
    //     "title": "fjdf"
    // },
    // {
    //     "title": "jfkdf"
    // }]
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch])

    const handleDeleteClick = (id) => {
        // console.log("hetrefffd");
        dispatch(deleteTodoAsync({ id }));
    };
    const handleToggleComp = (item) => {
        dispatch(updateTodoAsync({
            id: item.id,
            title: item.title,
            completed: !item.completed
        }))
    }

    return (
        // <ul className='list-group'>
        //     {todos.map((todo) => (
        //         <TodoItem id={todo.id} title={todo.title} completed={todo.completed} handleEditClickMain={handleEditClickMain}/>
        // <li key={id}>
        //     {title}
        //     <button onClick={() => handleEditClickMain({ title, id })}>Edit</button>
        //     <button onClick={handleDeleteClick}>X</button>
        // </li>
        //     ))}
        // </ul>

        <View>
            <FlatList style={{ height: 550 }}
                data={todos.slice().reverse()}
                renderItem={({ item }) =>
                    <View style={styles.container}>
                        <Text style={{ textDecorationLine: item.completed ? 'line-through' : '', fontSize: 20, width: 170 }}>{item.title}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', width: 150, justifyContent: 'space-between' }}>
                            <Button style={styles.button} title='toggle' onPress={() => handleToggleComp(item)}></Button>
                            <Button color={'grey'} style={styles.button} title='Edit' onPress={() => handleEditClickMain(item)}></Button>
                            <Button color={'red'} style={styles.button} title='X' onPress={() => handleDeleteClick(item.id)}></Button>
                        </View>
                    </View>
                }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32,
        paddingHorizontal: 24,
        // display: 'flex',
        justifyContent: 'space-between'
    },
    list: {
        flex: 1,
        flexGrow: 1
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
export default TodoList;