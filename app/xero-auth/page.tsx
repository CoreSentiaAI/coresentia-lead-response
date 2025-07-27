'use client'

export default function XeroAuth() {
  const clientId = 'C4A301AE7EAF486DB397F15E85E5FC78'
  const redirectUri = encodeURIComponent('https://ivy.coresentia.com/api/xero/callback')
  const scope = 'accounting.transactions.read accounting.transactions.write accounting.contacts.read accounting.contacts.write accounting.settings openid profile email offline_access'
  
  const authUrl = `https://login.xero.com/identity/connect/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Xero Authentication</h1>
        <p className="mb-4">This will authorize CoreSentia to create quotes in Xero</p>
        <a 
          href={authUrl}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded inline-block"
        >
          Connect to Xero
        </a>
      </div>
    </div>
  )
}
