import { Cordova } from "@w6s/codash";

// 实例化，相关可用配置属性，请查看文档
const wp = new Cordova();

// 创建promisify的cordova方法
export const getLocation = wp.create("WorkPlus_Location", "getLocation");
export const getDeviceInfo = wp.create("WorkPlus_DeviceInfo", "getDeviceInfo");
