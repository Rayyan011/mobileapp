import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from '@/components/ui';
import { useTheme } from '@/hooks';
import colors from '@/components/ui/colors';
import type { Note } from '@/stores';

type Props = Note & { renderKey?: string };

export const NoteCard = ({ title, content, id, updatedAt, renderKey }: Props) => {
  const { colors: themeColors, isDark } = useTheme();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  const contentStr = typeof content === 'string' ? content : String(content || '');
  const trimmedContent = contentStr.trim();
  const displayContent = trimmedContent || 'No content';
  const contentKey = `${id}-${content.length}-${updatedAt}`;

  // Card background: white in light mode, dark in dark mode
  const cardBg = isDark ? colors.charcoal[900] : colors.white;
  const cardBorder = isDark ? colors.charcoal[700] : colors.charcoal[300];
  const dateColor = isDark ? colors.charcoal[400] : colors.charcoal[600];

  return (
    <Link href={`/notes/add?id=${id}` as any} asChild>
      <Pressable>
        <View 
          key={renderKey} 
          className="m-2 overflow-hidden rounded-xl border p-4"
          style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        >
          <Text className="py-2 text-xl font-semibold">{title || 'Untitled'}</Text>
          <Text 
            key={contentKey}
            numberOfLines={3} 
            className="mb-2 leading-snug"
          >
            {displayContent}
          </Text>
          <Text className="text-xs" style={{ color: dateColor }}>
            {formatDate(updatedAt)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};
