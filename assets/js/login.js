(function setupLoginPage() {
  "use strict";

  const loginCard = document.querySelector(".login-card:not(.recovery-card)");
  const loginPanel = document.querySelector(".login-panel");
  const form = document.getElementById("loginForm");
  const accountInput = document.getElementById("loginAccount");
  const passwordInput = document.getElementById("loginPassword");
  const rememberInput = document.getElementById("rememberAccount");
  const submitButton = document.getElementById("loginSubmit");
  const passwordToggle = document.getElementById("passwordToggle");
  const forgotButton = document.getElementById("forgotPassword");
  const loginResultNotice = document.getElementById("loginResultNotice");

  const recoveryCard = document.getElementById("recoveryCard");
  const recoveryBackButton = document.getElementById("recoveryBackButton");
  const recoveryVerifyForm = document.getElementById("recoveryVerifyForm");
  const recoveryResetForm = document.getElementById("recoveryResetForm");
  const recoverySuccess = document.getElementById("recoverySuccess");
  const recoveryAccountInput = document.getElementById("recoveryAccountInput");
  const verificationCodeInput = document.getElementById("verificationCodeInput");
  const sendCodeButton = document.getElementById("sendVerificationCodeButton");
  const sendCodeLabel = document.getElementById("sendCodeLabel");
  const verificationSendTip = document.getElementById("verificationSendTip");
  const newPasswordInput = document.getElementById("recoveryNewPasswordInput");
  const confirmPasswordInput = document.getElementById("recoveryConfirmPasswordInput");
  const returnToLoginButton = document.getElementById("returnToLoginButton");

  const ACCOUNT_STORAGE_KEY = "business-management-login-account";
  const PROFILE_STORAGE_KEY = "business-management-user-profile";
  const DEMO_CODE = "123456";
  const DISABLED_DEMO_ACCOUNTS = ["sunhao", "13800004468"];

  let demoPassword = "12345678";
  let activeChannel = "phone";
  let codeSent = false;
  let countdownTimer = 0;
  let countdownSeconds = 0;

  function loadProfile() {
    const defaultProfile = {
      account: "zhangming",
      phone: "138 0000 6288",
      email: "zhangming@company.com"
    };
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      return saved ? Object.assign({}, defaultProfile, JSON.parse(saved)) : defaultProfile;
    } catch (error) {
      return defaultProfile;
    }
  }

  function normalizePhone(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function maskPhone(phone) {
    const text = normalizePhone(phone);
    if (text.length !== 11) return "未维护手机号";
    return text.slice(0, 3) + "****" + text.slice(-4);
  }

  function maskEmail(email) {
    const text = String(email || "");
    const parts = text.split("@");
    if (parts.length !== 2) return "未维护邮箱";
    const local = parts[0];
    return local.slice(0, Math.min(3, local.length)) + "***@" + parts[1];
  }

  function setError(input, errorId, text) {
    const field = input ? input.closest(".login-field") : null;
    const error = document.getElementById(errorId);
    if (field) field.classList.toggle("has-error", Boolean(text));
    if (error) error.textContent = text || "";
  }

  function restoreAccount() {
    try {
      const savedAccount = localStorage.getItem(ACCOUNT_STORAGE_KEY);
      if (savedAccount) {
        accountInput.value = savedAccount;
        rememberInput.checked = true;
      }
    } catch (error) {}
  }

  function validateLogin() {
    const account = accountInput.value.trim();
    const password = passwordInput.value;
    setError(accountInput, "accountError", account ? "" : "请输入登录账号");
    setError(passwordInput, "passwordError", password ? "" : "请输入登录密码");
    return Boolean(account && password);
  }

  function accountMatches() {
    const profile = loadProfile();
    const value = recoveryAccountInput.value.trim().toLowerCase();
    const normalizedValue = normalizePhone(value);
    return Boolean(value) && (
      value === String(profile.account || "").toLowerCase()
      || (normalizedValue && normalizedValue === normalizePhone(profile.phone))
    );
  }

  function accountIsDisabled() {
    const value = recoveryAccountInput.value.trim().toLowerCase();
    const normalizedValue = normalizePhone(value);
    return DISABLED_DEMO_ACCOUNTS.includes(value) || DISABLED_DEMO_ACCOUNTS.includes(normalizedValue);
  }

  function updateMaskedContacts() {
    const profile = loadProfile();
    document.getElementById("maskedPhoneText").textContent = maskPhone(profile.phone);
    document.getElementById("maskedEmailText").textContent = maskEmail(profile.email);
  }

  function clearCountdown() {
    if (countdownTimer) window.clearInterval(countdownTimer);
    countdownTimer = 0;
    countdownSeconds = 0;
  }

  function resetCodeState() {
    clearCountdown();
    codeSent = false;
    sendCodeButton.disabled = false;
    sendCodeLabel.textContent = "发送验证码";
    verificationCodeInput.value = "";
    setError(verificationCodeInput, "verificationCodeError", "");
    verificationSendTip.classList.remove("expired");
    verificationSendTip.classList.add("hidden");
    verificationSendTip.textContent = "";
  }

  function startCountdown() {
    clearCountdown();
    countdownSeconds = 60;
    sendCodeButton.disabled = true;
    sendCodeLabel.textContent = countdownSeconds + " 秒后重发";
    countdownTimer = window.setInterval(() => {
      countdownSeconds -= 1;
      if (countdownSeconds <= 0) {
        clearCountdown();
        codeSent = false;
        sendCodeButton.disabled = false;
        sendCodeLabel.textContent = "重新发送";
        verificationSendTip.textContent = "验证码已过期，请重新发送。";
        verificationSendTip.classList.add("expired");
        verificationSendTip.classList.remove("hidden");
        return;
      }
      sendCodeLabel.textContent = countdownSeconds + " 秒后重发";
    }, 1000);
  }

  function resetSteps() {
    document.querySelector(".recovery-steps").classList.remove("is-reset");
    document.getElementById("verifyStepIndicator").className = "recovery-step active";
    document.getElementById("resetStepIndicator").className = "recovery-step";
  }

  function resetPasswordRules() {
    document.querySelectorAll("[data-password-rule]").forEach((rule) => {
      rule.classList.remove("passed");
    });
  }

  function resetRecoveryState() {
    const profile = loadProfile();
    resetCodeState();
    resetSteps();
    activeChannel = "phone";
    document.querySelectorAll("[data-recovery-channel]").forEach((button) => {
      const active = button.dataset.recoveryChannel === activeChannel;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    recoveryVerifyForm.classList.remove("hidden");
    recoveryResetForm.classList.add("hidden");
    recoverySuccess.classList.add("hidden");
    document.getElementById("recoveryDescription").textContent = "验证账号身份后重新设置登录密码。";
    recoveryAccountInput.value = accountInput.value.trim() || profile.account;
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";
    [newPasswordInput, confirmPasswordInput].forEach((input) => {
      input.type = "password";
    });
    document.querySelectorAll("[data-recovery-password-target]").forEach((button) => {
      button.title = "显示密码";
      button.setAttribute("aria-label", "显示密码");
    });
    setError(recoveryAccountInput, "recoveryAccountError", "");
    setError(newPasswordInput, "recoveryNewPasswordError", "");
    setError(confirmPasswordInput, "recoveryConfirmPasswordError", "");
    resetPasswordRules();
    updateMaskedContacts();
  }

  function showRecovery() {
    loginCard.classList.add("hidden");
    recoveryCard.classList.remove("hidden");
    loginPanel.classList.add("recovery-mode");
    loginResultNotice.classList.add("hidden");
    resetRecoveryState();
    window.setTimeout(() => recoveryAccountInput.focus(), 20);
  }

  function showLogin(showSuccess) {
    const profile = loadProfile();
    clearCountdown();
    recoveryCard.classList.add("hidden");
    loginCard.classList.remove("hidden");
    loginPanel.classList.remove("recovery-mode");
    if (showSuccess) {
      accountInput.value = recoveryAccountInput.value.trim() || profile.account;
      passwordInput.value = "";
      passwordInput.type = "password";
      passwordToggle.title = "显示密码";
      passwordToggle.setAttribute("aria-label", "显示密码");
      loginResultNotice.classList.remove("hidden");
      window.setTimeout(() => passwordInput.focus(), 20);
    } else {
      loginResultNotice.classList.add("hidden");
    }
  }

  function validateRecoveryAccount() {
    if (!recoveryAccountInput.value.trim()) {
      setError(recoveryAccountInput, "recoveryAccountError", "请输入登录账号或手机号");
      return false;
    }
    if (accountIsDisabled()) {
      setError(recoveryAccountInput, "recoveryAccountError", "该账号已禁用，请联系管理员启用后再重置密码");
      return false;
    }
    if (!accountMatches()) {
      setError(recoveryAccountInput, "recoveryAccountError", "账号信息无法验证，请确认后重试或联系管理员");
      return false;
    }
    setError(recoveryAccountInput, "recoveryAccountError", "");
    return true;
  }

  function sendVerificationCode() {
    if (!validateRecoveryAccount()) return;
    const profile = loadProfile();
    const target = activeChannel === "phone" ? maskPhone(profile.phone) : maskEmail(profile.email);
    if (target.startsWith("未维护")) {
      setError(recoveryAccountInput, "recoveryAccountError", "当前账号未维护该联系方式，请选择其他验证方式");
      return;
    }
    codeSent = true;
    verificationSendTip.textContent = "验证码已发送至 " + target + "；原型演示请输入 123456。";
    verificationSendTip.classList.remove("expired");
    verificationSendTip.classList.remove("hidden");
    startCountdown();
    verificationCodeInput.focus();
  }

  function enterResetStage(event) {
    event.preventDefault();
    const accountValid = validateRecoveryAccount();
    const code = verificationCodeInput.value.trim();
    let codeValid = true;
    if (!codeSent) {
      setError(
        verificationCodeInput,
        "verificationCodeError",
        verificationSendTip.classList.contains("expired") ? "验证码已过期，请重新发送" : "请先发送验证码"
      );
      codeValid = false;
    } else if (!/^\d{6}$/.test(code)) {
      setError(verificationCodeInput, "verificationCodeError", "请输入 6 位验证码");
      codeValid = false;
    } else if (code !== DEMO_CODE) {
      setError(verificationCodeInput, "verificationCodeError", "验证码错误或已过期");
      codeValid = false;
    } else {
      setError(verificationCodeInput, "verificationCodeError", "");
    }
    if (!accountValid || !codeValid) return;

    clearCountdown();
    recoveryVerifyForm.classList.add("hidden");
    recoveryResetForm.classList.remove("hidden");
    document.querySelector(".recovery-steps").classList.add("is-reset");
    document.getElementById("verifyStepIndicator").className = "recovery-step completed";
    document.getElementById("resetStepIndicator").className = "recovery-step active";
    document.getElementById("recoveryDescription").textContent = "身份验证成功，请设置新的登录密码。";
    document.getElementById("recoveryAccountSummary").textContent = loadProfile().account;
    newPasswordInput.focus();
  }

  function updatePasswordRules() {
    const value = newPasswordInput.value;
    const states = {
      length: value.length >= 8 && value.length <= 24,
      letter: /[A-Za-z]/.test(value),
      number: /\d/.test(value)
    };
    Object.keys(states).forEach((key) => {
      const rule = document.querySelector('[data-password-rule="' + key + '"]');
      if (rule) rule.classList.toggle("passed", states[key]);
    });
    return states.length && states.letter && states.number;
  }

  function completePasswordReset(event) {
    event.preventDefault();
    const nextPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const rulesPassed = updatePasswordRules();
    let valid = true;
    setError(newPasswordInput, "recoveryNewPasswordError", "");
    setError(confirmPasswordInput, "recoveryConfirmPasswordError", "");
    if (!rulesPassed) {
      setError(newPasswordInput, "recoveryNewPasswordError", "新密码需为 8-24 位，并同时包含字母和数字");
      valid = false;
    } else if (nextPassword === demoPassword) {
      setError(newPasswordInput, "recoveryNewPasswordError", "新密码不能与原密码相同");
      valid = false;
    }
    if (!confirmPassword) {
      setError(confirmPasswordInput, "recoveryConfirmPasswordError", "请再次输入新密码");
      valid = false;
    } else if (confirmPassword !== nextPassword) {
      setError(confirmPasswordInput, "recoveryConfirmPasswordError", "两次输入的新密码不一致");
      valid = false;
    }
    if (!valid) return;

    demoPassword = nextPassword;
    document.getElementById("loginDemoPassword").textContent = nextPassword;
    recoveryResetForm.classList.add("hidden");
    recoverySuccess.classList.remove("hidden");
    document.getElementById("verifyStepIndicator").className = "recovery-step completed";
    document.getElementById("resetStepIndicator").className = "recovery-step completed";
    document.getElementById("recoveryDescription").textContent = "密码已更新，可以返回登录系统。";
    document.getElementById("recoverySuccessAccount").textContent = loadProfile().account;
  }

  passwordToggle.addEventListener("click", () => {
    const willShow = passwordInput.type === "password";
    passwordInput.type = willShow ? "text" : "password";
    passwordToggle.title = willShow ? "隐藏密码" : "显示密码";
    passwordToggle.setAttribute("aria-label", passwordToggle.title);
  });

  forgotButton.addEventListener("click", showRecovery);
  recoveryBackButton.addEventListener("click", () => showLogin(false));
  returnToLoginButton.addEventListener("click", () => showLogin(true));
  sendCodeButton.addEventListener("click", sendVerificationCode);
  recoveryVerifyForm.addEventListener("submit", enterResetStage);
  recoveryResetForm.addEventListener("submit", completePasswordReset);

  accountInput.addEventListener("input", () => {
    setError(accountInput, "accountError", "");
    loginResultNotice.classList.add("hidden");
  });
  passwordInput.addEventListener("input", () => {
    setError(passwordInput, "passwordError", "");
    loginResultNotice.classList.add("hidden");
  });
  recoveryAccountInput.addEventListener("input", () => {
    setError(recoveryAccountInput, "recoveryAccountError", "");
    if (codeSent) resetCodeState();
  });
  verificationCodeInput.addEventListener("input", () => {
    verificationCodeInput.value = verificationCodeInput.value.replace(/\D/g, "").slice(0, 6);
    setError(verificationCodeInput, "verificationCodeError", "");
  });
  newPasswordInput.addEventListener("input", () => {
    setError(newPasswordInput, "recoveryNewPasswordError", "");
    updatePasswordRules();
  });
  confirmPasswordInput.addEventListener("input", () => {
    setError(confirmPasswordInput, "recoveryConfirmPasswordError", "");
  });

  document.querySelectorAll("[data-recovery-channel]").forEach((button) => {
    button.addEventListener("click", () => {
      activeChannel = button.dataset.recoveryChannel;
      document.querySelectorAll("[data-recovery-channel]").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      resetCodeState();
    });
  });

  document.querySelectorAll("[data-recovery-password-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.recoveryPasswordTarget);
      const willShow = input.type === "password";
      input.type = willShow ? "text" : "password";
      button.title = willShow ? "隐藏密码" : "显示密码";
      button.setAttribute("aria-label", button.title);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateLogin()) return;
    try {
      if (rememberInput.checked) {
        localStorage.setItem(ACCOUNT_STORAGE_KEY, accountInput.value.trim());
      } else {
        localStorage.removeItem(ACCOUNT_STORAGE_KEY);
      }
    } catch (error) {}

    submitButton.classList.add("is-loading");
    submitButton.querySelector("span").textContent = "正在登录…";
    window.setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 420);
  });

  restoreAccount();
  updateMaskedContacts();
})();
