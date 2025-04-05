import React from 'react';
import * as FeatherIcons from 'react-feather';

// This file provides a fallback mechanism for SVG icons
// If react-feather fails to load, we'll use simple text alternatives

// Interface for icon props that includes the key properties from react-feather icons
interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Function to safely render an icon with fallback text
export const renderIcon = (iconName: string, props: IconProps = {}) => {
  try {
    // Try to get the requested icon from react-feather
    const IconComponent = (FeatherIcons as any)[iconName];
    
    if (IconComponent) {
      return <IconComponent {...props} />;
    } else {
      // If the icon doesn't exist, return a fallback
      console.warn(`Icon ${iconName} not found, using fallback`);
      return <span className={`icon-fallback ${props.className || ''}`} style={props.style}>📊</span>;
    }
  } catch (error) {
    // If there's any error rendering the icon, return a fallback
    console.error(`Error rendering icon ${iconName}:`, error);
    return <span className={`icon-fallback ${props.className || ''}`} style={props.style}>📊</span>;
  }
};

// Mapping of icon names to fallback emoji
const iconToEmoji: Record<string, string> = {
  DollarSign: '💲',
  TrendingUp: '📈',
  Target: '🎯',
  Calendar: '📆',
  Zap: '⚡',
  Award: '🏆',
  Activity: '📊',
  Download: '⬇️',
  Edit: '✏️',
  ArrowRight: '➡️',
  Check: '✅',
  AlertTriangle: '⚠️',
  Briefcase: '💼',
  CreditCard: '💳',
  Home: '🏠',
  Coffee: '☕',
  Monitor: '🖥️',
  Truck: '🚚',
  Heart: '❤️',
  Star: '⭐',
  ChevronDown: '▼',
  ChevronUp: '▲'
};

// Function to get an emoji fallback for an icon
export const getIconFallback = (iconName: string): string => {
  return iconToEmoji[iconName] || '📊';
};

// Prebuilt icon components with fallbacks
export const SafeIcon = {
  DollarSign: (props: IconProps) => renderIcon('DollarSign', props),
  TrendingUp: (props: IconProps) => renderIcon('TrendingUp', props),
  Target: (props: IconProps) => renderIcon('Target', props),
  Calendar: (props: IconProps) => renderIcon('Calendar', props),
  Zap: (props: IconProps) => renderIcon('Zap', props),
  Award: (props: IconProps) => renderIcon('Award', props),
  Activity: (props: IconProps) => renderIcon('Activity', props),
  Download: (props: IconProps) => renderIcon('Download', props),
  Edit: (props: IconProps) => renderIcon('Edit', props),
  ArrowRight: (props: IconProps) => renderIcon('ArrowRight', props),
  Check: (props: IconProps) => renderIcon('Check', props),
  AlertTriangle: (props: IconProps) => renderIcon('AlertTriangle', props),
  Briefcase: (props: IconProps) => renderIcon('Briefcase', props),
  CreditCard: (props: IconProps) => renderIcon('CreditCard', props),
  Home: (props: IconProps) => renderIcon('Home', props),
  Coffee: (props: IconProps) => renderIcon('Coffee', props),
  Monitor: (props: IconProps) => renderIcon('Monitor', props),
  Truck: (props: IconProps) => renderIcon('Truck', props),
  Heart: (props: IconProps) => renderIcon('Heart', props),
  Star: (props: IconProps) => renderIcon('Star', props),
  ChevronDown: (props: IconProps) => renderIcon('ChevronDown', props),
  ChevronUp: (props: IconProps) => renderIcon('ChevronUp', props)
}; 