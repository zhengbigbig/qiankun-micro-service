export const USERNAME_VALIDATION = /^[a-zA-Z][a-zA-Z0-9_]{3,18}$/;
export const PASSWORD_VALIDATION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,16}$/;  // 必须包含大小写字母数字。特殊符号
export const COMPANY_VALIDATION = /^.{1,64}$/;
export const TEL_VALIDATION = /^[1]([3-9])[0-9]{9}$/;
export const MESSAGE_CODE_VALIDATION = /^\d{6}$/;
export const EMERGENCY_NAME_VALIDATION = /^[a-zA-Z0-9_.-]{1,256}$/;
export const MAC_VALIDATION = /^([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}$/;
export const IP_BASE_VALIDATION = /^\d+(\.(\d+)){3}$/;
export const SNAP_DESC_VALIDATION = /^[a-zA-Z0-9_-]{1,20}$/;
export const CLIENT_MARK_VALIDATION = /^.{1,64}$/;
export const CDP_SERVER_NAME = /^.{3,15}$/;
export const PATH = /^\/.+$/;
/**
 * 检查IP地址是否合法
 */
export const checkIp = (notCare: any, value: string) => {
  const promise = Promise;
  // 没有值的情况
  if (!value) {
    return promise.resolve();
  }
  if (!IP_BASE_VALIDATION.test(value)) {
    return promise.reject('格式应如:192.168.1.1');
  } else {
    const ipArr = value?.split('.') as string[];
    const IP1 = parseInt(ipArr?.[0]);
    const IP2 = parseInt(ipArr?.[1]);
    const IP3 = parseInt(ipArr?.[2]);
    const IP4 = parseInt(ipArr?.[3]);
    if (IP1 === 127) {
      return promise.reject('以127开头IP无效,此类地址为环回地址保留');
    } else if (IP1 < 1 || IP1 > 223) {
      return promise.reject('第一段应为介于1和223间的某个有效值');
    } else if (IP2 < 0 || IP2 > 255) {
      return promise.reject('第二段应为介于0和255间的某个有效值');
    } else if (IP3 < 0 || IP3 > 255) {
      return promise.reject('第三段应为介于0和255间的某个有效值');
    } else if (IP4 < 0 || IP4 > 255) {
      return promise.reject('第四段应为介于0和255间的某个有效值');
    } else {
      return promise.resolve();
    }
  }
};

/**
 * 检查子网掩码是否合法
 * @param notCare
 * @param value
 */
export const checkMASK = (notCare: any, value: string) => {
  const promise = Promise;
  // 没有值的情况
  if (!value) {
    return promise.resolve();
  }
  if (!IP_BASE_VALIDATION.test(value)) {
    return promise.reject('格式应如:255.255.255.255');
  } else {
    const ipArr = value?.split('.') as string[];
    const IP1 = parseInt(ipArr?.[0]);
    const IP2 = parseInt(ipArr?.[1]);
    const IP3 = parseInt(ipArr?.[2]);
    const IP4 = parseInt(ipArr?.[3]);
    if (IP1 < 0 || IP1 > 255) {
      return promise.reject('第一段应为介于0和255间的某个有效值');
    } else if (IP2 < 0 || IP2 > 255) {
      return promise.reject('第二段应为介于0和255间的某个有效值');
    } else if (IP3 < 0 || IP3 > 255) {
      return promise.reject('第三段应为介于0和255间的某个有效值');
    } else if (IP4 < 0 || IP4 > 255) {
      return promise.reject('第四段应为介于0和255间的某个有效值');
    } else {
      return promise.resolve();
    }
  }
};
