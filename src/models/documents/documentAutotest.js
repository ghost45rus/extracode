import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { StatusAutoTest } from 'models/status/status.autoTest'

export class DocumentAutotest extends Document {
  constructor (params, type) {
    super(params)
    const status = new StatusAutoTest({ statusName: params.statusName, statusDescription: params.statusDescription })
    super.setStatus(status)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.autoTestId, type: 'string' },
          { value: params.autoTestName, type: 'string' },
          { value: params.numberCommands, type: 'string' },
          { value: params.doneCommands, type: 'string' },
          { value: params.statusDescription, type: 'string' },
          { value: dateTimeFormat(params.docAddDate, 'minutes'), type: 'dateTime' },
          { value: dateTimeFormat(params.docModDate, 'minutes'), type: 'dateTime' }
        ]
        super.setCols(cols)
      }
        break
      case 'card':
        super.setParams(params)
        this.setDetails()
        break
    }
  }

  setDetails () {
    this.rows = []
    if (this.commands && this.commands.length) {
      for (const item in this.commands) {
        const object = {
          status: new StatusAutoTest({ statusName: this.commands[item].statusName, statusDescription: this.commands[item].statusDescription }),
          cols: [
            { value: this.commands[item].indexInTest, type: 'string' },
            { value: this.commands[item].commandName, type: 'string' },
            { value: this.commands[item].commandContent, type: 'string' },
            { value: this.commands[item].statusDescription, type: 'string' }
          ]
        }
        this.rows.push(object)
      }
    }
  }
}
