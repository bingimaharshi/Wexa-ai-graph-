import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300',
    accent: 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-1 font-medium rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.span>
  );
};

interface SafetyBadgeProps {
  level: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  score?: number;
  className?: string;
}

export const SafetyBadge: React.FC<SafetyBadgeProps> = ({ level, score, className = '' }) => {
  const configs = {
    very_low: { label: 'Very Safe', color: 'success', icon: '🟢' },
    low: { label: 'Safe', color: 'success', icon: '🟢' },
    moderate: { label: 'Moderate', color: 'warning', icon: '🟡' },
    high: { label: 'Caution', color: 'danger', icon: '🟠' },
    very_high: { label: 'High Risk', color: 'danger', icon: '🔴' },
  };

  const config = configs[level];

  return (
    <Badge
      variant={config.color as any}
      className={className}
      icon={<span>{config.icon}</span>}
    >
      {config.label}
      {score && ` (${score}/10)`}
    </Badge>
  );
};