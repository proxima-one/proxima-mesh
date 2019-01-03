/*
Ora Command Line Interface
*/




async function main() {
  const {
  ora,
  node
 } = await Ora({identity : clientIdentity, addresses: clientAddresses, options: {provider: false}})

console.log("Starting client")
 ora.start()
}
