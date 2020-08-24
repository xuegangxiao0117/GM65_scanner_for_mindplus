enum swsr_pin {
    //% block="2"
    2,
    //% block="3"
    3,
    //% block="4"
    4,
    //% block="5"
    5,
    //% block="6"
    6,
    //% block="7"
    7,
    //% block="8"
    8,
    //% block="9"
    9,
    //% block="10"
    10,
    //% block="11"
    11
}

enum on_off_switch {
    //% block="开启"
    1,
    //% block="关闭"
    0
}

enum working_modes{
    //% block="手动模式"
    0,
    //% block="命令触发模式"
    1,
    //% block="连续模式"
    2,
    //% block="感应模式"
    3
}

enum aim_modes{
    //% block="无瞄准"
    0,
    //% block="普通"
    1,
    //% block="常亮"
    2
}

enum light_modes{
    //% block="无灯光"
    0,
    //% block="普通"
    1,
    //% block="常亮"
    2
}

namespace GM65 {

    //% block="初始化GM65-条码识读模块,软串口Rx[rx] Tx[tx]" blockType="command"
    //% rx.shadow="dropdown"   rx.options="swsr_pin"     rx.defl="swsr_pin.10"
    //% tx.shadow="dropdown"   tx.options="swsr_pin"     tx.defl="swsr_pin.11"
    export function init(parameter: any, block: any){
        let rx_pin = parameter.rx.code
        let tx_pin = parameter.tx.code
        Generator.addInclude("SoftwareSerial","#include <SoftwareSerial.h>");
        Generator.addInclude("GM65_scanner",'#include "GM65_scanner.h"');
        Generator.addObject("SoftwareSerial", "SoftwareSerial", `mySerial(${rx_pin},${tx_pin});`);
        Generator.addObject("GM65_scanner", "GM65_scanner", `scanner(&mySerial);`); 
        Generator.addSetup('swsr_begin',`mySerial.begin(9600);`);  
        Generator.addSetup('scanner_init1',`scanner.init();`);  
        Generator.addSetup('scanner_init2',`scanner.enable_setting_code();`);  
    }

    //% block="获取数据" blockType="reporter"
    export function getinfo3(parameter: any, block: any){
        Generator.addCode('scanner.get_info()');
    }


    //% block="[on_off]静音模式" blockType="command"
    //% on_off.shadow="dropdown"   on_off.options="on_off_switch"     rx.defl="on_off_switch.开启"
    export function set_silent_mode(parameter: any, block: any){
        let silent_mode = 1 - parameter.on_off.code
        Generator.addCode(`scanner.set_silent_mode(${silent_mode});`);
}


    //% block="[on_off]LED模式" blockType="command"
    //% on_off.shadow="dropdown"   on_off.options="on_off_switch"     rx.defl="on_off_switch.开启"
    export function set_LED_mode(parameter: any, block: any){
        let LED_mode = parameter.on_off.code
        Generator.addCode(`scanner.set_LED_mode(${LED_mode});`);
}

    //% block="[on_off]灯光模式" blockType="command"
    //% on_off.shadow="dropdown"   on_off.options="light_modes"     rx.defl="light_modes.普通"
    export function set_light_mode(parameter: any, block: any){
        let light_mode = parameter.on_off.code
        Generator.addCode(`scanner.set_light_mode(${light_mode});`);
}


    //% block="[on_off]瞄准模式" blockType="command"
    //% on_off.shadow="dropdown"   on_off.options="aim_modes"     rx.defl="aim_modes.普通"
    export function set_aim_mode(parameter: any, block: any){
        let aim_mode = parameter.on_off.code
        Generator.addCode(`scanner.set_aim_mode(${aim_mode});`);
}

    //% block="[on_off]睡眠模式(手动模式下有效)" blockType="command"
    //% on_off.shadow="dropdown"   on_off.options="on_off_switch"     rx.defl="on_off_switch.开启"
    export function set_sleep_mode(parameter: any, block: any){
        let sleep_mode = parameter.on_off.code
        Generator.addCode(`scanner.set_sleep_mode(${sleep_mode});`);
}

    //% block="切换至[modes]模式" blockType="command"
    //% modes.shadow="dropdown"   modes.options="working_modes"     rx.defl="on_off_switch.开启"
    export function set_working_mode(parameter: any, block: any){
        let mode = parameter.modes.code
        Generator.addCode(`scanner.set_working_mode(${mode});`);
}

    //% block="扫描一次(命令触发模式有效)" blockType="command"
    export function scan_once(parameter: any, block: any){
        Generator.addCode(`scanner.scan_once();`);
}

}