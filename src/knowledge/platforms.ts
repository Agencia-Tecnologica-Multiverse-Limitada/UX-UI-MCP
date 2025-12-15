/**
 * Definiciones de plataformas soportadas y sus patrones específicos
 */

export type PlatformId = 
  | 'web-html'
  | 'web-react'
  | 'web-vue'
  | 'web-angular'
  | 'ios-swiftui'
  | 'ios-uikit'
  | 'android-compose'
  | 'android-xml'
  | 'flutter'
  | 'react-native'
  | 'desktop-electron'
  | 'desktop-wpf'
  | 'desktop-macos'
  | 'desktop-qt'
  | 'voice-alexa'
  | 'voice-google'
  | 'cli'
  | 'game-unity'
  | 'game-unreal'
  | 'ar-vr'
  | 'auto';

export interface Platform {
  id: PlatformId;
  name: string;
  category: 'web' | 'mobile' | 'desktop' | 'voice' | 'cli' | 'game' | 'xr';
  fileExtensions: string[];
  detectPatterns: string[];
  description: string;
}

export const PLATFORMS: Record<PlatformId, Platform> = {
  'auto': {
    id: 'auto',
    name: 'Auto-detectar',
    category: 'web',
    fileExtensions: [],
    detectPatterns: [],
    description: 'Detecta automáticamente la plataforma basándose en el código'
  },
  
  // ============================================
  // WEB
  // ============================================
  'web-html': {
    id: 'web-html',
    name: 'HTML/CSS/JS',
    category: 'web',
    fileExtensions: ['.html', '.css', '.js'],
    detectPatterns: ['<!DOCTYPE', '<html', '<div', 'document.', 'querySelector'],
    description: 'Web estándar con HTML, CSS y JavaScript vanilla'
  },
  'web-react': {
    id: 'web-react',
    name: 'React/Next.js',
    category: 'web',
    fileExtensions: ['.jsx', '.tsx'],
    detectPatterns: ['import React', 'useState', 'useEffect', 'className=', '<Component', 'export default function'],
    description: 'React, Next.js y ecosistema'
  },
  'web-vue': {
    id: 'web-vue',
    name: 'Vue.js',
    category: 'web',
    fileExtensions: ['.vue'],
    detectPatterns: ['<template>', '<script setup>', 'v-if', 'v-for', ':class', '@click', 'defineComponent'],
    description: 'Vue.js 2/3 y Nuxt'
  },
  'web-angular': {
    id: 'web-angular',
    name: 'Angular',
    category: 'web',
    fileExtensions: ['.component.ts', '.component.html'],
    detectPatterns: ['@Component', '@Injectable', 'ngOnInit', '*ngIf', '*ngFor', '[(ngModel)]'],
    description: 'Angular framework'
  },

  // ============================================
  // MOBILE - iOS
  // ============================================
  'ios-swiftui': {
    id: 'ios-swiftui',
    name: 'SwiftUI',
    category: 'mobile',
    fileExtensions: ['.swift'],
    detectPatterns: ['import SwiftUI', 'struct.*View', 'var body:', '@State', '@Binding', 'VStack', 'HStack'],
    description: 'iOS/macOS con SwiftUI'
  },
  'ios-uikit': {
    id: 'ios-uikit',
    name: 'UIKit',
    category: 'mobile',
    fileExtensions: ['.swift', '.m', '.xib', '.storyboard'],
    detectPatterns: ['import UIKit', 'UIViewController', 'UIButton', 'UILabel', 'IBOutlet', 'IBAction'],
    description: 'iOS con UIKit'
  },

  // ============================================
  // MOBILE - Android
  // ============================================
  'android-compose': {
    id: 'android-compose',
    name: 'Jetpack Compose',
    category: 'mobile',
    fileExtensions: ['.kt'],
    detectPatterns: ['@Composable', 'import androidx.compose', 'Column', 'Row', 'Box', 'Modifier', 'remember'],
    description: 'Android con Jetpack Compose'
  },
  'android-xml': {
    id: 'android-xml',
    name: 'Android XML',
    category: 'mobile',
    fileExtensions: ['.xml', '.kt', '.java'],
    detectPatterns: ['android:', 'app:', 'LinearLayout', 'ConstraintLayout', 'findViewById', 'R.id.'],
    description: 'Android con XML layouts'
  },

  // ============================================
  // CROSS-PLATFORM MOBILE
  // ============================================
  'flutter': {
    id: 'flutter',
    name: 'Flutter',
    category: 'mobile',
    fileExtensions: ['.dart'],
    detectPatterns: ['import \'package:flutter', 'Widget', 'StatelessWidget', 'StatefulWidget', 'BuildContext', 'Scaffold'],
    description: 'Flutter (Dart)'
  },
  'react-native': {
    id: 'react-native',
    name: 'React Native',
    category: 'mobile',
    fileExtensions: ['.jsx', '.tsx', '.js'],
    detectPatterns: ['react-native', 'StyleSheet.create', '<View', '<Text', '<TouchableOpacity', 'Pressable'],
    description: 'React Native'
  },

  // ============================================
  // DESKTOP
  // ============================================
  'desktop-electron': {
    id: 'desktop-electron',
    name: 'Electron',
    category: 'desktop',
    fileExtensions: ['.js', '.ts', '.html'],
    detectPatterns: ['electron', 'BrowserWindow', 'ipcMain', 'ipcRenderer', 'remote.'],
    description: 'Electron apps'
  },
  'desktop-wpf': {
    id: 'desktop-wpf',
    name: 'WPF (.NET)',
    category: 'desktop',
    fileExtensions: ['.xaml', '.cs'],
    detectPatterns: ['<Window', '<UserControl', 'xmlns="http://schemas.microsoft.com', 'Binding', 'INotifyPropertyChanged'],
    description: 'Windows Presentation Foundation'
  },
  'desktop-macos': {
    id: 'desktop-macos',
    name: 'macOS (AppKit)',
    category: 'desktop',
    fileExtensions: ['.swift', '.m'],
    detectPatterns: ['import AppKit', 'NSViewController', 'NSWindow', 'NSButton', 'NSTextField'],
    description: 'macOS nativo con AppKit'
  },
  'desktop-qt': {
    id: 'desktop-qt',
    name: 'Qt (C++/QML)',
    category: 'desktop',
    fileExtensions: ['.qml', '.cpp', '.h'],
    detectPatterns: ['import QtQuick', 'QWidget', 'QPushButton', 'QMainWindow', 'Q_OBJECT'],
    description: 'Qt Framework'
  },

  // ============================================
  // VOICE UI
  // ============================================
  'voice-alexa': {
    id: 'voice-alexa',
    name: 'Alexa Skills',
    category: 'voice',
    fileExtensions: ['.js', '.ts', '.json'],
    detectPatterns: ['ask-sdk', 'Alexa.', 'IntentHandler', 'LaunchRequestHandler', 'handlerInput'],
    description: 'Amazon Alexa Skills'
  },
  'voice-google': {
    id: 'voice-google',
    name: 'Google Assistant',
    category: 'voice',
    fileExtensions: ['.js', '.ts', '.json'],
    detectPatterns: ['dialogflow', 'actions-on-google', 'conv.ask', 'conv.close'],
    description: 'Google Assistant Actions'
  },

  // ============================================
  // CLI
  // ============================================
  'cli': {
    id: 'cli',
    name: 'CLI/Terminal',
    category: 'cli',
    fileExtensions: ['.js', '.ts', '.py', '.sh', '.go', '.rs'],
    detectPatterns: ['commander', 'yargs', 'inquirer', 'chalk', 'argparse', 'click', 'cobra'],
    description: 'Interfaces de línea de comandos'
  },

  // ============================================
  // GAMES
  // ============================================
  'game-unity': {
    id: 'game-unity',
    name: 'Unity',
    category: 'game',
    fileExtensions: ['.cs'],
    detectPatterns: ['using UnityEngine', 'MonoBehaviour', 'GameObject', 'Transform', 'public class.*:.*MonoBehaviour'],
    description: 'Unity Game Engine (C#)'
  },
  'game-unreal': {
    id: 'game-unreal',
    name: 'Unreal Engine',
    category: 'game',
    fileExtensions: ['.cpp', '.h'],
    detectPatterns: ['#include "Engine', 'UCLASS', 'UPROPERTY', 'AActor', 'UObject', 'GENERATED_BODY'],
    description: 'Unreal Engine (C++)'
  },

  // ============================================
  // AR/VR
  // ============================================
  'ar-vr': {
    id: 'ar-vr',
    name: 'AR/VR (XR)',
    category: 'xr',
    fileExtensions: ['.cs', '.swift', '.kt'],
    detectPatterns: ['ARKit', 'ARCore', 'XR', 'VR', 'OpenXR', 'OVR', 'RealityKit', 'visionOS'],
    description: 'Realidad Aumentada/Virtual'
  }
};

/**
 * Patrones de código específicos por plataforma para cada ley
 */
export interface PlatformPatterns {
  good: string[];
  bad: string[];
  guidelines: string[];
}

export type LawPlatformPatterns = Record<PlatformId, PlatformPatterns>;

// Función para detectar la plataforma automáticamente
export function detectPlatform(code: string, fileExtension?: string): PlatformId {
  let bestMatch: PlatformId = 'web-html';
  let highestScore = 0;

  for (const [platformId, platform] of Object.entries(PLATFORMS)) {
    if (platformId === 'auto') continue;
    
    let score = 0;
    
    // Verificar extensión de archivo
    if (fileExtension && platform.fileExtensions.includes(fileExtension)) {
      score += 5;
    }
    
    // Verificar patrones en el código
    for (const pattern of platform.detectPatterns) {
      const regex = new RegExp(pattern, 'i');
      if (regex.test(code)) {
        score += 3;
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = platformId as PlatformId;
    }
  }
  
  return bestMatch;
}

export function getPlatformsByCategory(category: string): Platform[] {
  return Object.values(PLATFORMS).filter(p => p.category === category && p.id !== 'auto');
}

export function getAllPlatforms(): Platform[] {
  return Object.values(PLATFORMS).filter(p => p.id !== 'auto');
}
