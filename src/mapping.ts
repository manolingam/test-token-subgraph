import {
  Approval as ApprovalEvent,
  Transfer as TransferEvent,
  TestToken as TestTokenContract
} from '../generated/TestToken/TestToken';

import {
  Approval,
  Transfer,
  Sender,
  Receiver,
  Delegator,
  Spender
} from '../generated/schema';

export function handleApproval(event: ApprovalEvent): void {
  let approval = new Approval(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  let delegator = Delegator.load(event.params.tokenOwner.toHexString());
  let spender = Spender.load(event.params.spender.toHexString());

  if (delegator == null) {
    delegator = new Delegator(event.params.tokenOwner.toHexString());
  }

  if (spender == null) {
    spender = new Spender(event.params.spender.toHexString());
  }

  let testTokenContract = TestTokenContract.bind(event.address);

  delegator.address = event.params.tokenOwner;
  delegator.tokenBalance = testTokenContract.balanceOf(event.params.tokenOwner);
  spender.address = event.params.spender;
  spender.tokenBalance = testTokenContract.balanceOf(event.params.spender);

  approval.delegator = delegator.id;
  approval.spender = spender.id;
  approval.amountApproved = event.params.amount;
  approval.timestamp = event.block.timestamp;
  approval.txHash = event.transaction.hash.toHexString();

  delegator.save();
  spender.save();
  approval.save();
}

export function handleTransfer(event: TransferEvent): void {
  let transfer = new Transfer(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  let sender = Sender.load(event.params.from.toHexString());
  let receiver = Receiver.load(event.params.to.toHexString());

  if (sender == null) {
    sender = new Sender(event.params.from.toHexString());
  }

  if (receiver == null) {
    receiver = new Receiver(event.params.to.toHexString());
  }

  let testTokenContract = TestTokenContract.bind(event.address);

  sender.address = event.params.from;
  sender.tokenBalance = testTokenContract.balanceOf(event.params.from);
  receiver.address = event.params.to;
  receiver.tokenBalance = testTokenContract.balanceOf(event.params.to);

  transfer.sender = sender.id;
  transfer.receiver = receiver.id;
  transfer.amountTransferred = event.params.amount;
  transfer.timestamp = event.block.timestamp;
  transfer.txHash = event.transaction.hash.toHexString();

  sender.save();
  receiver.save();
  transfer.save();
}
