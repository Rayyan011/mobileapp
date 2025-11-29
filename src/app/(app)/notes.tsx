import React, { useState, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useFocusEffect } from 'expo-router';
import { TextInput, FlatList, StyleSheet } from 'react-native';
import { EmptyList, FocusAwareStatusBar, Pressable, Text, View } from '@/components/ui';
import { Plus, Search } from '@/components/ui/icons';
import { NoteCard } from '@/components/note-card';
import { useStores } from '@/stores';
import { useTheme } from '@/hooks';
import type { Note } from '@/stores';
import colors from '@/components/ui/colors';

export default observer(function Notes() {
  const { notes } = useStores();
  const { colors: themeColors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [listData, setListData] = useState<Note[]>([]);
  const listRef = React.useRef<FlatList<Note>>(null);
  
  if (!notes.isReady) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }
  
  React.useEffect(() => {
    const freshNotes = notes.notes.map(n => ({
      ...n,
      content: String(n.content || ''),
      title: String(n.title || ''),
    }));
    setListData(freshNotes);
  }, [notes.notes]);
  
  useFocusEffect(
    useCallback(() => {
      const freshNotes = notes.notes.map(n => ({
        ...n,
        content: String(n.content || ''),
        title: String(n.title || ''),
      }));
      setListData(freshNotes);
      setRefreshTrigger(prev => prev + 1);
    }, [notes])
  );
  
  const filteredNotes = (() => {
    if (!searchQuery.trim()) {
      return listData;
    }
    const query = searchQuery.toLowerCase();
    return listData.filter(note =>
      note.title.toLowerCase().includes(query)
    );
  })();
  
  const listKey = `${refreshTrigger}-${listData.map(n => `${n.id}-${n.updatedAt}-${n.content.length}`).join(',')}`;
  
  const renderItem = React.useCallback(({ item, index }: { item: Note; index: number }) => {
    return <NoteCard key={`${item.id}-${item.updatedAt}-${index}-${refreshTrigger}`} {...item} />;
  }, [refreshTrigger]);

  // Theme colors
  const headerBorder = isDark ? colors.charcoal[700] : colors.charcoal[200];
  const searchBg = isDark ? colors.charcoal[800] : colors.neutral[100];
  const searchBorder = isDark ? colors.charcoal[700] : colors.charcoal[300];
  const searchIconColor = isDark ? colors.charcoal[400] : colors.charcoal[500];
  const placeholderColor = isDark ? colors.charcoal[500] : colors.charcoal[400];
  const clearButtonBg = isDark ? colors.charcoal[600] : colors.charcoal[300];

  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.background }}>
      <FocusAwareStatusBar />
      <View 
        className="flex-row items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: headerBorder }}
      >
        <Text className="text-2xl font-bold">My Notes</Text>
      </View>
      
      {/* Search Bar */}
      <View className="mx-4 mt-3 mb-2">
        <View 
          className="flex-row items-center rounded-xl border px-4 py-3"
          style={{ backgroundColor: searchBg, borderColor: searchBorder }}
        >
          <Search color={searchIconColor} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search notes..."
            placeholderTextColor={placeholderColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-base"
            style={{ color: themeColors.text }}
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery('')}
              className="ml-2 rounded-full p-1"
              style={{ backgroundColor: clearButtonBg }}
            >
              <Text className="px-2 text-xs">✕</Text>
            </Pressable>
          )}
        </View>
      </View>
      
      <FlatList
        key={listKey}
        ref={listRef}
        data={filteredNotes}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}-${item.updatedAt}`}
        ListEmptyComponent={<EmptyList isLoading={false} />}
        extraData={listKey}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      
      {/* Floating Action Button */}
      <Link href="/notes/add" asChild>
        <Pressable 
          className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full shadow-lg"
          style={{ backgroundColor: isDark ? colors.white : colors.black }}
        >
          <Plus color={isDark ? colors.black : colors.white} />
        </Pressable>
      </Link>
    </View>
  );
});
