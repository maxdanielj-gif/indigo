import React from 'react';
import { X, Download, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  mediaType?: 'image' | 'video';
  prompt?: string;
  onCopyPrompt?: (prompt: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, prompt, onCopyPrompt }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image with close button overlaid */}
          <div className="relative w-full flex flex-col items-center">
            <img
              src={imageUrl}
              alt="Full view"
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            {/* Close button — overlaid on top-right corner of the image */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 w-9 h-9 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a
              href={imageUrl}
              download="image.png"
              className="flex items-center px-5 py-2.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 rounded-full font-bold hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all shadow-lg text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </a>
            
            {prompt && onCopyPrompt && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopyPrompt(prompt);
                }}
                className="flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg text-sm"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Prompt
              </button>
            )}
          </div>

          {prompt && (
            <div className="mt-4 p-3 bg-indigo-100/50 dark:bg-indigo-900/50 backdrop-blur-md rounded-xl border border-indigo-200 dark:border-indigo-800 max-w-2xl w-full">
              <h4 className="text-xs font-bold text-indigo-900/60 dark:text-indigo-100/60 uppercase tracking-wider mb-1">Prompt</h4>
              <p className="text-sm text-indigo-900 dark:text-indigo-100 leading-relaxed italic">
                "{prompt}"
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
