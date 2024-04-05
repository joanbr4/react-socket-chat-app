import { GoogleAuth } from "google-auth-library"

//retrieve a default credential type, depending runtime
async function main() {
  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  })
  const client = await auth.getClient()
  const projectId = await auth.getProjectId()
  const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`
  const res = await client.request({ url })
  console.log(res.data)
}

async function main2() {
  const auth = new GoogleAuth()
  const credentials = await auth.getApplicationDefault()
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )
  oAuth2Client.setCredentials({
    access_token: "<KEY>",
    refresh_token: "<KEY>",
    expires_in: 3600,
    token_type: "Bearer",
  })
  console.log(oAuth2Client)
  const res = await oAuth2Client.request({
    url: "https://www.googleapis.com/oauth2/v1/userinfo",
    method: "GET",
  })
  console.log(res.data)
}

main().catch((err) => console.log(err))
