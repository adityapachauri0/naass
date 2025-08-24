import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Check, AlertCircle, Loader2 } from 'lucide-react';

interface AutoSaveIndicatorProps {
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
  error: string | null;
  isEnabled: boolean;
}

const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  isSaving,
  lastSaved,
  hasUnsavedChanges,
  error,
  isEnabled
}) => {
  if (!isEnabled) return null;

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 10) return 'just now';
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="fixed top-20 right-4 z-50"
      >
        <div className="glass rounded-lg px-4 py-2 flex items-center gap-2 text-sm">
          {isSaving && (
            <>
              <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
              <span className="text-orange-500/80">Saving...</span>
            </>
          )}
          
          {!isSaving && lastSaved && !error && (
            <>
              <Check className="w-4 h-4 text-gray-500" />
              <span className="text-orange-500/80">Saved {getTimeAgo(lastSaved)}</span>
            </>
          )}
          
          {!isSaving && hasUnsavedChanges && !error && (
            <>
              <Save className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500/80">Unsaved changes</span>
            </>
          )}
          
          {error && (
            <>
              <AlertCircle className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500">{error}</span>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AutoSaveIndicator;