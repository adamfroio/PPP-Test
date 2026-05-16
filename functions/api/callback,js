export async function onRequest(context) {
	const { request, env } = context;
	const url = new URL(request.url);
	const code = url.searchParams.get("code");

	if (!code) {
		return new Response("Missing code", { status: 400 });
	}

	const tokenRes = await fetch(
		"https://github.com/login/oauth/access_token",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				client_id: env.GITHUB_CLIENT_ID,
				client_secret: env.GITHUB_CLIENT_SECRET,
				code,
			}),
		},
	);

	const data = await tokenRes.json();
	const token = data.access_token;

	const payload = JSON.stringify({ token, provider: "github" });
	const message = `authorization:github:success:${payload}`;

	return new Response(
		`<!doctype html><html><body><script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage('${message}', e.origin);
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script></body></html>`,
		{ headers: { "Content-Type": "text/html" } },
	);
}
