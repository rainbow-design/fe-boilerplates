<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">nuxt-boilerplate</h1>
      <h3>{{ author }}</h3>
      <van-button size="small" type="primary" @click="setContractStatus('111')"
        >开启进入</van-button
      >
    </div>
  </div>
</template>

<script>
import { omit } from "lodash";
import { mapState, mapMutations } from "vuex";
import Logo from "@/components/Logo";
import Validator, {
  UserPhone,
  UserCaptcha,
  verifyData
} from "../plugins/validator";
export default {
  head: {
    title: "首页"
  },
  components: {
    Logo
  },
  computed: {
    ...mapState({
      author: state => state.user.author
    })
  },
  mounted() {
    this.$loading.show();
    let arr = [
      {
        value: "13412345678",
        vaild: UserPhone
      },
      {
        value: "158043",
        vaild: UserCaptcha
      }
    ];
    verifyData(arr).then(({ pass, errMsg }) => {
      if (!pass) {
        console.warn(errMsg);
      } else {
        this.$notify.showTips("表单验证通过");
      }
    });
    console.dir(Validator);
    console.dir(new Validator({ rule: "mobile" }));
    Validator.verify("13412345678", UserPhone).then(({ pass, errMsg }) => {
      if (!pass) {
        this.$toast({ text: errMsg });
      }
    });

    // * 错误提示 layouts/error 页面
    // throw new Error("项目报错了");

    this.$nextTick(() => {
      // this.$nuxt.$loading.start();
      setTimeout(() => {
        // this.$nuxt.$loading.finish();
        this.$loading.hide();
        // this.$toast({ text: "加载成功" });
      }, 1500);
    });
    console.log(omit({ id: "1", friend: "heizi", name: "rainbow" }, ["id"]));
  },
  methods: {
    ...mapMutations({
      setContractStatus: "user/setContractStatus"
    })
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 48px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
