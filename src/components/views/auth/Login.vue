<template>
    <div class="login">
        <Card :cardSupportingText="true" :titleCenter="true">
          <template v-slot:title-text>
            Ex Mark
          </template>
          <template v-slot:supporting-text>
            Платформа учета маркировки продукции
          </template>
          <template v-slot:body-content>
            <form action="#">
              <Textfield id="login" label="Логин" floatingLabel v-model="user.email"></Textfield>
              <Textfield type="password" id="password" label="Пароль" floatingLabel v-model="user.password"></Textfield>
            </form>
            <button v-show="!loading" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored button_login" v-on:click="handleLogin">Войти</button>
            <Progress v-show="loading" id="mdl-progress-login" indeterminate></Progress>
            <div class="mdl-card__supporting-text version-info">
              Версия {{version}}
            </div>
          </template>
        </Card>
    </div>
</template>

<script>

    import User from "../../../models/user"

    export default {
        name: "login",
        data() {
            return {
              user: new User('', ''),
              loading: false,
              version: process.env.VUE_APP_PRODUCT_VERSION,
            }

        },
        methods:{
          handleLogin(){
            this.loading = true;
            if (this.user.email && this.user.password){
              this.loading = true;
              this.$store.dispatch('auth/login', this.user).then(
                () => {
                        this.loading = false;
                        this.$router.push('/')
                }
              )
              .catch(error => {
                this.loading = false;
                this.$store.dispatch('setMessage', "Не  удалось авторизоваться в системе. Повторите попытку позднее")
              })
            } else{
              this.loading = false;
              this.$store.dispatch('setMessage', 'Не заполены логин или пароль')
            }
          }
        },
        computed:{
          loggedIn() { return this.$store.state.auth.status.loggedIn },
        },
        created() {
          if (this.loggedIn) {
            this.$router.push('/');
          }
        },
    }
</script>

<style lang="scss" src="./Login.scss" scoped></style>
