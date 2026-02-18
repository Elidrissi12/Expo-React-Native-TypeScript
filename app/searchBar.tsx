import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';

const data = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Orange' },
  { id: '4', name: 'Grapes' },
  { id: '5', name: 'Pineapple' },
];

function Search() {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(result);
  }, [query]);  

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

export default Search;
