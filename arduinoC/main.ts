
// enum SIZE {
//     //% block="29*29"
//     1,
//     //% block="58*58"
//     2
// }

/**\
 * SMILE,
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
 */
enum EMOJITYPE {
    //% block="smile"
    SMILE,
    //% block="happy"
    HAPPY,
    //% block="naughty"
    NAUGHTY,
    //% block="surprise"
    SURPRISE,
    //% block="angry"
    ANGRY,
    //% block="sorry"
    SORRY,
    //% block="sad"
    SAD,

    //% block="normal eyes"
    EYES,
    //% block="look up"
    LOOKUP,
    //% block="look down"
    LOOKDOWN,
    //% block="look left"
    LOOKLEFT,
    //% block="look right"
    LOOKRIGHT,
}

/**
 * 
 * SMILE,
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
 */
enum SOUND {
    //% block="smile"
    SMILE,
    //% block="happy"
    HAPPY,
    //% block="naughty"
    NAUGHTY,
    //% block="surprise"
    SURPRISE,
    //% block="angry"
    ANGRY,
    //% block="sorry"
    SORRY,
    //% block="sad"
    SAD,

    //% block="alarm"
    ALARM,
    //% block="connect"
    CONNECT,
    //% block="disconnect"
    DISCONNECT,
    //% block="confused"
    CONFUSED,
    //% block="cuddly"
    CUDDLY,
    //% block="sleeping"
    SLEEPING
}

enum JOINT {
    //% block="right shoulder"
    RIGHTSHOULDER,
    //% block="right elbow"
    RIGHTELBOW,
    //% block="right wrist"
    RIGHTWR,
    //% block="right hip"
    RIGHTHIP,
    //% block="right foot"
    RIGHTFOOT,
    //% block="left shoulder"
    LEFTSHOULDER,
    //% block="left elbow"
    LEFTELBOW,
    //% block="left wrist"
    LEFTWRIST,
    //% block="left hip"
    LEFTHIP,
    //% block="left foot"
    LEFTFOOT
}

enum BeatType {
    //% block="half"
    HALF,
    //% block="quarter"
    QUARTER,
    //% block="eighth"
    EIGHTH,
    //% block="whole"
    WHOLE,
    //% block="double"
    DOUBLE,
    //% block="zero"
    ZERO,
}

let BeatMap = {
    HALF: 500,
    QUARTER: 250,
    EIGHTH: 125,
    WHOLE: 1000,
    DOUBLE: 2000,
    ZERO: 0,
};



let SOUNDMAP = {
    SMILE: "SoundType::SMILE",
    HAPPY: "SoundType::HAPPY",
    NAUGHTY: "SoundType::NAUGHTY",
    SURPRISE: "SoundType::SURPRISE",
    ANGRY: "SoundType::ANGRY",
    SORRY: "SoundType::SORRY",
    SAD: "SoundType::SAD",
    ALARM: "SoundType::ALARM",
    CONNECT: "SoundType::CONNECT",
    DISCONNECT: "SoundType::DISCONNECT",
    CONFUSED: "SoundType::CONFUSED",
    CUDDLY: "SoundType::CUDDLY",
    SLEEPING: "SoundType::SLEEPING"
};

let EMOJIMAP = {
    SMILE: "EmojiType::SMILE",
    HAPPY: "EmojiType::HAPPY",
    NAUGHTY: "EmojiType::NAUGHTY",
    SURPRISE: "EmojiType::SURPRISE",
    ANGRY: "EmojiType::ANGRY",
    SORRY: "EmojiType::SORRY",
    SAD: "EmojiType::SAD",
    EYES: "EmojiType::EYES",
    LOOKUP: "EmojiType::LOOKUP",
    LOOKDOWN: "EmojiType::LOOKDOWN",
    LOOKLEFT: "EmojiType::LOOKLEFT",
    LOOKRIGHT: "EmojiType::LOOKRIGHT",
};

let JOINTMAP = {
    RIGHTSHOULDER: "JointType::RIGHTSHOULDER",
    RIGHTELBOW: "JointType::RIGHTELBOW",
    RIGHTWR: "JointType::RIGHTWR",
    RIGHTHIP: "JointType::RIGHTHIP",
    RIGHTFOOT: "JointType::RIGHTFOOT",
    LEFTSHOULDER: "JointType::LEFTSHOULDER",
    LEFTELBOW: "JointType::LEFTELBOW",
    LEFTWRIST: "JointType::LEFTWRIST",
    LEFTHIP: "JointType::LEFTHIP",
    LEFTFOOT: "JointType::LEFTFOOT"
};

let ActionMap = {
    0: "lono.home()",
    1: "lono.walk(5, 1000, FORWARD)",
    2: "lono.walk(5, 1000, BACKWARD)",
    3: "lono.sideWalk(5, 1000, LEFT)",
    4: "lono.sideWalk(5, 1000, RIGHT)",
    5: "lono.sayHello()",
    6: "lono.happy()",
    7: "lono.sad()",
    8: "lono.angry()",
    9: "lono.surprise()",
    10: "lono.naughty()",
    11: "lono.sorry()",
};


//% color="#AA278D" iconWidth=50 iconHeight=40
namespace LonoRobot {
    //% block="Welcome to Lono programing" blockType="hat"
    export function welcomeToLono(parameter: any, block: any) {
        // do nothing
    }


    //% block="Start Lono" blockType="command"
    export function startRobot(parameter: any, block: any) {
        // init lono Object
        Generator.addInclude('LonoRobot', '#include <Lono.h>', true);
        Generator.addObject('lono', 'Lono', 'lono', true);
        Generator.addSetup('lono.init', 'lono.init();', true);
    }

    //% block="Reset to start state" blockType="command"
    export function homeRobot(parameter: any, block: any) {
        Generator.addCode(`lono.home();`);
    }


    //% block="Move Joint [JOINT] to [ANGLE] degree in [DURATION] ms" blockType="command"
    //% JOINT.shadow="dropdown" JOINT.options="JOINT" JOINT.defl="JOINT.RIGHTSHOULDER"
    //% ANGLE.shadow="angle" ANGLE.params.edge=1
    //% DURATION.shadow="number" DURATION.defl=1000
    export function moveJoint(parameter: any, block: any) {
        // move joint
        let joint = JOINTMAP[parameter.JOINT.code];
        let angle = parameter.ANGLE.code;
        let duration = parameter.DURATION.code;
        Generator.addCode(`lono.moveJoint(${joint}, ${angle}, ${duration});`);
    }

    //% block="Move Joint [JOINT] to [ANGLE] degree" blockType="command"
    //% JOINT.shadow="number"  JOINT.defl=0
    //% ANGLE.shadow="angle" ANGLE.params.edge=1
    export function moveJointByIdx(parameter: any, block: any) {
        // move joint
        let joint = parameter.JOINT.code;
        let angle = parameter.ANGLE.code;
        Generator.addCode(`lono.moveJointByIdx(${joint}, ${angle});`);
    }

    //% block="Get trim of servo [JOINT]" blockType="reporter"
    //% JOINT.shadow="dropdown" JOINT.options="JOINT" JOINT.defl="JOINT.RIGHTSHOULDER"
    export function getTrim(parameter: any, block: any) {
        let joint = JOINTMAP[parameter.JOINT.code];
        Generator.addCode(`lono.getTrim(${joint})`);
    }

    //% block="Set trim of servo [JOINT] to [TRIM]" blockType="command"
    //% JOINT.shadow="dropdown" JOINT.options="JOINT" JOINT.defl="JOINT.RIGHTSHOULDER"
    //% TRIM.shadow="range" TRIM.params.min=-90 TRIM.params.max=90 TRIM.defl=0
    export function setTrim(parameter: any, block: any) {
        let joint = JOINTMAP[parameter.JOINT.code];
        let trim = parameter.TRIM.code;
        Generator.addCode(`lono.setServoTrim(${joint}, ${trim});`);
    }

    //% block="Set trim of servo (IDX) [JOINTIDX] to [TRIM]" blockType="command"
    //% JOINTIDX.shadow="number" JOINTIDX.defl=0
    //% TRIM.shadow="range" TRIM.params.min=-90 TRIM.params.max=90 TRIM.defl=0
    export function setTrimByJointIdx(parameter: any, block: any) {
        let joint = parameter.JOINTIDX.code;
        let trim = parameter.TRIM.code;
        Generator.addCode(`lono.setServoTrim(${joint}, ${trim});`);
    }


    //% block="Save trims" blockType="command"
    export function saveTrims(parameter: any, block: any) {
        Generator.addCode(`lono.saveTrims();`);
    }

    //% block="Reset trims" blockType="command"
    export function resetTrims(parameter: any, block: any) {
        Generator.addCode(`lono.resetTrims();`);
    }


    //% block="ACTION Move Forward [STEP] steps in [DURATION] ms" blockType="command"
    //% STEP.shadow="number" STEP.defl=1
    //% DURATION.shadow="number" DURATION.defl=1000
    export function moveForward(parameter: any, block: any) {
        // move forward
        let step = parameter.STEP.code;
        let duration = parameter.DURATION.code;
        Generator.addCode(`lono.walk(${step}, ${duration});`);
    }

    //% block="ACTION Move Backward [STEP] steps in [DURATION] ms" blockType="command"
    //% STEP.shadow="number" STEP.defl=1
    //% DURATION.shadow="number" DURATION.defl=1000
    export function moveBackward(parameter: any, block: any) {
        // move backward
        let step = parameter.STEP.code;
        let duration = parameter.DURATION.code;
        Generator.addCode(`lono.walk(${step}, ${duration}, -1);`);
    }

    //% block="ACTION Move Left [STEP] steps in [DURATION] ms" blockType="command"
    //% STEP.shadow="number" STEP.defl=1
    //% DURATION.shadow="number" DURATION.defl=1000
    export function moveLeft(parameter: any, block: any) {
        // move left
        let step = parameter.STEP.code;
        let duration = parameter.DURATION.code;
        Generator.addCode(`lono.sideWalk(${step}, ${duration});`);
    }

    //% block="ACTION Move Right [STEP] steps in [DURATION] ms" blockType="command"
    //% STEP.shadow="number" STEP.defl=1
    //% DURATION.shadow="number" DURATION.defl=1000
    export function moveRight(parameter: any, block: any) {
        // move right
        let step = parameter.STEP.code;
        let duration = parameter.DURATION.code;
        Generator.addCode(`lono.sideWalk(${step}, ${duration}, -1);`);
    }

    //% block="Preview Frame; time [TIME]ms, R-shoulder[R1], R-elbow[R2], R-wrist[R3], R-hip[R4], R-foot[R5], L-shoulder[L1], L-elbow[L2], L-wrist[L3], L-hip[L4], L-foot[L5]," blockType="command"
    //% TIME.shadow="number" TIME.defl=1000
    //% R1.shadow="number" R1.defl=90
    //% R2.shadow="number" R2.defl=0
    //% R3.shadow="number" R3.defl=90
    //% R4.shadow="number" R4.defl=90
    //% R5.shadow="number" R5.defl=90
    //% L1.shadow="number" L1.defl=90
    //% L2.shadow="number" L2.defl=180
    //% L3.shadow="number" L3.defl=90
    //% L4.shadow="number" L4.defl=90
    //% L5.shadow="number" L5.defl=90
    export function previewSingleFrame(parameter: any, block: any) {
        let time = parameter.TIME.code;
        let r1 = parameter.R1.code;
        let r2 = parameter.R2.code;
        let r3 = parameter.R3.code;
        let r4 = parameter.R4.code;
        let r5 = parameter.R5.code;
        let l1 = parameter.L1.code;
        let l2 = parameter.L2.code;
        let l3 = parameter.L3.code;
        let l4 = parameter.L4.code;
        let l5 = parameter.L5.code;
        Generator.addCode(`lono.previewFrame(${time}, ${r1}, ${r2}, ${r3}, ${r4}, ${r5}, ${l1}, ${l2}, ${l3}, ${l4}, ${l5});`);
    }



    //% block="Add custom motion(MAX 4); time [TIME]ms, R-shoulder[R1], R-elbow[R2], R-wrist[R3], R-hip[R4], R-foot[R5], L-shoulder[L1], L-elbow[L2], L-wrist[L3], L-hip[L4], L-foot[L5]," blockType="command"
    //% TIME.shadow="number" TIME.defl=1000
    //% R1.shadow="number" R1.defl=90
    //% R2.shadow="number" R2.defl=0
    //% R3.shadow="number" R3.defl=90
    //% R4.shadow="number" R4.defl=90
    //% R5.shadow="number" R5.defl=90
    //% L1.shadow="number" L1.defl=90
    //% L2.shadow="number" L2.defl=180
    //% L3.shadow="number" L3.defl=90
    //% L4.shadow="number" L4.defl=90
    //% L5.shadow="number" L5.defl=90
    export function addCustomMotion(parameter: any, block: any) {
        let time = parameter.TIME.code;
        let r1 = parameter.R1.code;
        let r2 = parameter.R2.code;
        let r3 = parameter.R3.code;
        let r4 = parameter.R4.code;
        let r5 = parameter.R5.code;
        let l1 = parameter.L1.code;
        let l2 = parameter.L2.code;
        let l3 = parameter.L3.code;
        let l4 = parameter.L4.code;
        let l5 = parameter.L5.code;
        Generator.addCode(`lono.addMotion(${time}, ${r1}, ${r2}, ${r3}, ${r4}, ${r5}, ${l1}, ${l2}, ${l3}, ${l4}, ${l5});`);
    }

    //% block="Play custom motion from [START] to [END]" blockType="command"
    //% START.shadow="number" START.defl=0
    //% END.shadow="number" END.defl=0
    export function playCustomMotion(parameter: any, block: any) {
        let start = parameter.START.code;
        let end = parameter.END.code;
        Generator.addCode(`lono.playMotion(${start}, ${end});`);
    }

    //% block="Clean motion list" blockType="command"
    export function cleanMotionList(parameter: any, block: any) {
        Generator.addCode(`lono.cleanMotion();`);
    }

    //% block="ACTION Say Hello" blockType="command"
    export function sayHello(parameter: any, block: any) {
        // say hello
        Generator.addCode(`lono.sayHello();`);
    }

    //% block="ACTION Happy" blockType="command"
    export function happy(parameter: any, block: any) {
        // happy
        Generator.addCode(`lono.happy();`);
    }

    //% block="ACTION Sad" blockType="command"
    export function sad(parameter: any, block: any) {
        // sad
        Generator.addCode(`lono.sad();`);
    }

    //% block="ACTION Angry" blockType="command"
    export function angry(parameter: any, block: any) {
        // angry
        Generator.addCode(`lono.angry();`);
    }

    //% block="ACTION Surprised" blockType="command"
    export function surprise(parameter: any, block: any) {
        // surprised
        Generator.addCode(`lono.surprise();`);
    }

    //% block="ACTION Naughty" blockType="command"
    export function naughty(parameter: any, block: any) {
        // naughty
        Generator.addCode(`lono.naughty();`);
    }

    //% block="ACTION Sorry" blockType="command"
    export function sorry(parameter: any, block: any) {
        // sorry
        Generator.addCode(`lono.sorry();`);
    }

    //% block="Play Emoji [EMOJI]" blockType="command"
    //% EMOJI.shadow="dropdown" EMOJI.options="EMOJITYPE" EMOJI.defl="EMOJITYPE.EYES"
    export function playEmoji(parameter: any, block: any) {
        let emoji = EMOJIMAP[parameter.EMOJI.code];
        Generator.addCode(`lono.playEmoji(${emoji});`);
    }

    //% block="Display Text [TEXT], Start Point x=[X],y=[Y]" blockType="command"
    //% TEXT.shadow="string" TEXT.defl=Hello
    //% X.shadow="range" X.params.min=0 X.params.max=128 X.defl=0
    //% Y.shadow="range" Y.params.min=0 Y.params.max=64 Y.defl=0
    export function displayText(parameter: any, block: any) {
        let text = parameter.TEXT.code;
        let x = parameter.X.code;
        let y = parameter.Y.code;
        Generator.addCode(`lono.displayText(${text}, ${x}, ${y});`);
    }

    //% block="Start Drawing" blockType="command"
    export function startDrawing(parameter: any, block: any) {
        Generator.addCode(`lono.emoji.u8g2.firstPage();`);
        Generator.addCode(`do {`);
    }

    //% block="Stop Drawing" blockType="command"
    export function stopDrawing(parameter: any, block: any) {
        Generator.addCode(`} while (lono.emoji.u8g2.nextPage());`);
    }


    //% block="Draw circle, Center of circle x=[X], y=[Y], radius=[R]" blockType="command"
    //% X.shadow="range" X.params.min=0 X.params.max=128 X.defl=64
    //% Y.shadow="range" Y.params.min=0 Y.params.max=64 Y.defl=32
    //% R.shadow="number" R.defl=10
    export function drawCircle(parameter: any, block: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        let r = parameter.R.code;
        Generator.addCode(`lono.emoji.u8g2.drawCircle(${x}, ${y}, ${r}, U8G2_DRAW_ALL);`);
    }

    //% block="Draw solid circle, Center of circle x=[X], y=[Y], radius=[R]" blockType="command"
    //% X.shadow="range" X.params.min=0 X.params.max=128 X.defl=64
    //% Y.shadow="range" Y.params.min=0 Y.params.max=64 Y.defl=32
    //% R.shadow="number" R.defl=10
    export function drawSolidCircle(parameter: any, block: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        let r = parameter.R.code;
        Generator.addCode(`lono.emoji.u8g2.drawDisc(${x}, ${y}, ${r}, U8G2_DRAW_ALL);`);
    }

    //% block="Draw ellipse, Center of circle x=[X], y=[Y], radius of x=[RX], radius of y=[RY]" blockType="command"
    //% X.shadow="range" X.params.min=0 X.params.max=128 X.defl=64
    //% Y.shadow="range" Y.params.min=0 Y.params.max=64 Y.defl=32
    //% RX.shadow="number" RX.defl=10
    //% RY.shadow="number" RY.defl=10
    export function drawEllipse(parameter: any, block: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        let rx = parameter.RX.code;
        let ry = parameter.RY.code;
        Generator.addCode(`lono.emoji.u8g2.drawEllipse(${x}, ${y}, ${rx}, ${ry}, U8G2_DRAW_ALL);`);
    }

    //% block="Draw filled ellipse, Center of circle x=[X], y=[Y], radius of x=[RX], radius of y=[RY]" blockType="command"
    //% X.shadow="range" X.params.min=0 X.params.max=128 X.defl=64
    //% Y.shadow="range" Y.params.min=0 Y.params.max=64 Y.defl=32
    //% RX.shadow="number" RX.defl=10
    //% RY.shadow="number" RY.defl=10
    export function drawFilledEllipse(parameter: any, block: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        let rx = parameter.RX.code;
        let ry = parameter.RY.code;
        Generator.addCode(`lono.emoji.u8g2.drawFilledEllipse(${x}, ${y}, ${rx}, ${ry}, U8G2_DRAW_ALL);`);
    }

    //% block="Draw a filled box, start of box left-top, x=[X], y=[Y], width=[W], height=[H]" blockType="command"
    //% X.shadow="range" X.params.min=0 X.params.max=128 X.defl=64
    //% Y.shadow="range" Y.params.min=0 Y.params.max=64 Y.defl=32
    //% W.shadow="number" W.defl=10
    //% H.shadow="number" H.defl=10
    export function drawFilledBOX(parameter: any, block: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        let W = parameter.W.code;
        let H = parameter.H.code;
        Generator.addCode(`lono.emoji.u8g2.drawBox(${x}, ${y}, ${W}, ${H});`);
    }

    //% block="Draw a box, start of box left-top, x=[X], y=[Y], width=[W], height=[H]" blockType="command"
    //% X.shadow="range" X.params.min=0 X.params.max=128 X.defl=64
    //% Y.shadow="range" Y.params.min=0 Y.params.max=64 Y.defl=32
    //% W.shadow="number" W.defl=10
    //% H.shadow="number" H.defl=10
    export function drawBOX(parameter: any, block: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        let W = parameter.W.code;
        let H = parameter.H.code;
        Generator.addCode(`lono.emoji.u8g2.drawFrame(${x}, ${y}, ${W}, ${H});`);
    }

    //% block="Draw a triangle, point1 x1=[X1],y=[Y1];point2 x2=[X2],y2=[Y2];point3 x3=[X3],y3=[Y3]" blockType="command"
    //% X1.shadow="range" X1.params.min=0 X1.params.max=128 X1.defl=0
    //% Y1.shadow="range" Y1.params.min=0 Y1.params.max=64 Y1.defl=0
    //% X2.shadow="range" X2.params.min=0 X2.params.max=128 X2.defl=0
    //% Y2.shadow="range" Y2.params.min=0 Y2.params.max=64 Y2.defl=0
    //% X3.shadow="range" X3.params.min=0 X3.params.max=128 X3.defl=0
    //% Y3.shadow="range" Y3.params.min=0 Y3.params.max=64 Y3.defl=0
    export function drawTriangle(parameter: any, block: any) {
        let x1 = parameter.X1.code;
        let y1 = parameter.Y1.code;
        let x2 = parameter.X2.code;
        let y2 = parameter.Y2.code;
        let x3 = parameter.X3.code;
        let y3 = parameter.Y3.code;
        Generator.addCode(`lono.emoji.u8g2.drawTriangle(${x1}, ${y1}, ${x2}, ${y2}, ${x3}, ${y3});`);
    }

    //% block="Draw an arc, center point x=[X], y=[Y], radius=[R], start angle=[SA], end angle=[EA]" blockType="command"
    //% X.shadow="range" X.params.min=0 X.params.max=128 X.defl=64
    //% Y.shadow="range" Y.params.min=0 Y.params.max=64 Y.defl=32
    //% R.shadow="number" R.defl=10
    //% SA.shadow="number" 
    //% EA.shadow="number"
    export function drawArc(parameter: any, block: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        let r = parameter.R.code;
        let sa = parameter.SA.code;
        let ea = parameter.EA.code;
        Generator.addCode(`lono.emoji.drawArc(${x}, ${y}, ${r}, ${sa}, ${ea});`);
    }


    //% block="Draw a line, start point x=[X], y=[Y], end point, x=[X1], y=[Y1]" blockType="command"
    //% X.shadow="range" X.params.min=0 X.params.max=128 X.defl=64
    //% Y.shadow="range" Y.params.min=0 Y.params.max=64 Y.defl=32
    //% X1.shadow="range" X1.params.min=0 X1.params.max=128 X1.defl=64
    //% Y1.shadow="range" Y1.params.min=0 Y1.params.max=64 Y1.defl=32
    export function drawLine(parameter: any, block: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        let x1 = parameter.X1.code;
        let y1 = parameter.Y1.code;
        Generator.addCode(`lono.emoji.u8g2.drawLine(${x}, ${y}, ${x1}, ${y1});`);
    }

    //% block="Draw a point, point x=[X], y=[Y]" blockType="command"
    //% X.shadow="range" X.params.min=0 X.params.max=128 X.defl=64
    //% Y.shadow="range" Y.params.min=0 Y.params.max=64 Y.defl=32
    export function drawPoint(parameter: any, block: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        Generator.addCode(`lono.emoji.u8g2.drawPixel(${x}, ${y});`);
    }

    //% block="Play Sound [SOUND]" blockType="command"
    //% SOUND.shadow="dropdown" SOUND.options="SOUND" SOUND.defl="SOUND.CONNECT"
    export function playSound(parameter: any, block: any) {
        let sound = SOUNDMAP[parameter.SOUND.code];
        Generator.addCode(`lono.playSound(${sound});`);
    }

    //% block="Set buzzer frequency to [FREQ] Hz with beat [BEAT]" blockType="command
    //% FREQ.shadow="note" FREQ.defl=247
    //% BEAT.shadow="dropdownRound" BEAT.options="BeatType" BEAT.defl="BeatType.HALF"
    export function tone(parameter: any, block: any) {
        let freq = parameter.FREQ.code;
        let beat = BeatMap[parameter.BEAT.code];
        Generator.addCode(`tone(4, ${freq}, ${beat});`);
    }

    //% block="alternately play sound [SOUND1] and [SOUND2], vocal duration [VD], silent duration [SD], repeat times [TIMES]" blockType="command
    //% SOUND1.shadow="note" SOUND1.defl=247
    //% SOUND2.shadow="note" SOUND2.defl=262
    //% VD.shadow="number" VD.defl=500
    //% SD.shadow="number" SD.defl=500
    //% TIMES.shadow="number" TIMES.defl=3
    export function alternatelyTone(parameter: any, block: any) {
        let sound1 = parameter.SOUND1.code;
        let sound2 = parameter.SOUND2.code;
        let vd = parameter.VD.code;
        let sd = parameter.SD.code;
        let times = parameter.TIMES.code;
        Generator.addCode(`lono.buzzer.alternateTone(${sound1}, ${sound2}, ${vd}, ${sd}, ${times});`);
    }

    //% block="Progressive change sound, start frequency=[SOUND1], end frequenc=[SOUND2], ratio=[RATIO], vocal duration=[VD], silent duration=[SD]" blockType="command"
    //% SOUND1.shadow="note" SOUND1.defl=247
    //% SOUND2.shadow="note" SOUND2.defl=262
    //% RATIO.shadow="number" RATIO.defl=0.1
    //% VD.shadow="number" VD.defl=500
    //% SD.shadow="number" SD.defl=500
    export function progressiveTone(parameter: any, block: any) {
        let sound1 = parameter.SOUND1.code;
        let sound2 = parameter.SOUND2.code;
        let ratio = parameter.RATIO.code;
        let vd = parameter.VD.code;
        let sd = parameter.SD.code;
        Generator.addCode(`lono.buzzer.bendTone(${sound1}, ${sound2}, ${ratio}, ${vd}, ${sd});`);
    }

    //% block="Bluetooth control cmd=[CMD], index=[IDX]" blockType="command
    //% CMD.shadow="string"
    //% IDX.shadow="number"
    export function bluetoothControl(parameter: any, block: any) {
        let cmd = parameter.CMD.code;
        let idx = parameter.IDX.code;
        Generator.addCode(`lono.bluetoothControl(${cmd}, ${idx});`);
    }

}
