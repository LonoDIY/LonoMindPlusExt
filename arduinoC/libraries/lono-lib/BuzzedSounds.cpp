#include <Arduino.h>

#include "BuzzerSounds.h"

void Buzzer::init(int pin) {
    pinMode(pin, OUTPUT);
    buzzerPin = pin;
}

void Buzzer::playNaughty() {
    bendTone(1000, 500, 1.04, 100, 10);
}

void Buzzer::playAlarm() {
    alternateTone(S_C5, S_E5, 500, 10, 5);
}

void Buzzer::playConnect() {
    _tone(S_E5, 50, 30);
    _tone(S_E6, 55, 25);
    _tone(S_A6, 60, 10);
    _tone(S_C6, 55, 25);
}

void Buzzer::playDisconnect() {
    _tone(S_C6, 60, 25);
    _tone(S_G5, 45, 10);
    _tone(S_E5, 35, 5);
    _tone(S_C5, 25, 5);
}

void Buzzer::playConfused() {
    // bendTone(E6, A6, 1.05, 25, 10);
    // bendTone(A6, E6, 1.05, 25, 10);
    bendTone(1000, 1700, 1.03, 8, 2);
    bendTone(1699, 500, 1.04, 8, 3);
    bendTone(1000, 1700, 1.05, 9, 10);
}

void Buzzer::playHappy() {
    bendTone(2000, 6000, 1.05, 8, 3);
    bendTone(5999, 2000, 1.05, 13, 2);
}

void Buzzer::playSad() {
    bendTone(S_A5, S_E5, 1.02, 20, 200);
}

void Buzzer::playCuddly() {
    bendTone(700, 900, 1.03, 16, 4);
    bendTone(899, 650, 1.01, 18, 7);
}

void Buzzer::playSleeping() {
    bendTone(100, 500, 1.04, 10, 10);
    delay(500);
    bendTone(400, 100, 1.04, 10, 1);
}

void Buzzer::_tone(float freq, int duration, int silentDuration) {
    tone(buzzerPin, freq, duration);
    delay(duration);
    delay(silentDuration);
}

void Buzzer::bendTone(float initFreq, float finalFreq, float rate, int noteDuration, int silentDuration) {
    if (silentDuration == 0)
        silentDuration = 1;
    
    if (initFreq < finalFreq) {
        for (float i = initFreq; i < finalFreq; i = i * rate) {
            _tone(i, noteDuration, silentDuration);
        }
    } else {
        for (float i = initFreq; i > finalFreq; i = i / rate) {
            _tone(i, noteDuration, silentDuration);
        }
    }
}

void Buzzer::alternateTone(float freq1, float freq2, int duration, int silentDuration, int times) {
    for (int i = 0; i < times; i++) {
        _tone(freq1, duration, silentDuration);
        _tone(freq2, duration, silentDuration);
    }
}