import { FlatList, } from 'react-native';
import { connect } from 'react-redux';
import actions from '../actions/actions';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class ItemList extends Component {
    render() {
        return (
            <View style={{
               flex: 1,
                backgroundColor: 'skyblue',
                display: 'flex',
                justifyContent: 'space-between',
                padding: 10
            }}>
                <Text>ItemList</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return Object.assign({}, {
        inventory: state.inventory
    });
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);