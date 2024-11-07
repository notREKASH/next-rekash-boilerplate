export async function resendSendRequest(params: {
  apiKey: string;
  from: string;
  to: string;
  url: string;
}) {
  const { apiKey, from, to, url } = params;
  const { host } = new URL(url);
  const res = await fetch(process.env.AUTH_RESEND_SERVER!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Sign in to ${host}`,
      html: html({ url }),
      text: text({ url }),
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Resend API error:", errorData);
    throw new Error("Resend error: " + JSON.stringify(errorData));
  }
}

function html(params: { url: string }) {
  const { url } = params;

  return `
        <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 25px 48px;background-image:url(&quot;/assets/raycast-bg.png&quot;);background-position:bottom;background-repeat:no-repeat, no-repeat">
          <tbody>
            <tr style="width:100%">
              <td>
                <h1 style="font-size:28px;font-weight:bold;margin-top:48px">🪄 Your magic link</h1>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin:24px 0">
                  <tbody>
                    <tr>
                      <td>
                        <p style="font-size:16px;line-height:26px;margin:16px 0"><a href="${url}" style="color:#FF6363;text-decoration:none" target="_blank">👉 Click here to sign in 👈</a></p>
                        <p style="font-size:16px;line-height:26px;margin:16px 0">If you didn&#x27;t request this, please ignore this email.</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Best,<br />- notRekash</p>
                <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dddddd;margin-top:48px" />
                <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa;margin-left:4px">Next Auth.js</p>
              </td>
            </tr>
          </tbody>
        </table><!--/$-->
      </body>
      `;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url }: { url: string }) {
  return `🪄 YOUR MAGIC LINK
    
    👉 Click here to sign in 👈 ${url}
    
    If you didn't request this, please ignore this email.
    
    Best,
    - notRekash
    
    --------------------------------------------------------------------------------
    
    Next Auth.js
    `;
}
