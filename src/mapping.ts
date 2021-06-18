import {
  Approval as ApprovalEvent,
  Transfer as TransferEvent
} from "../generated/TestToken/TestToken"
import { Approval, Transfer } from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenOwner = event.params.tokenOwner
  entity.spender = event.params.spender
  entity.amount = event.params.amount
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = event.params.amount
  entity.save()
}
