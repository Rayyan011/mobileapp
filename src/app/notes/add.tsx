import { Stack, useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, View, Text } from '@/components/ui';
import { NoteEditor } from '@/components/note-editor';
import { useCleanupNote } from '@/api';
import { useStores } from '@/stores';

/**
 * Add/Edit Note screen with robust autosave.
 *
 * Behaviour:
 * - New note: creates a single note the first time there is content, then updates it.
 * - Existing note: loads content, then updates the same note as you type.
 * - Autosave: debounced (1.5s) on any change; also runs once on navigation away.
 */
export default observer(function AddNote() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { notes } = useStores();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // ID of the note being edited/created this session
  const [noteId, setNoteId] = useState<string | null>(id || null);

  // AI cleanup mutation
  const { mutate: cleanupNote, isPending: isCleaning } = useCleanupNote();

  // Track whether the existing note has finished loading
  const hasLoadedExistingRef = useRef(!id);

  // Track the last saved snapshot to avoid redundant writes
  const lastSavedRef = useRef({ title: '', content: '' });

  // Timer for the small "Saving..." indicator
  const savingIndicatorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ----- INITIAL LOAD FOR EXISTING NOTE -----
  useEffect(() => {
    if (!id) {
      setTitle('');
      setContent('');
      setNoteId(null);
      hasLoadedExistingRef.current = true;
      lastSavedRef.current = { title: '', content: '' };
      return;
    }

    const existing = notes.getNote(id);
    if (existing) {
      const initialTitle = existing.title || '';
      const initialContent = existing.content || '';
      setTitle(initialTitle);
      setContent(initialContent);
      setNoteId(existing.id);
      lastSavedRef.current = {
        title: initialTitle.trim(),
        content: initialContent.trim(),
      };
    } else {
      // Missing note, treat as new
      setTitle('');
      setContent('');
      setNoteId(null);
      lastSavedRef.current = { title: '', content: '' };
    }

    hasLoadedExistingRef.current = true;
  }, [id, notes]);

  // Cleanup saving indicator timer on unmount
  useEffect(() => {
    return () => {
      if (savingIndicatorTimeoutRef.current) {
        clearTimeout(savingIndicatorTimeoutRef.current);
        savingIndicatorTimeoutRef.current = null;
      }
    };
  }, []);

  // ----- SAVE LOGIC -----
  const saveNote = useCallback(() => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    // Skip saving empty notes
    if (!trimmedTitle && !trimmedContent) {
      return false;
    }

    // Skip if nothing changed since last save
    if (
      lastSavedRef.current.title === trimmedTitle &&
      lastSavedRef.current.content === trimmedContent
    ) {
      return false;
    }

    if (noteId) {
      notes.updateNote(noteId, trimmedTitle || 'Untitled', trimmedContent);
    } else {
      const newId = Date.now().toString();
      notes.addNote(trimmedTitle || 'Untitled', trimmedContent, newId);
      setNoteId(newId);
    }

    lastSavedRef.current = {
      title: trimmedTitle,
      content: trimmedContent,
    };

    return true;
  }, [title, content, noteId, notes]);

  // ----- INSTANT AUTOSAVE -----
  useEffect(() => {
    // Skip if nothing to save yet
    if (!title.trim() && !content.trim()) {
      return;
    }

    // For existing notes, wait until initial load completes
    if (!hasLoadedExistingRef.current) {
      return;
    }

    const didSave = saveNote();
    if (!didSave) {
      return;
    }

    setIsSaving(true);
    if (savingIndicatorTimeoutRef.current) {
      clearTimeout(savingIndicatorTimeoutRef.current);
    }
    savingIndicatorTimeoutRef.current = setTimeout(() => {
      setIsSaving(false);
      savingIndicatorTimeoutRef.current = null;
    }, 300);
  }, [title, content, saveNote]);

  // ----- SAVE ON NAVIGATION AWAY -----
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (savingIndicatorTimeoutRef.current) {
          clearTimeout(savingIndicatorTimeoutRef.current);
          savingIndicatorTimeoutRef.current = null;
        }
        saveNote();
      };
    }, [saveNote])
  );

  // ----- AI CLEANUP -----
  const handleCleanup = useCallback(() => {
    if (!title.trim() && !content.trim()) {
      showMessage({
        message: 'Please add some content before cleaning up',
        type: 'warning',
      });
      return;
    }

    cleanupNote(
      { title, content },
      {
        onSuccess: (data) => {
          // Trigger animation
          setShouldAnimate(true);
          // Update content with slight delay for smooth animation
          setTimeout(() => {
            setTitle(data.title);
            setContent(data.content);
            // Reset animation flag after animation completes
            setTimeout(() => {
              setShouldAnimate(false);
            }, 500);
          }, 100);
        },
        onError: (error) => {
          const errorMessage = error instanceof Error 
            ? error.message 
            : 'Failed to clean up note. Please try again.';
          showMessage({
            message: errorMessage,
            type: 'danger',
          });
          console.error('Cleanup error:', error);
        },
      }
    );
  }, [title, content, cleanupNote]);

  // ----- DELETE -----
  const handleDelete = () => {
    if (!noteId) {
      router.back();
      return;
    }

    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            notes.deleteNote(noteId);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: noteId || id ? 'Edit Note' : 'New Note',
          headerBackTitle: 'Notes',
          headerRight: () => (
            <View className="flex-row items-center gap-2">
              {isSaving && (
                <Text className="text-xs text-gray-500">Saving...</Text>
              )}
              {isCleaning && (
                <Text className="text-xs text-blue-500">Cleaning...</Text>
              )}
              <Button
                label="✨ Clean"
                variant="default"
                size="sm"
                onPress={handleCleanup}
                disabled={isCleaning || (!title.trim() && !content.trim())}
              />
              {(noteId || id) && (
                <Button
                  label="Delete"
                  variant="destructive"
                  size="sm"
                  onPress={handleDelete}
                />
              )}
            </View>
          ),
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View className="flex-1">
          <NoteEditor
            title={title}
            content={content}
            onTitleChange={setTitle}
            onContentChange={setContent}
            animateUpdate={shouldAnimate}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
});

