function getGoogleOauthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"

  const options = {
    redirect_uri: import.meta.env
      .VITE_NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL as string,
    client_id: import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    acces_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  }
  console.log("options:", { options })
  const qs = new URLSearchParams(options)

  console.log("Query Strings:", qs.toString())

  return `${rootUrl}?${qs.toString()}`
}

export default getGoogleOauthURL
