export const errorMessage = {
  1002002: '登入失敗，請重新輸入帳號及密碼',
  1002011: '註冊失敗，帳號、電子信箱已存在',
  1001001001: '請確認資料是否有填寫完畢',
  1001001024: '電子信箱輸入有誤',
  1002012: '登入失敗，你的信箱尚未驗證，請先進行驗證動作',
  1002013: '登入失敗，請重新輸入帳號及密碼'
};

export function errorMapping (errorCode) {
  if (errorMessage.hasOwnProperty(errorCode)) {
    return errorMessage[errorCode];
  } else {
    return '比對不到錯誤代碼';
  }
}
