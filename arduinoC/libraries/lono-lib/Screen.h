#ifndef __SCREEN_H__
#define __SCREEN_H__


#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

class Screen {
public:
    Screen(uint8_t width=128, uint8_t height=64, uint8_t oled_reset = -1)
      : display(width, height, &Wire, oled_reset) {}

    void begin(uint8_t i2c_addr = 0x3C) {
        if(!display.begin(SSD1306_SWITCHCAPVCC, i2c_addr)) {
            Serial.println(F("SSD1306 allocation failed"));
            for(;;);
        }
        display.clearDisplay();
        display.display();
    }

    void clear() {
        display.clearDisplay();
        display.display();
    }

    void displayText(const char* text, int x, int y, int size = 1) {
        display.setCursor(x, y);
        display.setTextSize(size);
        display.setTextColor(SSD1306_WHITE);
        display.print(text);
        display.display();
    }

    void displayBitmap(int x, int y, const uint8_t* bitmap, uint8_t w, uint8_t h) {
        display.drawBitmap(x, y, bitmap, w, h, SSD1306_WHITE);
        display.display();
    }

private:
    Adafruit_SSD1306 display;
};


#endif