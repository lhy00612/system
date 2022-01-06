<template>
  <!-- 整体容器 -->
  <div class="login-container">
    <!-- 左侧盒子 -->
    <div class="left-box">
      <!-- 顶部的标题 -->
      <div class="title-box">
        <img src="../assets/login_logo.png" alt="" class="logo" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <a-form
        ref="loginForm"
        :rules="rules"
        :model="loginForm"
        laba-width="43px"
      >
        <!-- 手机号 -->
        <a-row>
          <a-col :span="23">
            <a-form-item
              name="phone"
              :wrapperCol="{ span: 24 }"
              style="margin-left: 50px"
            >
              <a-input
                placeholder="请输入手机号"
                v-model:value="loginForm.phone"
                size="large"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- 密码 -->

        <a-row>
          <a-col :span="23">
            <a-form-item
              name="password"
              :wrapperCol="{ span: 24 }"
              style="margin-left: 50px"
            >
              <a-input
                placeholder="请输入密码"
                v-model:value="loginForm.password"
                size="large"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- 验证码 -->

        <a-row>
          <a-col :span="17">
            <a-form-item
              :wrapperCol="{ span: 23 }"
              style="margin-left: 50px"
              name="loginCode"
            >
              <a-input
                size="large"
                placeholder="请输入验证码"
                v-model:value="loginForm.loginCode"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="7" class="code-col">
            <!-- 登录验证码 -->
            <img @click="changeCode" class="login-code" :src="codeURL" alt="" />
          </a-col>
        </a-row>

        <!-- 用户协议 -->
        <a-form-item style="margin-left: 50px">
          <a-checkbox
            v-model:value="loginForm.isChecked"
            @change="isChecked = !isChecked"
          >
            我已阅读并同意
            <a type="primary">用户协议</a>
            和
            <a type="primary">隐私条款</a>
          </a-checkbox>
        </a-form-item>
        <a-form-item style="margin-left: 50px" :wrapperCol="{ span: 23 }">
          <a-button class="my-btn" @click="submitForm()" type="primary"
            >登录</a-button
          >
          <a-button class="my-btn" type="primary">注册</a-button>
        </a-form-item>
      </a-form>
    </div>
    <!-- 右边的图片 -->
    <img src="../assets/login_banner_ele.png" alt="" />
  </div>
</template>

<script>
// // 导入 注册对话框组件
// import { checkPhone } from "@/utils/validator.js";
// // 导入登录接口
// import { login } from "@/api/login.js";
// // 导入 token的工具函数
// import { setToken } from "@/utils/token.js";
import { message } from "ant-design-vue";

import { httpPost } from "@/utils/http.js";

export default {
  // 组件的名字
  name: "login",
  // 注册组件
  components: {},
  data() {
    return {
      loginForm: {
        // 手机号
        phone: "18511111111",
        // 密码
        password: "12345678",
        // 验证码
        loginCode: "",
        // 是否勾选
        isChecked: false,
      },
      // 校验规则
      rules: {
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
          },
          { min: 11, max: 11, message: "手机号长度为11位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码的长度为6-12位", trigger: "blur" },
        ],
        loginCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码的长度为4位", trigger: "blur" },
        ],
      },

      // 验证码的地址
      codeURL: `http://127.0.0.1/heimamm/public` + "/captcha?type=login",

      // http://127.0.0.1/heimamm/public/captcha?type=login
    };
  },
  // 方法
  methods: {
    // 刷新验证码
    changeCode() {
      this.codeURL =
        ` http://127.0.0.1/heimamm/public` +
        "/captcha?type=login&t=" +
        Date.now();
    },

    submitForm() {
      let par = {
        phone: this.loginForm.phone,
        password: this.loginForm.password,
        code: this.loginForm.loginCode,
      };
      console.log(par);

      if (!this.isChecked) {
        message.warning("请勾选用户协议");
        return;
      }
      httpPost("login", par)
        .then((res) => {
          console.log(res);

          let { code, data } = res;
          if (code == 200) {
            window.sessionStorage.setItem("token", data.token);
            this.$router.push("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.login-container {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  /* 开启弹性布局 */
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 左右均分 */
  justify-content: space-around;
  // 左侧盒子
  .left-box {
    width: 478px;
    background-color: #f5f5f5;
    height: 550px;
    // 设置样式 把 表单间隙空出来
    padding-right: 41px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      align-items: center;
      margin-top: 44px;
      margin-left: 48px;
      margin-bottom: 27px;
      .logo {
      }
      .title {
        font-size: 24px;
        margin-left: 16px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
      }
      .sub-title {
        font-size: 21px;
        margin-left: 12px;
      }
    }
    // 登录验证码
    .login-code {
      width: 100%;
      height: 40.8px;
    }
    // 底部的按钮
    .my-btn {
      width: 100%;
      margin-top: 26px;
      margin-left: 0;
    }
    // 验证码的 栅格容器
    .code-col {
      height: 40.8px;
    }
  }
}
</style>
