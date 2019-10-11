import React, { Component } from 'react';
import { Dimensions}from 'react-native';

maxCanvasWidth1600 = 1600;
maxCanvasHeight2560 = 2560;


maxCanvasWidth1536 = 1536;
maxCanvasHeight2048 = 2048;

export default class ImageResizer {
    constructor() {
        deviceHeight = Dimensions.get('window').height;
        deviceWidth = Dimensions.get('window').width;
    }// end of constructor


    getHeight(imgHeight) {
        if (this.getCurrentDeviceAspectRadio() === this.get2048DeviceAspectRatio()) {
            return ((imgWidth / maxCanvasHeight2048) * deviceScreenWidth);
        } else {
            return ((imgHeight / maxCanvasHeight2560) * deviceHeight);
        }
    }// end of getHeight

    getWidth(imgWidth) {
        if (this.getCurrentDeviceAspectRadio() === this.get2048DeviceAspectRatio()) {
            return ((imgWidth / maxCanvasWidth1536) * deviceWidth);
        } else {
            return ((imgWidth / maxCanvasWidth1600) * deviceWidth);
        }
    }// end of getHeight


    getCurrentDeviceAspectRadio() {
        return (deviceWidth / deviceHeight);
    }// end of getCurrentAspectRadio

    get2048DeviceAspectRatio() {
        return (maxCanvasHeight2048 / maxCanvasWidth1536);
    }// end of getCurrentDeviceAspectRatio

}// end of class ImageResizer