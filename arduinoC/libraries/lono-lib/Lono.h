/**
                                 __         ______   __    __   ______  
                                /  |       /      \ /  \  /  | /      \ 
                                $$ |      /$$$$$$  |$$  \ $$ |/$$$$$$  |
                                $$ |      $$ |  $$ |$$$  \$$ |$$ |  $$ |
                                $$ |      $$ |  $$ |$$$$  $$ |$$ |  $$ |
                                $$ |      $$ |  $$ |$$ $$ $$ |$$ |  $$ |
                                $$ |_____ $$ \__$$ |$$ |$$$$ |$$ \__$$ |
                                $$       |$$    $$/ $$ | $$$ |$$    $$/ 
                                $$$$$$$$/  $$$$$$/  $$/   $$/  $$$$$$/  
                                        
                                                      ████████                                                             
                                                      ████████                                                             
                                                      ██    ██                                                             
                                                      ████████                                                             
                                             ██████████████████████████                                                    
                                R1          ███████████████████████████       L1                                            
                                            ███████████████████████████                                                    
                                R2          █████ ███████████████ █████       L2                                            
                                            █████ ███████████████ █████                                                   
                                R3          █████ ███████████████ █████       L3                                            
                                            █████ ███████████████ █████                                                   
                                R4          █████ ██████    █████ ████        L4                                            
                                              ██  ██████    █████  ██                                                     
                                                  ██████    █████                                                          
                                                  ██████    █████                                                          
                                R5                ██████    ██████            L5                                            
                                             ███████████    ████████████                                                    
                                            ████████████    ███████████                                                    
                                                                                                                           

JOINT /  SERVO INDEX /  DESC
R1      /  0          /  Right Shoulder
R2      /  1          /  Right Elbow
R3      /  2          /  Right Wrist
R4      /  3          /  Right Hip
R5      /  4          /  Right Foot
L1      /  5          /  Left Shoulder
L2      /  6          /  Left Elbow
L3      /  7          /  Left Wrist
L4      /  8          /  Left Hip
L5      /  9          /  Left Foot

*/


#ifndef __LONO_H__
#define __LONO_H__


#include <Arduino.h>
#include <Adafruit_PWMServoDriver.h>

#include "BuzzerSounds.h"
#include "Emoji.h"
#include "ServoOsc.h"


#define FORWARD 1
#define BACKWARD -1
#define LEFT 1
#define RIGHT -1

#define SERVO_COUNT 10
#define BUZZER_PIN 4


enum class EmojiType {
    SMILE,
    HAPPY,
    NAUGHTY,
    SURPRISE,
    ANGRY,
    SORRY,
    SAD,

    EYES,
    LOOKUP,
    LOOKDOWN,
    LOOKLEFT,
    LOOKRIGHT
};


enum class SoundType {
    SMILE,
    HAPPY,
    NAUGHTY,
    SURPRISE,
    ANGRY,
    SORRY,
    SAD,

    ALARM,
    CONNECT,
    DISCONNECT,
    CONFUSED,
    CUDDLY,
    SLEEPING
};

enum class JointType {
    RIGHTSHOULDER = 0,
    RIGHTELBOW,
    RIGHTWRIST,
    RIGHTHIP,
    RIGHTFOOT,

    LEFTSHOULDER,
    LEFTELBOW,
    LEFTWRIST,
    LEFTHIP,
    LEFTFOOT
};


class Lono {
    private:
        Adafruit_PWMServoDriver pwm;
        ServoOsc servos[SERVO_COUNT];
        int servosTrim[SERVO_COUNT];

        bool rest = false;

        // uint8_t motionCount = 0;


        void _moveServos(int time, const int target[]);
        void _moveSingleServo(int time, int target, int servoIndex);
        void _oscillateServos(int A[SERVO_COUNT], int O[SERVO_COUNT], float P[SERVO_COUNT], int T, float cycle);

    public:
        Emoji emoji;
        Buzzer buzzer;
        
        void init();

        void attachServos();
        void detachServos();


        void setServoTrim(int servoIdx, int trim);
        void saveTrims();
        void resetTrims();
        uint8_t getTrim(int servoIdx) {
            return servosTrim[servoIdx];
        }
        void bluetoothControl(String cmd, const int &idx);


        // void testServos() {
        //     attachServos();
        //     servos[6].positionServo(0);
        //     delay(2000);
        //     servos[6].positionServo(90);
        //     delay(2000);
        //     servos[6].positionServo(180);
        //     delay(2000);
        // }
        
        void displayText(const char* text, int x, int y) {
            emoji.displayText(text, x, y);
        }
        void playEmoji(EmojiType emojiType);
        void playSound(SoundType sound);
        void drawLine();
        void drawCircle();
        

        void moveJoint(JointType joint, int angle, int T) {
            _moveSingleServo(T, angle, int(joint));
        }
        void moveJointByIdx(int idx, int angle) {
            _moveSingleServo(500, angle, idx);
        }

        // void addMotion(int time, uint8_t R1, uint8_t R2, uint8_t R3, uint8_t R4, uint8_t R5, uint8_t L1, uint8_t L2, uint8_t L3, uint8_t L4, uint8_t L5);
        // void playMotion(int start, int end);
        // void cleanMotion() {
        //     motionCount = 0;
        // }
        void previewFrame(int time, uint8_t R1, uint8_t R2, uint8_t R3, uint8_t R4, uint8_t R5, uint8_t L1, uint8_t L2, uint8_t L3, uint8_t L4, uint8_t L5);

        void home();

        void walk(float steps, int T, int dir = FORWARD);
        void sideWalk(float steps, int T, int dir = LEFT);

        void sayHello();
        void happy();
        void naughty();
        void surprise();
        void angry();
        void sorry();
        void sad();

        // void congratulate(float steps, int T);
        // void dance(float steps, int T);
        // void shakeLeg(float steps, int T, int dir = LEFT);
        // void updown(float steps, int T, int h = 20);
        // void swing(float steps, int T, int h = 20);
        // void moonwalk(float steps, int T, int h = 20, int dir = LEFT);
};


#endif