function cancel(contractId, user, type) {
  console.log(`[HTTP]JOBLOSS::Service::Cancel::${JSON.stringify({ contractId })}`);

  return Promise.resolve({
    'status': `CANCELED`,
    'cancelType': type,
    'contractId': contractId,
  });
}

module.exports = {
  cancel,
};