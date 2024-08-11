import React from 'react';
import { FlatList, View, Text, ActivityIndicator, ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';

export default function CustomFlatList(
    { 
        data,
        renderItem,
        isLoading,
        emptyMessage,
        contentContainerStyle,
        itemSeparatorHeight = 20,
        numColumns,
        columnWrapperStyle,
        style
    } : 
    {
        data: any[]| null | undefined,
        renderItem: ListRenderItem<any> | null | undefined,
        isLoading?: boolean,
        emptyMessage?: string,
        contentContainerStyle?: StyleProp<ViewStyle>,
        itemSeparatorHeight?: number,
        numColumns?: number,
        columnWrapperStyle?: StyleProp<ViewStyle>,
        style?: StyleProp<ViewStyle>
    }
){

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (data?.length === 0) {
    return <Text style={globalstyles.text}>{emptyMessage}</Text>;
  }

  return (
    <FlatList
      style={style || globalstyles.flatList}
      contentContainerStyle={contentContainerStyle || globalstyles.flatListContent}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: itemSeparatorHeight }} />}
      numColumns={numColumns}
      columnWrapperStyle={columnWrapperStyle}
    />
  );
};
