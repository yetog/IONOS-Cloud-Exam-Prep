import useSound from 'use-sound';
import { useLocalStorage } from './useLocalStorage';

interface SoundSettings {
  enabled: boolean;
  volume: number; // 0-1
}

const DEFAULT_SETTINGS: SoundSettings = {
  enabled: true,
  volume: 0.5,
};

export function useGameSounds() {
  const [settings, setSettings] = useLocalStorage<SoundSettings>(
    'gmat-sound-settings',
    DEFAULT_SETTINGS
  );

  // Common options for all sounds
  const baseOptions = {
    volume: settings.volume,
    soundEnabled: settings.enabled,
  };

  // Reward sounds - full volume
  const [playXpGain] = useSound('/sounds/xp-gain.mp3', baseOptions);
  const [playLevelUp] = useSound('/sounds/level-up.mp3', baseOptions);
  const [playAchievement] = useSound('/sounds/achievement.mp3', baseOptions);
  const [playStreakBonus] = useSound('/sounds/streak-bonus.mp3', baseOptions);

  // Status sounds - medium volume
  const [playCorrect] = useSound('/sounds/correct.mp3', {
    ...baseOptions,
    volume: settings.volume * 0.8,
  });
  const [playIncorrect] = useSound('/sounds/incorrect.mp3', {
    ...baseOptions,
    volume: settings.volume * 0.6,
  });

  // UI sounds - quiet
  const [playClick] = useSound('/sounds/ui-click.mp3', {
    ...baseOptions,
    volume: settings.volume * 0.3,
  });
  const [playSave] = useSound('/sounds/save.mp3', {
    ...baseOptions,
    volume: settings.volume * 0.5,
  });

  // Settings controls
  const toggleSound = () => {
    setSettings((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  const setVolume = (volume: number) => {
    setSettings((prev) => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, enabled }));
  };

  return {
    // Reward sounds
    playXpGain,
    playLevelUp,
    playAchievement,
    playStreakBonus,
    
    // Status sounds
    playCorrect,
    playIncorrect,
    
    // UI sounds
    playClick,
    playSave,
    
    // Settings
    soundEnabled: settings.enabled,
    soundVolume: settings.volume,
    toggleSound,
    setVolume,
    setSoundEnabled,
  };
}
