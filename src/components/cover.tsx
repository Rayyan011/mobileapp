import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

export const Cover = (props: SvgProps) => (
  <Svg viewBox="0 0 400 300" {...props}>
    {/* Background circle decoration */}
    <Circle cx="200" cy="150" r="140" fill="#f0f4ff" opacity="0.5" />
    
    {/* Note 1 - Main note (largest, center) */}
    <G transform="translate(120, 60)">
      <Rect x="0" y="0" width="100" height="140" rx="4" fill="#ffffff" stroke="#e0e0e0" strokeWidth="2" />
      {/* Spiral binding */}
      <Circle cx="10" cy="20" r="3" fill="#4a90e2" />
      <Circle cx="10" cy="40" r="3" fill="#4a90e2" />
      <Circle cx="10" cy="60" r="3" fill="#4a90e2" />
      <Circle cx="10" cy="80" r="3" fill="#4a90e2" />
      <Circle cx="10" cy="100" r="3" fill="#4a90e2" />
      <Circle cx="10" cy="120" r="3" fill="#4a90e2" />
      {/* Lines of text */}
      <Rect x="25" y="25" width="60" height="3" rx="1" fill="#d0d0d0" />
      <Rect x="25" y="35" width="50" height="3" rx="1" fill="#d0d0d0" />
      <Rect x="25" y="45" width="65" height="3" rx="1" fill="#d0d0d0" />
      <Rect x="25" y="55" width="45" height="3" rx="1" fill="#d0d0d0" />
      <Rect x="25" y="70" width="70" height="3" rx="1" fill="#4a90e2" opacity="0.3" />
      <Rect x="25" y="80" width="55" height="3" rx="1" fill="#4a90e2" opacity="0.3" />
      <Rect x="25" y="90" width="60" height="3" rx="1" fill="#4a90e2" opacity="0.3" />
    </G>

    {/* Note 2 - Smaller, rotated note */}
    <G transform="translate(240, 80) rotate(15)">
      <Rect x="0" y="0" width="70" height="100" rx="4" fill="#ffffff" stroke="#e0e0e0" strokeWidth="2" />
      <Circle cx="8" cy="15" r="2.5" fill="#ff6b6b" />
      <Circle cx="8" cy="30" r="2.5" fill="#ff6b6b" />
      <Circle cx="8" cy="45" r="2.5" fill="#ff6b6b" />
      <Circle cx="8" cy="60" r="2.5" fill="#ff6b6b" />
      <Rect x="20" y="18" width="40" height="2.5" rx="1" fill="#d0d0d0" />
      <Rect x="20" y="28" width="35" height="2.5" rx="1" fill="#d0d0d0" />
      <Rect x="20" y="38" width="42" height="2.5" rx="1" fill="#d0d0d0" />
    </G>

    {/* Note 3 - Smallest note */}
    <G transform="translate(80, 180) rotate(-10)">
      <Rect x="0" y="0" width="50" height="70" rx="3" fill="#ffffff" stroke="#e0e0e0" strokeWidth="2" />
      <Circle cx="7" cy="12" r="2" fill="#51cf66" />
      <Circle cx="7" cy="25" r="2" fill="#51cf66" />
      <Circle cx="7" cy="38" r="2" fill="#51cf66" />
      <Rect x="18" y="15" width="25" height="2" rx="1" fill="#d0d0d0" />
      <Rect x="18" y="22" width="30" height="2" rx="1" fill="#d0d0d0" />
    </G>

    {/* Pen/Pencil */}
    <G transform="translate(280, 200) rotate(45)">
      {/* Pen body */}
    <Path
        d="M 0 0 L 50 0 L 48 8 L 2 8 Z"
        fill="#4a90e2"
    />
      {/* Pen tip */}
    <Path
        d="M 50 0 L 60 4 L 50 8 Z"
        fill="#2c5aa0"
    />
      {/* Pen clip */}
    <Path
        d="M 5 0 L 5 -8 L 15 -8 L 15 0"
        fill="#2c5aa0"
    />
    </G>

    {/* Decorative stars/sparkles */}
    <G>
    <Path
        d="M 60 50 L 62 55 L 67 55 L 63 58 L 65 63 L 60 60 L 55 63 L 57 58 L 53 55 L 58 55 Z"
        fill="#ffd43b"
        opacity="0.7"
    />
    <Path
        d="M 340 70 L 341 73 L 344 73 L 342 75 L 343 78 L 340 76 L 337 78 L 338 75 L 336 73 L 339 73 Z"
        fill="#ffd43b"
        opacity="0.7"
    />
    <Path
        d="M 50 220 L 51 223 L 54 223 L 52 225 L 53 228 L 50 226 L 47 228 L 48 225 L 46 223 L 49 223 Z"
        fill="#ffd43b"
        opacity="0.7"
    />
    </G>
  </Svg>
);
