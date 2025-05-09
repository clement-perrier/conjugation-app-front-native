import React, { useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, ListRenderItem, StyleProp, ViewStyle, Dimensions } from 'react-native';
import { globalstyles } from '@/utils/GlobalStyle';
import { Verb } from '@/types/Verb';
import Spinner from './Spinner';
import Styles from '@/constants/Styles';

export default function CustomFlatList(
    { 
        data,
        renderItem,
        isLoading,
        emptyMessage,
        contentContainerStyle,
        itemSeparatorHeight = Styles.itemSeparatorHeight,
        numColumns,
        columnWrapperStyle,
        style,
        keyExtractor
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
        keyExtractor?: ((item: Verb, index: number) => string) | undefined
    }
){

  const [bounces, setBounces] = useState(true); // Initially, enable bounce
  
  // Get screen height
  const screenHeight = Dimensions.get('window').height;

  // Track content size and set bounce conditionally
  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    // If content height exceeds screen height, enable bouncing; otherwise, disable
    setBounces(contentHeight + 240 > screenHeight);
  };

  if (isLoading) {
    return <Spinner text={'Loading data'}/>

  }

  if (data?.length === 0) {
    return (
      <View style={globalstyles.container}>
        <Text style={[globalstyles.text]}>{emptyMessage}</Text>
      </View>
    )
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
      removeClippedSubviews={true}
      keyExtractor={keyExtractor}
      windowSize={10} 
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={onContentSizeChange}
      bounces={bounces}
    />
  );
};
