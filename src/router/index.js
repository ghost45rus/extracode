import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Dashboard from 'components/views/dashboard/Dashboard'
import Login from 'components/views/auth/Login.vue'
import KIZ from 'components/views/kiz/KIZ.vue'
import directDeliveries from 'components/views/upd/directDeliveries/directDeliveries.vue'
import directDeliveriesCard from 'components/views/upd/directDeliveries/directDeliveriesCard'
import groupOperations from 'components/views/upd/groupOperations/groupOperations'
import groupOperationsCard from 'components/views/upd/groupOperations/groupOperationsCard'
import CommissioningCard from 'components/views/commissioning/CommissioningCard'
import LeavingCard from 'components/views/leaving/LeavingCard'
import settingsUsers from 'components/views/settings/settingsUsers'
import SUZ from 'components/views/suz/SUZ'
import SuzCard from 'components/views/suz/SuzCard'
import Commissioning from 'components/views/commissioning/Commissioning'
import Leaving from 'components/views/leaving/Leaving'
import Incoming from 'components/views/incoming/Incoming'
import IncomingCard from 'components/views/incoming/IncomingCard'
import Aggregation from 'components/views/aggregation/Aggregation'
import AggregationCard from 'components/views/aggregation/AggregationCard'
import ExternalShipment from 'components/views/externalShipment/ExternalShipment'
import ExternalShipmentCard from 'components/views/externalShipment/ExternalShipmentCard'
import ExternalReturnCard from 'components/views/externalReturn/ExternalReturnCard'
import Reconciliation from 'components/views/reconciliation/Reconciliation'
import ReconciliationCard from 'components/views/reconciliation/ReconciliationCard'
import ActiveRecords from 'components/views/fundInformation/ActiveRecords/ActiveRecords'
import ProcessedRecords from 'components/views/fundInformation/ProcessedRecords/ProcessedRecords'
import AutoTestList from 'components/views/autoTest/autoTestList'
import AutoTestCard from 'components/views/autoTest/autoTestCard'
import E404 from 'components/views/errors/E404.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Главная',
      requiresAuth: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      title: 'Авторизация'
    }
  },
  {
    path: '/kiz',
    name: 'kiz',
    component: KIZ,
    meta: {
      title: 'КИЗ',
      requiresAuth: true
    }
  },
  {
    path: '/suz',
    name: 'suz',
    component: SUZ,
    meta: {
      title: 'Заказы марок',
      requiresAuth: true
    }
  },
  {
    path: '/suz/:id',
    name: 'suzById',
    component: SuzCard,
    meta: {
      title: 'Документ эмиссии марок',
      requiresAuth: true
    }
  },
  {
    path: '/commissioning',
    name: 'commissioning',
    component: Commissioning,
    meta: {
      title: 'Ввод в оборот',
      requiresAuth: true
    }
  },
  {
    path: '/commissioning/:id',
    name: 'commissioningById',
    component: CommissioningCard,
    meta: {
      title: 'Документ ввода марок в оборот',
      requiresAuth: true
    }
  },
  {
    path: '/incoming',
    name: 'incoming',
    component: Incoming,
    meta: {
      title: 'Приемка импорт',
      requiresAuth: true
    }
  },
  {
    path: '/incoming/:id',
    name: 'incomingById',
    component: IncomingCard,
    meta: {
      title: 'Документ поставки импортного поставщика',
      requiresAuth: true
    }
  },
  {
    path: '/leaving',
    name: 'leaving',
    component: Leaving,
    meta: {
      title: 'Выбытие марок',
      requiresAuth: true
    }
  },
  {
    path: '/leaving/:id',
    name: 'leavingById',
    component: LeavingCard,
    meta: {
      title: 'Документ выбытия марок',
      requiresAuth: true
    }
  },
  {
    path: '/upd/directDeliveries',
    name: 'directDeliveries',
    component: directDeliveries,
    meta: {
      title: 'Прямые поставки',
      requiresAuth: true
    },
    props: true

  },
  {
    name: 'directDeliveriesById',
    path: '/upd/directDeliveries/:id',
    component: directDeliveriesCard,
    meta: {
      title: 'Документ поставки от внешнего поставщика',
      requiresAuth: true
    }
  },
  {
    path: '/upd/groupOperations',
    name: 'groupOperations',
    component: groupOperations,
    meta: {
      title: 'Внутригрупповые поставки',
      requiresAuth: true
    }
  },
  {
    name: 'groupOperationsById',
    path: '/upd/groupOperations/:id',
    component: groupOperationsCard,
    meta: {
      title: 'Документ внутреннего перемещения',
      requiresAuth: true
    }
  },
  {
    path: '/aggregation',
    name: 'aggregation',
    component: Aggregation,
    meta: {
      title: 'Агрегация',
      requiresAuth: true
    }
  },
  {
    path: '/aggregation/:id',
    name: 'aggregationById',
    component: AggregationCard,
    meta: {
      title: 'Документ агрегации',
      requiresAuth: true
    }
  },
  {
    path: '/external-shipment',
    name: 'externalShipment',
    component: ExternalShipment,
    meta: {
      title: 'Продажа контрагентам',
      requiresAuth: true
    }
  },
  {
    path: '/external-shipment/:id',
    name: 'externalShipmentById',
    component: ExternalShipmentCard,
    meta: {
      title: 'Документ отгрузки контрагенту',
      requiresAuth: true
    }
  },
  {
    path: '/external-return/:id',
    name: 'externalReturnById',
    component: ExternalReturnCard,
    meta: {
      title: 'Документ возврата от контрагента',
      requiresAuth: true
    }
  },
  {
    path: '/reconciliation',
    name: 'reconciliation',
    component: Reconciliation,
    meta: {
      title: 'Сверка стока систем',
      requiresAuth: true
    }
  },
  {
    path: '/reconciliation/:id',
    name: 'reconciliationById',
    component: ReconciliationCard,
    meta: {
      title: 'Документ сверки',
      requiresAuth: true
    }
  },
  {
    path: '/fundInformation/activeRecords',
    name: 'activeRecords',
    component: ActiveRecords,
    meta: {
      title: 'Активные записи',
      requiresAuth: true
    }
  },
  {
    path: '/fundInformation/processedRecords',
    name: 'processedRecords',
    component: ProcessedRecords,
    meta: {
      title: 'Обработанные записи',
      requiresAuth: true
    }
  },
  {
    path: '/autoTest',
    component: AutoTestList,
    meta: {
      title: 'Модуль автотестирования',
      requiresAuth: true
    }
  },
  {
    path: '/autoTest/:id',
    component: AutoTestCard,
    meta: {
      title: 'Сценарий',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    component: settingsUsers,
    meta: {
      title: 'Настройки',
      requiresAuth: true
    }
  },
  {
    path: '/:any(.*)',
    name: 'error',
    component: E404,
    meta: {
      title: 'Error 404',
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.matched.some(record => record.meta?.requiresAuth)) {
    if (!store.getters['auth/isLoggedIn']) {
      document.title = 'Авторизация'
      next('/login')
      return
    }
    document.title = to.meta.title
    next()
  } else {
    next()
  }
})

export default router
