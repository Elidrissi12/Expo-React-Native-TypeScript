import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
const ONE_SECOND = 1000;

export default function Timer() {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, ONE_SECOND);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <View style={{ flex: 1 }}>
    <AppHeader title="Dashboard opérateur" />
    
  </View>
      <Text style={{ fontSize: 48 }}>{seconds}s</Text>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Button title={isRunning ? 'Pause' : 'Start'} onPress={toggleTimer} />
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
}
