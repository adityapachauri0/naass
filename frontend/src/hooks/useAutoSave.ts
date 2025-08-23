import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

interface AutoSaveOptions {
  key: string; // Unique key for identification
  debounceMs?: number; // Debounce delay in milliseconds
  onSave?: (data: any) => void; // Callback after save
  onRestore?: (data: any) => void; // Callback after restore
  endpoint?: string; // Backend endpoint for server-side saves
  enabled?: boolean; // Whether autosave is enabled
}

interface AutoSaveState {
  lastSaved: Date | null;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  error: string | null;
}

export const useAutoSave = <T extends Record<string, any>>(
  data: T,
  options: AutoSaveOptions
) => {
  const {
    key,
    debounceMs = 1000,
    onSave,
    onRestore,
    endpoint = 'http://localhost:5007/api',
    enabled = true
  } = options;

  const [state, setState] = useState<AutoSaveState>({
    lastSaved: null,
    isSaving: false,
    hasUnsavedChanges: false,
    error: null
  });

  const [autoSaveConsent, setAutoSaveConsent] = useState<boolean | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const previousData = useRef<T>(data);

  // Check for existing consent
  useEffect(() => {
    const consent = localStorage.getItem('autoSaveConsent');
    if (consent !== null) {
      setAutoSaveConsent(consent === 'true');
      if (consent === 'true') {
        restoreData();
      }
    } else {
      // Default to enabled for better UX
      setAutoSaveConsent(true);
      localStorage.setItem('autoSaveConsent', 'true');
    }
  }, []);

  // Restore data from backend
  const restoreData = useCallback(async () => {
    if (!enabled || autoSaveConsent === false) return;

    try {
      if (endpoint) {
        const response = await axios.get(`${endpoint}/drafts/contact/draft`, {
          params: { key }
        });
        
        if (response.data.success && response.data.draft) {
          if (onRestore) {
            onRestore(response.data.draft.data);
          }
          setState(prev => ({
            ...prev,
            lastSaved: new Date(response.data.draft.updatedAt)
          }));
          return response.data.draft.data;
        }
      }
    } catch (error) {
      console.error('Error restoring autosaved data:', error);
      // Don't show error for no draft found
      if (axios.isAxiosError(error) && error.response?.status !== 404) {
        setState(prev => ({ ...prev, error: 'Failed to restore saved data' }));
      }
    }
    
    return null;
  }, [key, endpoint, enabled, autoSaveConsent, onRestore]);

  // Save data to backend
  const saveData = useCallback(async (dataToSave: T) => {
    if (!enabled || autoSaveConsent !== true) return;

    setState(prev => ({ ...prev, isSaving: true, error: null }));

    try {
      if (endpoint) {
        await axios.post(`${endpoint}/drafts/contact/draft`, {
          key,
          data: dataToSave
        });
      }

      setState(prev => ({
        ...prev,
        lastSaved: new Date(),
        isSaving: false,
        hasUnsavedChanges: false
      }));

      if (onSave) {
        await onSave(dataToSave);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: 'Failed to save data'
      }));
    }
  }, [key, endpoint, enabled, autoSaveConsent, onSave]);

  // Debounced save function
  const debouncedSave = useCallback((dataToSave: T) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setState(prev => ({ ...prev, hasUnsavedChanges: true }));

    debounceTimer.current = setTimeout(() => {
      saveData(dataToSave);
    }, debounceMs);
  }, [saveData, debounceMs]);

  // Watch for data changes
  useEffect(() => {
    if (!enabled || autoSaveConsent !== true) return;

    // Check if data has actually changed
    const hasChanged = JSON.stringify(data) !== JSON.stringify(previousData.current);
    
    if (hasChanged) {
      debouncedSave(data);
      previousData.current = data;
    }
  }, [data, debouncedSave, enabled, autoSaveConsent]);

  // Clear saved data from backend
  const clearSavedData = useCallback(async () => {
    try {
      if (endpoint) {
        await axios.delete(`${endpoint}/drafts/contact/draft`, {
          params: { key }
        });
      }

      setState(prev => ({
        ...prev,
        lastSaved: null,
        hasUnsavedChanges: false
      }));
    } catch (error) {
      console.error('Error clearing saved data:', error);
      setState(prev => ({ ...prev, error: 'Failed to clear saved data' }));
    }
  }, [key, endpoint]);

  // Handle consent toggle
  const toggleConsent = useCallback((consent: boolean) => {
    setAutoSaveConsent(consent);
    localStorage.setItem('autoSaveConsent', consent.toString());
    
    if (consent) {
      restoreData();
    } else {
      clearSavedData();
    }
  }, [restoreData, clearSavedData]);

  // Manual save trigger
  const triggerSave = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    saveData(data);
  }, [data, saveData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return {
    ...state,
    autoSaveConsent,
    toggleConsent,
    clearSavedData,
    restoreData,
    triggerSave,
    isEnabled: enabled && autoSaveConsent === true
  };
};