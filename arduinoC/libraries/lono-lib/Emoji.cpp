#include "Emoji.h"

Emoji::Emoji() : u8g2(U8G2_R0, /*U8G2_SCL_PIN, U8G2_SDA_PIN,*/ U8X8_PIN_NONE) {
    central_x = 64;
    central_y = 32;
    emoji_radius = 31;

    left_eye_x = 32;
    left_eye_y = 32;
    right_eye_x = 96;
    right_eye_y = 32;
    eye_radius = 20;
    eye_small_radius = 10;
}

void Emoji::begin() {
    u8g2.begin();
}

void Emoji::displayText(const char* text, int x, int y) {
    u8g2.firstPage();
    do {
        u8g2.setCursor(x, y);
        u8g2.setFont(u8g2_font_ncenB10_tr);
        u8g2.print(text);
    } while (u8g2.nextPage());
}

void Emoji::drawArc(int x, int y, int r, int start_angle, int end_angle) {
    float step = 0.1;
    for (float angle = start_angle; angle <= end_angle; angle += step) {
        float rad = angle * 3.14 / 180;
        int x1 = x + r * cos(rad);
        int y1 = y + r * sin(rad);
        rad = (angle + step) * 3.14 / 180;
        int x2 = x + r * cos(rad);
        int y2 = y + r * sin(rad);
        u8g2.drawLine(x1, y1, x2, y2);
    }
}

void Emoji::drawSmileFace() {
    u8g2.firstPage();
    do {
        u8g2.drawCircle(central_x, central_y, emoji_radius, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x - emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x + emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        drawArc(central_x, central_y, 20, 45, 135);
    } while (u8g2.nextPage());
}


void Emoji::drawHappyFace() {
    u8g2.firstPage();
    do {
        u8g2.drawCircle(central_x, central_y, emoji_radius, U8G2_DRAW_ALL);
        // u8g2.drawCircle(central_x - emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        // u8g2.drawCircle(central_x + emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        drawArc(central_x - emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 6, 180, 360);
        drawArc(central_x + emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 6, 180, 360);
        u8g2.drawLine(central_x - 10, central_y + 7, central_x + 10, central_y + 7);
        drawArc(central_x, central_y + 7, 10, 0, 180);
    } while (u8g2.nextPage());
}

void Emoji::drawNaughtyFace() {
    u8g2.firstPage();
    do {
        u8g2.drawCircle(central_x, central_y, emoji_radius, U8G2_DRAW_ALL);
        
        u8g2.drawCircle(central_x - emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x + emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        
        drawArc(central_x, central_y + emoji_radius / 4, emoji_radius / 4, 200, 340); // 上弧
        drawArc(central_x, central_y + emoji_radius / 4, emoji_radius / 4, 20, 160);  // 下弧

        u8g2.drawCircle(central_x - emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 12, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x + emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 12, U8G2_DRAW_ALL);
    } while (u8g2.nextPage());
}

void Emoji::drawSurpriseFace() {
    u8g2.firstPage();
    do {
        u8g2.drawCircle(central_x, central_y, emoji_radius, U8G2_DRAW_ALL);
        
        u8g2.drawCircle(central_x - emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 4, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x + emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 4, U8G2_DRAW_ALL);
        
        u8g2.drawCircle(central_x - emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 8, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x + emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 8, U8G2_DRAW_ALL);
        
        u8g2.drawCircle(central_x, central_y + emoji_radius / 3, emoji_radius / 8, U8G2_DRAW_ALL);
    } while (u8g2.nextPage());
}

void Emoji::drawAngryFace() {
    u8g2.firstPage();
    do {
        u8g2.drawCircle(central_x, central_y, emoji_radius, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x - emoji_radius / 3 - 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x + emoji_radius / 3 - 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        drawArc(central_x - emoji_radius / 3 - 10, central_y - emoji_radius / 3 - 22, 15, 45, 90);
        drawArc(central_x + emoji_radius / 3 + 4, central_y - emoji_radius / 3 - 22, 15, 90, 135);
        drawArc(central_x, central_y + 25, 20, 245, 315);
    } while (u8g2.nextPage());
}

void Emoji::drawSorryFace() {
    u8g2.firstPage();
    do {
        u8g2.drawCircle(central_x, central_y, emoji_radius, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x - emoji_radius / 3 + 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x + emoji_radius / 3 - 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        drawArc(central_x - emoji_radius / 3 - 7, central_y - emoji_radius / 3 - 22, 15, 45, 90);
        drawArc(central_x + emoji_radius / 3 + 7, central_y - emoji_radius / 3 - 22, 15, 90, 135);
        u8g2.drawHLine(central_x - 5, central_y + 15, 10);
    } while (u8g2.nextPage());
}

void Emoji::drawSadFace() {
    u8g2.firstPage();
    do {
        u8g2.drawCircle(central_x, central_y, emoji_radius, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x - emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        u8g2.drawCircle(central_x + emoji_radius / 3, central_y - emoji_radius / 3, emoji_radius / 6, U8G2_DRAW_ALL);
        drawArc(central_x, central_y + 30, 20, 225, 315);
    } while (u8g2.nextPage());
}

void Emoji::drawEyes() {
    // u8g2.clearBuffer();
    u8g2.firstPage();
    do {
        u8g2.drawCircle(left_eye_x, left_eye_y, eye_radius, U8G2_DRAW_ALL);
        u8g2.drawDisc(left_eye_x, left_eye_y, eye_small_radius, U8G2_DRAW_ALL);
        u8g2.drawCircle(right_eye_x, right_eye_y, eye_radius, U8G2_DRAW_ALL);
        u8g2.drawDisc(right_eye_x, right_eye_y, eye_small_radius, U8G2_DRAW_ALL);
    } while (u8g2.nextPage());
}

void Emoji::drawLookUpEyes() {
    u8g2.firstPage();
    do {
        u8g2.drawCircle(left_eye_x, left_eye_y, eye_radius, U8G2_DRAW_ALL);
        u8g2.drawDisc(left_eye_x, left_eye_y - 5, eye_small_radius, U8G2_DRAW_ALL);
        u8g2.drawCircle(right_eye_x, right_eye_y, eye_radius, U8G2_DRAW_ALL);
        u8g2.drawDisc(right_eye_x, right_eye_y - 5, eye_small_radius, U8G2_DRAW_ALL);
    } while (u8g2.nextPage());
}

void Emoji::drawLookDownEyes() {
    u8g2.firstPage();
    do {
        u8g2.drawCircle(left_eye_x, left_eye_y, eye_radius, U8G2_DRAW_ALL);
        u8g2.drawDisc(left_eye_x, left_eye_y + 5, eye_small_radius, U8G2_DRAW_ALL);
        u8g2.drawCircle(right_eye_x, right_eye_y, eye_radius, U8G2_DRAW_ALL);
        u8g2.drawDisc(right_eye_x, right_eye_y + 5, eye_small_radius, U8G2_DRAW_ALL);
    } while (u8g2.nextPage());
}

void Emoji::drawLeftLookEyes() {
    u8g2.firstPage();
    do {
        u8g2.drawCircle(left_eye_x, left_eye_y, eye_radius, U8G2_DRAW_ALL);
        u8g2.drawDisc(left_eye_x - 5, left_eye_y, eye_small_radius, U8G2_DRAW_ALL);
        u8g2.drawCircle(right_eye_x, right_eye_y, eye_radius, U8G2_DRAW_ALL);
        u8g2.drawDisc(right_eye_x - 5, right_eye_y, eye_small_radius, U8G2_DRAW_ALL);
    } while (u8g2.nextPage());
}

void Emoji::drawRightLookEyes() {
    u8g2.firstPage();
    do {
        u8g2.drawCircle(left_eye_x, left_eye_y, eye_radius, U8G2_DRAW_ALL);
        u8g2.drawDisc(left_eye_x + 5, left_eye_y, eye_small_radius, U8G2_DRAW_ALL);
        u8g2.drawCircle(right_eye_x, right_eye_y, eye_radius, U8G2_DRAW_ALL);
        u8g2.drawDisc(right_eye_x + 5, right_eye_y, eye_small_radius, U8G2_DRAW_ALL);
    } while (u8g2.nextPage());
}