import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  size = 'md',
}) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
          <Dialog.Portal forceMount>
            {/* Backdrop Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-surface-950/40 dark:bg-surface-950/80 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>

            {/* Modal Body Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ type: 'spring', duration: 0.35 }}
                  className={`w-full bg-bg-secondary border border-border-color rounded-2xl shadow-xl overflow-hidden ${sizes[size]} ${className}`}
                >
                  <div className="flex items-center justify-between p-6 border-b border-border-color/50">
                    {title && (
                      <Dialog.Title className="text-lg font-bold text-text-primary">
                        {title}
                      </Dialog.Title>
                    )}
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-text-tertiary hover:text-text-primary p-1.5 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {children}
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
}

export default Modal;
