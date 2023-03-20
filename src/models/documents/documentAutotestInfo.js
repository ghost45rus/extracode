import { Document } from './document'
// import { dateTimeFormat } from 'utils/datetime'
import { StatusAutoTest } from 'models/status/status.autoTest'
import { StatusGroupOperation } from 'models/status/upd/status.groupOperation'
import { StatusDirectDeliverie } from 'models/status/upd/status.directDeliverie'
import { StatusExternalReturn } from 'models/status/external/status.externalReturn'
import { StatusExternalShipment } from 'models/status/external/status.externalShipment'
import { StatusSuz } from 'models/status/suz/status.suz'
import { StatusIncoming } from 'models/status/status.incoming'
import { StatusLeaving } from 'models/status/status.leaving'
import { StatusReconiliation } from 'models/status/status.reconiliation'
import { StatusCommissioning } from 'models/status/status.commissioning'
import { StatusAggregation } from 'models/status/status.aggregation'

export class DocumentAutotestInfo extends Document {
  constructor (params, type) {
    super(params)
    super.setParams(params)
    const status = new StatusAutoTest({ statusName: params.docStatusName, statusDescription: params.docStatusDescription })
    super.setStatus(status)
    this.rows = []
    if (params.history && params.history.length) {
      for (const item in params.history) {
        let status = null
        switch (params.history[item].docType) {
          case 'intragroup_transactions_docs':
            status = new StatusGroupOperation({ statusName: params.history[item].docStatusName, statusDescription: params.history[item].docStatusDescription })
            break
          case 'external_incoming_docs':
            status = new StatusDirectDeliverie({ statusName: params.history[item].docStatusName, statusDescription: params.history[item].docStatusDescription })
            break
          case 'aggregation_docs':
            status = new StatusAggregation({ statusName: params.history[item].docStatusName, statusDescription: params.history[item].docStatusDescription })
            break
          case 'mark_leaving_docs':
            status = new StatusLeaving({ statusName: params.history[item].docStatusName, statusDescription: params.history[item].docStatusDescription })
            break
          case 'mark_issue_docs':
            status = new StatusSuz({ statusName: params.history[item].docStatusName, statusDescription: params.history[item].docStatusDescription })
            break
          case 'mark_introduce_docs':
            status = new StatusCommissioning({ statusName: params.history[item].docStatusName, statusDescription: params.history[item].docStatusDescription })
            break
          case 'external_return_docs':
            status = new StatusExternalReturn({ statusName: params.history[item].docStatusName, statusDescription: params.history[item].docStatusDescription })
            break
          case 'incoming_docs':
            status = new StatusIncoming({ statusName: params.history[item].docStatusName, statusDescription: params.history[item].docStatusDescription })
            break
          case 'reconciliation_docs':
            status = new StatusReconiliation({ statusName: params.history[item].docStatusName, statusDescription: params.history[item].docStatusDescription })
            break
          case 'external_shipment_docs':
            status = new StatusExternalShipment({ statusName: params.history[item].docStatusName, statusDescription: params.history[item].docStatusDescription })
            break
        }
        const object = {
          status: status,
          cols: [
            { value: params.indexInTest, type: 'string' },
            { value: { type: params.history[item].docType, id: params.history[item].documentId, transactionId: params.history[item].transactionId }, type: 'string' },
            { value: params.history[item].message, type: 'string' },
            { value: params.history[item].docStatusDescription, type: 'string' },
            { value: params.history[item].comment, type: 'string' }
          ]
        }
        this.rows.push(object)
      }
    }
  }
}
