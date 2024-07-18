
// enum SIZE {
//     //% block="29*29"
//     1,
//     //% block="58*58"
//     2
// }

enum EMOJITYPE {
    //% block="smile"
    SMILE,
    //% block="sad"
    SAD,
    //% block="cry"
    CRY,
    //% block="sorry"
    SORRY,
    //% block="angry"
    ANGRY,
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


enum SOUND {
    //% block="naughty"
    NAUGHTY,
    //% block="alarm"
    ALARM,
    //% block="connect"
    CONNECT,
    //% block="disconnect"
    DISCONNECT,
    //% block="confused"
    CONFUSED,
    //% block="happy"
    HAPPY,
    //% block="sad"
    SAD,
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


let SOUNDMAP = {
    NAUGHTY: "SoundType::NAUGHTY",
    ALARM: "SoundType::ALARM",
    CONNECT: "SoundType::CONNECT",
    DISCONNECT: "SoundType::DISCONNECT",
    CONFUSED: "SoundType::CONFUSED",
    HAPPY: "SoundType::HAPPY",
    SAD: "SoundType::SAD",
    CUDDLY: "SoundType::CUDDLY",
    SLEEPING: "SoundType::SLEEPING"
};

let EMOJIMAP = {
    SMILE: "EmojiType::SMILE",
    SAD: "EmojiType::SAD",
    CRY: "EmojiType::CRY",
    SORRY: "EmojiType::SORRY",
    ANGRY: "EmojiType::ANGRY",
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

    //% block="Play Sound [SOUND]" blockType="command"
    //% SOUND.shadow="dropdown" SOUND.options="SOUND" SOUND.defl="SOUND.CONNECT"
    export function playSound(parameter: any, block: any) {
        let sound = SOUNDMAP[parameter.SOUND.code];
        Generator.addCode(`lono.playSound(${sound});`);
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

    //% block="Save trims" blockType="command"
    export function saveTrims(parameter: any, block: any) {
        Generator.addCode(`lono.saveTrims();`);
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

    //% block="Add custom motion(MAX 32); time [TIME]ms, R-shoulder[R1], R-elbow[R2], R-wrist[R3], R-hip[R4], R-foot[R5], L-shoulder[L1], L-elbow[L2], L-wrist[L3], L-hip[L4], L-foot[L5]," blockType="command"
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
}
