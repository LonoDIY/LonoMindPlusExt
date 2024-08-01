#ifndef __EMOJ_H__
#define __EMOJ_H__


#include <Arduino.h>
#include <U8g2lib.h>


#define U8G2_SDA_PIN 2
#define U8G2_SCL_PIN 3


class Emoji {
    private:
        int central_x;
        int central_y;
        int left_eye_x;
        int left_eye_y;
        int right_eye_x;
        int right_eye_y;
        int eye_radius;
        int eye_small_radius;
        int emoji_radius;
    public:
        U8G2_SSD1306_128X64_NONAME_1_HW_I2C u8g2;
        Emoji();
        void begin();
        void displayText(const char* text, int x, int y);
        void drawArc(int x, int y, int r, int start_angle, int end_angle);

        void drawSmileFace();
        void drawHappyFace();
        void drawNaughtyFace();
        void drawSurpriseFace();
        void drawAngryFace();
        void drawSorryFace();
        void drawSadFace();
        

        // eyes
        void drawEyes();
        void drawLookUpEyes();
        void drawLookDownEyes();
        void drawLeftLookEyes();
        void drawRightLookEyes();
};


#endif