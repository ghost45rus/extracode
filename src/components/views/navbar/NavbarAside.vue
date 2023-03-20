<template>
    <div class="mdl-layout__drawer" ref="drawer">
      <span class="mdl-layout-title">Меню</span>
      <nav class="mdl-navigation">
        <dropDownMenu ref="dropDown">
          <template v-slot:title>
          <div style="display:flex; align-items: center">
            <Icon
              :iconName="'document'"
              :iconFillColor="'#757575'"
              :iconStrokeColor="'#757575'"
              :iconStrokeWidth="'3'"
              >
            </Icon>
            Документы
          </div>
          </template>
          <template v-slot:links>
            <div @click="closeNavbarAside">
              <router-link to="/upd/directDeliveries" class="mdl-navigation__link">Прямые поставки</router-link>
            </div>
            <div @click="closeNavbarAside">
              <router-link to="/upd/groupOperations" class="mdl-navigation__link">Внутригрупповые операции</router-link>
            </div>
            <div @click="closeNavbarAside">
              <router-link to="/suz" class="mdl-navigation__link">Заказ марок</router-link>
            </div>
            <div @click="closeNavbarAside">
              <router-link to="/commissioning" class="mdl-navigation__link">Ввод в оборот</router-link>
            </div>
            <div @click="closeNavbarAside">
              <router-link to="/incoming" class="mdl-navigation__link">Приемка импорт</router-link>
            </div>
            <div @click="closeNavbarAside">
              <router-link to="/leaving" class="mdl-navigation__link">Выбытие марок</router-link>
            </div>
            <div @click="closeNavbarAside">
              <router-link to="/aggregation" class="mdl-navigation__link">Агрегация</router-link>
            </div>
            <div @click="closeNavbarAside">
              <router-link to="/external-shipment" class="mdl-navigation__link">Продажа контрагентам</router-link>
            </div>
            <div @click="closeNavbarAside">
              <router-link to="/reconciliation" class="mdl-navigation__link">Сверка стока систем</router-link>
            </div>
          </template>
        </dropDownMenu>
        <div @click="closeNavbarAside">
          <router-link to="/kiz" class="mdl-navigation__link">
            <div style="display:flex; align-items: center">
              <Icon
                :iconName="'mark-index'"
                :iconFillColor="'#757575'"
                :iconStrokeColor="'#757575'"
                :iconStrokeWidth="'9'"
              >
              </Icon>
              Поиск КИЗ
            </div>
          </router-link>
        </div>
        <dropDownMenu ref="dropDown">
          <template v-slot:title>
            <div style="display:flex; align-items: center">
              <Icon
                :iconName="'fund-information'"
                :iconFillColor="'#757575'"
                :iconStrokeColor="'#757575'"
                :iconStrokeWidth="'9'"
              >
              </Icon>
              Фонд сведения
            </div>
          </template>
          <template v-slot:links>
            <div @click="closeNavbarAside">
              <router-link to="/fundInformation/activeRecords" class="mdl-navigation__link">Активные записи</router-link>
            </div>
            <div @click="closeNavbarAside">
              <router-link to="/fundInformation/processedRecords" class="mdl-navigation__link">Обработанные записи</router-link>
            </div>
          </template>
        </dropDownMenu>
        <div @click="closeNavbarAside">
          <router-link to="/autoTest" class="mdl-navigation__link">
            <div style="display:flex; align-items: center">
              <Icon
                :iconName="'autotests'"
                :iconFillColor="'#757575'"
                :iconStrokeColor="'#757575'"
                :iconStrokeWidth="'9'"
              >
              </Icon>
              Модуль автотестирования
            </div>
          </router-link>
        </div>
        <dropDownMenu ref="dropDown">
          <template v-slot:title>
            <div style="display:flex; align-items: center">
              <Icon
                :iconName="'settings'"
                :iconFillColor="'#757575'"
                :iconStrokeColor="'#757575'"
                :iconStrokeWidth="'3'"
              >
              </Icon>
              Настройки
            </div>
          </template>
          <template v-slot:links>
            <div @click="closeNavbarAside">
              <router-link to="/settings" class="mdl-navigation__link">Пользователи</router-link>
            </div>
          </template>
        </dropDownMenu>

      </nav>
    </div>
</template>

<script>
    export default {
      name: "navbarAside",
      methods:{
        clickOutside(e){
          if (!this.$el.contains(e.target)) {
            this.$refs.dropDown.closeDropDown()
          }
        },
        closeNavbarAside(){
          const el = document.querySelector('#app.mdl-layout.mdl-js-layout').MaterialLayout
          const drawerButton = el.element_.querySelector('.' + el.CssClasses_.DRAWER_BTN)
          el.drawer_.classList.toggle(el.CssClasses_.IS_DRAWER_OPEN)
          el.obfuscator_.classList.toggle(el.CssClasses_.IS_DRAWER_OPEN)
          el.drawer_.setAttribute('aria-hidden', 'true')
          drawerButton.setAttribute('aria-expanded', 'false')
        }
      },
      created(){
        document.addEventListener('click', this.clickOutside)
      },
      beforeUnmount(){
        () => document.removeEventListener('click', this.clickOutside)
      },
    }
</script>

<style lang="scss" src="./NavbarAside.scss">

</style>
