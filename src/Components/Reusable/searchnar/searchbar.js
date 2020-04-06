import * as React from 'react';
import { Searchbar } from 'react-native-paper';

export default class SerachItem extends React.Component {
    state = {
        firstQuery: '',
       
    };
  
    render() {
        console.log('in serach bar');
        const { firstQuery } = this.state;
        return (
            <Searchbar
                placeholder="Search"
                onChangeText={query => { this.setState({ firstQuery: query }); }}
                value={firstQuery}
            />
        );
    }
}