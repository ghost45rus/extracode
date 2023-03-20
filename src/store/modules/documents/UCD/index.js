import ucdExternalIncoming from './document.ucd.externalIncoming.module'
import ucdExternalShipment from './document.ucd.externalShipment.module'
import ucdIntraGroupTransaction from './document.ucd.intraGroupTransaction.module'



export default {
  namespaced: true,
  modules: {
    ucdIntraGroupTransaction,
    ucdExternalIncoming,
    ucdExternalShipment
  }
}
