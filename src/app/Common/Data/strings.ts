export namespace CommonStrings {
  export const ok = "OK";
  export const cancel = "キャンセル";
  export const back = "戻る";
  export const login = "ログイン";
  export const logout = "ログアウト";
  export const companyCode = "会社コード";
  export const userID = "ユーザーＩＤ";
  export const close = "閉じる";
  export const registration = "登録";
  export const invalidMailAddress = "無効なメールアドレスです";
}

export namespace ScheduledHolidayStrings {
  export const title = "有給休暇予実管理";
  export const noticeGranted = "有給休暇が付与されています。";
  export const noticeUngranted = "有給休暇が付与されていません。";
  export const dateBlank = "有給休暇予定日を設定してください。";
  export const dateFuture = "前日までに有給休暇を申請してください。";
  export const datePast =
    "有給休暇を取得していなければ、有給休暇予定日を変更してください。";
  export const holidayTaken = "有休取得しました。";
  export const holiday1 = "第1有給休暇取得";
  export const holiday2 = "第2有給休暇取得";
  export const holiday3 = "第3有給休暇取得";
  export const holiday4 = "第4有給休暇取得";
  export const holiday5 = "第5有給休暇取得";
  export const recordSchedule = "登録";
}

export namespace PassChangeStrings {
  export const title = "パスワード変更";
  export const oldPass = "現在のパスワード";
  export const newPass1 = "新しいパスワード";
  export const newPass2 = "新しいパスワード(確認)";
  export const oldPassHelp = "現在のパスワードを入力してください。";
  export const newPass1Invalid =
    "半角の数字、大文字、小文字、記号を含む８文字以上を指定してください。";
  export const newPass1Valid = "有効なパスワードです。";
  export const newPass2Help =
    "確認のため、新しいパスワードをもう一度入力してください。";
  export const newPass2Unmatch = "新しいパスワードが一致していません。";
  export const newPass2Match = "";
  export const passChange = "パスワード変更";
  export const passChangeSuccess = "パスワードを変更しました。";
  export const passChangeFailure = "パスワードの変更に失敗しました。";
}

export namespace NewPassRequestStrings {
  export const title = "仮パスワード発行";
  export const send = "送信";
  export const dialogMessage =
    "仮パスワードを発行します。\nユーザーＩＤを入力してから、送信ボタンを押すと、仮パスワードが発行されます。";
  export const requestCompleteMessage =
    "仮パスワードが発行されました。\nメールが届かない場合には、再度、仮パスワード発行をしてください。";
}

export namespace MemberListStrings {
  export const title = "メンバー一覧";
  export const userId = "No.";
  export const grantYear = "付与年";
  export const division = "所属部";
  export const part = "所属課";
  export const group = "グループ";
  export const name = "氏名";
  export const digestedDays = "有休消化";
  export const actions = "ボタン";
}

export namespace MemberInfoStrings {
  export const title = "メンバー情報";
  export const memberName = "氏名";
  export const memberId = "社員ID";
  export const boss = "上司";
  export const userPrivileges = "ユーザー権限";
  export const employmentStatus = "雇用形態";
  export const grantDate = "有給付与日";
  export const mailAddress1 = "通知先メールアドレス1";
  export const mailAddress2 = "通知先メールアドレス2";
  export const mailAddress3 = "通知先メールアドレス3";
  export const joiningDate = "入社日";
  export const retirementDate = "退社日";
  export const contractStartDate = "契約開始日";
}
