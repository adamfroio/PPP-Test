export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const provider = url.searchParams.get("provider") || "github";
  const scope = url.searchParams.get("scope") || "repo,user";

  const redirectUri = `${url.origin}/api/callback`;
  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", scope);

  return Response.redirect(authUrl.toString(), 302);
}