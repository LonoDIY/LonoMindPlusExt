#include <EEPROM.h>

#include "Lono.h"

#define MOTION_LIMIT 4

uint16_t motions[MOTION_LIMIT][SERVO_COUNT+1] = {0};

void Lono::init() {
    // Initialize the PWM driver
    pwm = Adafruit_PWMServoDriver();
    pwm.begin();
    pwm.setPWMFreq(50);

    // Initialize trims
    for (int i = 0; i < SERVO_COUNT; i++) {
        servosTrim[i] = 0;
    }
    // read EEPROM
    for (int i = 0; i < SERVO_COUNT; i++) {
        int trim = EEPROM.read(i);
        if (trim > 128)
            trim -= 256;
        servosTrim[i] = trim;
    }

    // Initialize the servos
    for (int i = 0; i < SERVO_COUNT; i++) {
        if (i == 1) {
            servos[i] = ServoOsc(0, 2000, 0, 0, 0, servosTrim[i], i, false);
        } else if (i == 6) {
            servos[i] = ServoOsc(180, 2000, 0, 0, 0, servosTrim[i], i, false);
        } else {
            servos[i] = ServoOsc(90, 2000, 0, 0, 0, servosTrim[i], i, false);
        }
        servos[i].registerDriver(pwm, i);
    }

    // Initialize the buzzer
    buzzer.init(BUZZER_PIN);
    buzzer.playConnect();

    // Initialize the emoji
    emoji.begin();
    emoji.drawEyes();

    // home();
}

void Lono::home() {
    if (!rest) {
        int homes[SERVO_COUNT] = {90, 0, 90, 90, 90, 90, 180, 90, 90, 90};
        _moveServos(2000, homes);
        
        detachServos();
        rest = true;
    }
    
}

void Lono::attachServos() {
    for (int i = 0; i < SERVO_COUNT; i++) {
        servos[i].attach();
    }
    if (rest)
        rest = false;
}

void Lono::detachServos() {
    for (int i = 0; i < SERVO_COUNT; i++) {
        servos[i].detach();
    }
}

void Lono::setServoTrim(int servoIdx, int trim) {
    if (servoIdx >=0 && servoIdx < SERVO_COUNT) {
        if (trim >= -90 && trim <= 90) {
            servosTrim[servoIdx] = trim;
            servos[servoIdx].setTrim(trim);
            attachServos();
            home();
        }
    }
}

void Lono::saveTrims() {
    for (int i = 0; i < SERVO_COUNT; i++) {
        EEPROM.write(i, servosTrim[i]);
    }
}

void Lono::resetTrims() {
    for (int i = 0; i < SERVO_COUNT; i++) {
        servosTrim[i] = 0;
        servos[i].setTrim(0);
    }
    saveTrims();
}

void Lono::playEmoji(EmojiType emojiType) {
    switch (emojiType) {
        case EmojiType::SMILE:
            emoji.drawSmileFace();
            break;
        case EmojiType::SAD:
            emoji.drawSadFace();
            break;
        case EmojiType::CRY:
            emoji.drawCryFace();
            break;
        case EmojiType::SORRY:
            emoji.drawSorryFace();
            break;
        case EmojiType::ANGRY:
            emoji.drawAngryFace();
            break;
        case EmojiType::EYES:
            emoji.drawEyes();
            break;
        case EmojiType::LOOKUP:
            emoji.drawLookUpEyes();
            break;
        case EmojiType::LOOKDOWN:
            emoji.drawLookDownEyes();
            break;
        case EmojiType::LOOKLEFT:
            emoji.drawLeftLookEyes();
            break;
        case EmojiType::LOOKRIGHT:
            emoji.drawRightLookEyes();
            break;
        default:
            emoji.drawEyes();
            break;
    }
}

void Lono::playSound(SoundType sound) {
    switch (sound) {
        case SoundType::NAUGHTY:
            buzzer.playNaughty();
            break;
        case SoundType::ALARM:
            buzzer.playAlarm();
            break;
        case SoundType::CONNECT:
            buzzer.playConnect();
            break;
        case SoundType::DISCONNECT:
            buzzer.playDisconnect();
            break;
        case SoundType::CONFUSED:
            buzzer.playConfused();
            break;
        case SoundType::HAPPY:
            buzzer.playHappy();
            break;
        case SoundType::SAD:
            buzzer.playSad();
            break;
        case SoundType::CUDDLY:
            buzzer.playCuddly();
            break;
        case SoundType::SLEEPING:
            buzzer.playSleeping();
            break;
    }
}

void Lono::addMotion(int time, uint8_t R1, uint8_t R2, uint8_t R3, uint8_t R4, uint8_t R5, uint8_t L1, uint8_t L2, uint8_t L3, uint8_t L4, uint8_t L5) {
    if (motionCount >= MOTION_LIMIT) {
        return;
    }
    int motion[SERVO_COUNT+1] = {time, R1, R2, R3, R4, R5, L1, L2, L3, L4, L5};
    for (int i = 0; i < SERVO_COUNT+1; i++) {
        motions[motionCount][i] = motion[i];
    }
    motionCount++;
}

void Lono::playMotion(int start, int end) {
    if (start-1 < 0 || start-1 >= motionCount || end-1 < 0 || end-1 >= motionCount) {
        return;
    }
    for (int i = start-1; i <= end-1; i++) {
        int time = motions[i][0];
        int target[SERVO_COUNT];
        for (int j = 0; j < SERVO_COUNT; j++) {
            target[j] = motions[i][j+1];
        }
        _moveServos(time, target);
    }
}


float bezier(float t, float p0, float p1, float p2, float p3) {
  float u = 1.0 - t;
  float tt = t * t;
  float uu = u * u;
  float uuu = uu * u;
  float ttt = tt * t;

  float p = uuu * p0; // (1-t)^3 * P0
  p += 3 * uu * t * p1; // 3(1-t)^2 * t * P1
  p += 3 * u * tt * p2; // 3(1-t) * t^2 * P2
  p += ttt * p3; // t^3 * P3

  return p;
}


void Lono::_moveServos(int time, const int target[]) {
    attachServos();
    
    float controlPoints[SERVO_COUNT][4];

    for (int i = 0; i < SERVO_COUNT; i++) {
        controlPoints[i][0] = servos[i].getAngle();
        controlPoints[i][1] = controlPoints[i][0] + (target[i] - controlPoints[i][0]) / 3;
        controlPoints[i][2] = controlPoints[i][1] + (target[i] - controlPoints[i][0]) / 3;
        controlPoints[i][3] = target[i];
        // Serial.print("points:");
        // Serial.print(i);
        // Serial.print(" ");
        // Serial.print(controlPoints[i][0]);
        // Serial.print(" ");
        // Serial.print(controlPoints[i][1]);
        // Serial.print(" ");
        // Serial.print(controlPoints[i][2]);
        // Serial.print(" ");
        // Serial.print(controlPoints[i][3]);
        // Serial.println(" ");
    }

    for (int t = 0; t <= 100; t++) {
        float tFraction = t / 100.0;
        for (int i = 0; i < SERVO_COUNT; i++) {
            int angle = bezier(tFraction, controlPoints[i][0], controlPoints[i][1], controlPoints[i][2], controlPoints[i][3]); 
            // Serial.print(angle);
            // Serial.print(" ");
            // Serial.println(i);
            servos[i].positionServo(angle);
        }
        delay(time / 100);
    }

    // check if all servos are in position; if not, keep moving
    bool allInPosition = true;
    for (int i = 0; i < SERVO_COUNT; i++) {
        if (servos[i].getAngle() != target[i]) {
            allInPosition = false;
            break;
        }
    }

    if (!allInPosition) {
        for (int i = 0; i < SERVO_COUNT; i++) {
            servos[i].positionServo(target[i]);
        }
        delay(time/100);
    }

}


void Lono::_moveSingleServo(int time, int target, int servoIndex) {
    attachServos();
    
    float controlPoints[4];
    controlPoints[0] = servos[servoIndex].getAngle();
    controlPoints[1] = controlPoints[0] + (target - controlPoints[0]) / 3;
    controlPoints[2] = controlPoints[1] + (target - controlPoints[0]) / 3;
    controlPoints[3] = target;

    for (int t = 0; t <= 100; t++) {
        float tFraction = t / 100.0;
        int angle = bezier(tFraction, controlPoints[0], controlPoints[1], controlPoints[2], controlPoints[3]); 
        servos[servoIndex].positionServo(angle);
        delay(time / 100);
    }

    if (servos[servoIndex].getAngle() != target) {
        servos[servoIndex].positionServo(target);
        delay(time/100);
    }
}

void Lono::_oscillateServos(int A[SERVO_COUNT], int O[SERVO_COUNT], float P[SERVO_COUNT], int T, float cycle) {
    attachServos();

    for (int i = 0; i < SERVO_COUNT; i++) {
        if (A[i] == -1) {
            servos[i].stop();
            continue;
        }
        servos[i].setAmplitude(A[i]);
        servos[i].setOffset(O[i]);
        servos[i].setPeriod(T);
        servos[i].setPhase(P[i]);
    }

    unsigned long startTime = millis();
    unsigned long currentTime = millis();
    while (currentTime - startTime < cycle * T) {
        for (int i = 0; i < SERVO_COUNT; i++) {
            servos[i].update();
        }
        currentTime = millis();
    }

    home();
}

void Lono::walk(float steps, int T, int dir) {
    int A[SERVO_COUNT] = {/*right*/30, -1, -1, 20, 30, /*left*/ 30, -1, -1, 20, 30};
    int O[SERVO_COUNT] = {/*right*/0, 0, 0, 0, 0, /*left*/0, 0, 0, 0, 0};
    float P[SERVO_COUNT] = {/*right*/90, 0, 0, dir * 90, 0, /*left*/90, 0, 0, dir * 90, 0};

    _oscillateServos(A, O, P, T, steps);
}

void Lono::sideWalk(float steps, int T, int dir) {
    int target[] = {90, 45, 90, 90, 90, 90, 135, 90, 90, 90};
    _moveServos(1000, target);
    delay(1000);

    int A[SERVO_COUNT] = {/*right*/-1, -1, -1, -1, 30, /*left*/ -1, -1, -1, -1, 30};
    int O[SERVO_COUNT] = {/*right*/0, 0, 0, 0, 0, /*left*/0, 0, 0, 0, 0};
    float P[SERVO_COUNT] = {/*right*/0, 0, 0, dir * 90, 0, /*left*/0, 0, 0, dir * 90, 0};

    _oscillateServos(A, O, P, T, steps);
}

void Lono::sayHello() {
    float steps = 5;
    int T = 2000;
    _moveSingleServo(1000, 0, 5);
    delay(1000);
    int A[SERVO_COUNT] = {/*right*/-1, -1, -1, 20, -1, /*left*/ -1, -1, 15, 20, -1};
    int O[SERVO_COUNT] = {/*right*/0, 0, 0, 0, 0, /*left*/0, 0, 0, 0, 0};
    float P[SERVO_COUNT] = {/*right*/0, 0, 0, -90, 0, /*left*/0, 0, 0, 90, 0};

    _oscillateServos(A, O, P, T, steps);
}

void Lono::happy() {
    float steps = 5;
    int T = 2000;
    int target[] = {180, 0, 90, 90, 120, 0, 180, 90, 90, 69};
    _moveServos(1000, target);
    delay(1000);
    int A[SERVO_COUNT] = {/*right*/-1, -1, 30, -1, -1, /*left*/ -1, -1, 30, -1, -1};
    int O[SERVO_COUNT] = {/*right*/0, 0, 0, 0, 0, /*left*/0, 0, 0, 0, 0};
    float P[SERVO_COUNT] = {/*right*/0, 0, 90, 0, 0, /*left*/0, 0, -90, 0, 0};

    _oscillateServos(A, O, P, T, steps);
}

void Lono::naughty() {
    float steps = 5;
    int T = 2000;
    int A[SERVO_COUNT] = {/*right*/-1, 30, -1, -1, 20, /*left*/ -1, 30, -1, -1, 20};
    int O[SERVO_COUNT] = {/*right*/0, 0, 0, 0, 0, /*left*/0, 0, 0, 0, 0};
    float P[SERVO_COUNT] = {/*right*/0, 0, 0, 0, 0, /*left*/0, 0, 0, 0, 0};

    _oscillateServos(A, O, P, T, steps);
}

void Lono::surprise() {
    int target[] = {90, 180, 90, 90, 60, 90, 0, 90, 90, 120};
    _moveServos(1000, target);
    delay(1500);
    // home();
}

void Lono::angry() {
    int target[] = {90, 20, 150, 90, 120, 90, 160, 30, 90, 60};
    _moveServos(1000, target);
    delay(1500);
}

void Lono::sorry() {
    float steps = 5;
    int T = 2000;
    int target[] = {90, 60, 90, 90, 120, 90, 120, 90, 90, 60};
    _moveServos(1000, target);
    delay(1000);

    int A[SERVO_COUNT] = {/*right*/-1, -1, -1, 20, -1, /*left*/ -1, -1, -1, 20, -1};
    int O[SERVO_COUNT] = {/*right*/0, 0, 0, 0, 0, /*left*/0, 0, 0, 0, 0};
    float P[SERVO_COUNT] = {/*right*/0, 0, 0, 90, 0, /*left*/0, 0, 0, -90, 0};

    _oscillateServos(A, O, P, T, steps);
}

void Lono::sad() {
    int target[] = {90, 90, 90, 90, 120, 90, 90, 90, 90, 60};
    _moveServos(1000, target);
    delay(1000);

    int target1[] = {90, 0, 90, 90, 120, 90, 180, 90, 90, 60};
    _moveServos(3000, target1);
    delay(1000);
}