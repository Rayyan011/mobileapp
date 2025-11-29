import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from '@/components/ui';
import type { Note } from '@/stores';

type Props = Note & { renderKey?: string };

// No memoization - always re-render to ensure fresh data
export const NoteCard = ({ title, content, id, updatedAt, renderKey }: Props) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  // Check if content is empty or only whitespace, and trim for display
  // Ensure content is a string and handle edge cases
  const contentStr = typeof content === 'string' ? content : String(content || '');
  const trimmedContent = contentStr.trim();
  const displayContent = trimmedContent || 'No content';

  // Create a unique key for the content text based on content hash
  const contentKey = `${id}-${content.length}-${updatedAt}`;

  return (
    <Link href={`/notes/add?id=${id}` as any} asChild>
      <Pressable>
        <View key={renderKey} className="m-2 overflow-hidden rounded-xl border border-neutral-300 bg-white p-4 dark:bg-neutral-900">
          <Text className="py-2 text-xl font-semibold">{title || 'Untitled'}</Text>
          <Text 
            key={contentKey}
            numberOfLines={3} 
            className="mb-2 leading-snug text-gray-600 dark:text-gray-400"
          >
            {displayContent}
          </Text>
          <Text className="text-xs text-gray-400 dark:text-gray-500">
            {formatDate(updatedAt)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

