// Send to Plausible

import { Context } from "hono";

export async function plausible(c:Context) {
    // <plausible base>/api/event
    // docs: https://plausible.io/docs/events-api
    console.log(new URL(c.req.url).host)
    await fetch("https://" + c.env.PLAUSIBLE_DOMAIN + "/api/event", {
        method: "POST",
        headers: {
            "user-agent": c.req.headers.get("user-agent") as string,
            "x-forwarded-for": c.req.headers.get("x-real-ip") as string,
            "content-type": "application/json"
        },
        body: JSON.stringify(
            {
                domain: new URL(c.req.url).host,
                name: "pageview",
                url: c.req.url,
                referrer: c.req.headers.get("referrer")??"none"
            }
        ),

    })
}

export async function balls() {
    console.log("hi")
}