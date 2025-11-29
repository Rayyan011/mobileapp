import React, { useState, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useFocusEffect } from 'expo-router';
import { useColorScheme, TextInput, FlatList } from 'react-native';
import { EmptyList, FocusAwareStatusBar, Pressable, Text, View } from '@/components/ui';
import { Plus, Search } from '@/components/ui/icons';
import { NoteCard } from '@/components/note-card';
import { useStores } from '@/stores';
import type { Note } from '@/stores';
import colors from '@/components/ui/colors';

export default observer(function Notes() {
  const { notes } = useStores();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [listData, setListData] = useState<Note[]>([]);
  const colorScheme = useColorScheme();
  const listRef = React.useRef<FlatList<Note>>(null);
  
  // Wait for store hydration before showing data
  if (!notes.isReady) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }
  
  // Use state-based data instead of direct MobX access to break cell recycling
  // Update state whenever notes change OR when screen comes into focus
  React.useEffect(() => {
    // Deep copy to ensure fresh references - this breaks any cell caching
    // CRITICAL: Convert MobX observable strings to plain strings
    // MobX observables can cause React Native Text to only render first character
    const freshNotes = notes.notes.map(n => ({
      ...n,
      content: String(n.content || ''),  // Force conversion to plain string
      title: String(n.title || ''),       // Also convert title for safety
    }));
    setListData(freshNotes);
  }, [notes.notes]);
  
  // Force complete refresh when screen comes into focus
  // This ensures FlatList cells are completely re-rendered with fresh data
  useFocusEffect(
    useCallback(() => {
      // Immediately update with fresh data when screen comes into focus
      // CRITICAL: Convert MobX observable strings to plain strings
      const freshNotes = notes.notes.map(n => ({
        ...n,
        content: String(n.content || ''),  // Force conversion to plain string
        title: String(n.title || ''),       // Also convert title for safety
      }));
      setListData(freshNotes);
      // Increment trigger to force re-render
      setRefreshTrigger(prev => prev + 1);
    }, [notes])
  );
  
  // Compute filtered notes from state data
  const filteredNotes = (() => {
    if (!searchQuery.trim()) {
      return listData;
    }
    const query = searchQuery.toLowerCase();
    return listData.filter(note =>
      note.title.toLowerCase().includes(query)
    );
  })();
  
  // Create a unique key that forces complete re-mount
  const listKey = `${refreshTrigger}-${listData.map(n => `${n.id}-${n.updatedAt}-${n.content.length}`).join(',')}`;
  
  // renderItem - create completely fresh component each time
  const renderItem = React.useCallback(({ item, index }: { item: Note; index: number }) => {
    // Use index in key to prevent cell reuse
    return <NoteCard key={`${item.id}-${item.updatedAt}-${index}-${refreshTrigger}`} {...item} />;
  }, [refreshTrigger]);

  return (
    <View className="flex-1">
      <FocusAwareStatusBar />
      <View className="flex-row items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
        <Text className="text-2xl font-bold">My Notes</Text>
      </View>
      {/* Search Bar */}
      <View className="mx-4 mt-3 mb-2">
        <View className="flex-row items-center rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
          <Search 
            color={colorScheme === 'dark' ? colors.neutral[500] : colors.neutral[400]} 
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="Search notes..."
            placeholderTextColor={colorScheme === 'dark' ? colors.neutral[500] : colors.neutral[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-base text-black dark:text-white"
            style={[
              { color: colorScheme === 'dark' ? colors.charcoal[100] : colors.charcoal[900] },
            ]}
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery('')}
              className="ml-2 rounded-full bg-neutral-300 p-1 dark:bg-neutral-600"
            >
              <Text className="px-2 text-xs text-neutral-600 dark:text-neutral-300">✕</Text>
            </Pressable>
          )}
        </View>
      </View>
      <FlatList
        key={listKey} // Force re-mount when notes change
        ref={listRef}
        data={filteredNotes}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}-${item.updatedAt}`}
        ListEmptyComponent={<EmptyList isLoading={false} />}
        extraData={listKey} // Force re-render when notes data changes
        contentContainerStyle={{ flexGrow: 1 }}
      />
      {/* Floating Action Button */}
      <Link href="/notes/add" asChild>
        <Pressable className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-black shadow-lg dark:bg-white">
          <Plus color={colorScheme === 'dark' ? '#000' : '#fff'} />
        </Pressable>
      </Link>
    </View>
  );
});

