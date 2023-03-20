import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { StatusAutoTest } from 'models/status/status.autoTest'

export class DocumentAutotestSample extends Document {
  constructor (params, type) {
    super(params)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.id, type: 'string' },
          { value: params.sampleName, type: 'string' },
          { value: params.numberCommands, type: 'string' },
          { value: dateTimeFormat(params.docAddDate, 'minutes'), type: 'dateTime' },
          { value: dateTimeFormat(params.docModDate, 'minutes'), type: 'dateTime' }
        ]
        super.setCols(cols)
      }
        break
      case 'card':
        this.setParams(params)
        break
    }
  }
  setParams(params) {
    this.id = params.id
    this.sampleName = params.sampleName
    this.commands = params.commands.map(command => {
      return {
        index: command.indexInTest,
        value: {
          content: command.commandContent,
          id: command.id,
          commandId: command.commandId,
          name: command.name,
          regular: null,
          sample: command.sample,
          commandName: command.nameCommand
        }
      }
    })
  }
}
