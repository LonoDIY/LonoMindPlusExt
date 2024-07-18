#ifndef __BUZZER_SOUNDS_H__
#define __BUZZER_SOUNDS_H__

// https://www.gotozhuan.com/cn/tools/tool_pitch_map.php
#define S_C0 16.35
#define S_C_SHARP_0 17.32
#define S_D0 18.35
#define S_D_SHARP_0 19.45
#define S_E0 20.60
#define S_F0 21.83
#define S_F_SHARP_0 23.12
#define S_G0 24.50
#define S_G_SHARP_0 25.96
#define S_A0 27.50
#define S_A_SHARP_0 29.14
#define S_B0 30.87
#define S_C1 32.70
#define S_C_SHARP_1 34.65
#define S_D1 36.71
#define S_D_SHARP_1 38.89
#define S_E1 41.20
#define S_F1 43.65
#define S_F_SHARP_1 46.25
#define S_G1 49.00
#define S_G_SHARP_1 51.91
#define S_A1 55.00
#define S_A_SHARP_1 58.27
#define S_B1 61.74
#define S_C2 65.41
#define S_C_SHARP_2 69.30
#define S_D2 73.42
#define S_D_SHARP_2 77.78
#define S_E2 82.41
#define S_F2 87.31
#define S_F_SHARP_2 92.50
#define S_G2 98.00
#define S_G_SHARP_2 103.83
#define S_A2 110.00
#define S_A_SHARP_2 116.54
#define S_B2 123.47
#define S_C3 130.81
#define S_C_SHARP_3 138.59
#define S_D3 146.83
#define S_D_SHARP_3 155.56
#define S_E3 164.81
#define S_F3 174.61
#define S_F_SHARP_3 185.00
#define S_G3 196.00
#define S_G_SHARP_3 207.65
#define S_A3 220.00
#define S_A_SHARP_3 233.08
#define S_B3 246.94
#define S_C4 261.63
#define S_C_SHARP_4 277.18
#define S_D4 293.66
#define S_D_SHARP_4 311.13
#define S_E4 329.63
#define S_F4 349.23
#define S_F_SHARP_4 369.99
#define S_G4 392.00
#define S_G_SHARP_4 415.30
#define S_A4 440.00
#define S_A_SHARP_4 466.16
#define S_B4 493.88
#define S_C5 523.25
#define S_C_SHARP_5 554.37
#define S_D5 587.33
#define S_D_SHARP_5 622.25
#define S_E5 659.25
#define S_F5 698.46
#define S_F_SHARP_5 739.99
#define S_G5 783.99
#define S_G_SHARP_5 830.61
#define S_A5 880.00
#define S_A_SHARP_5 932.33
#define S_B5 987.77
#define S_C6 1046.50
#define S_C_SHARP_6 1108.73
#define S_D6 1174.66
#define S_D_SHARP_6 1244.51
#define S_E6 1318.51
#define S_F6 1396.91
#define S_F_SHARP_6 1479.98
#define S_G6 1567.98
#define S_G_SHARP_6 1661.22
#define S_A6 1760.00
#define S_A_SHARP_6 1864.66
#define S_B6 1975.53
#define S_C7 2093.00



class Buzzer {
    public:
        void init(int pin);

        void _tone(float freq, int duration, int silentDuration);
        void bendTone(float initFreq, float finalFreq, float rate, int noteDuration, int silentDuration);
        void alternateTone(float freq1, float freq2, int duration, int silentDuration, int times);

        void playNaughty();
        void playAlarm();
        void playConnect();
        void playDisconnect();
        void playConfused();
        void playHappy();
        void playSad();
        void playCuddly();
        void playSleeping();
    private:
        int buzzerPin;
};


#endif