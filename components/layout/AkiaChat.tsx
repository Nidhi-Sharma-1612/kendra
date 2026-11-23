import Script from "next/script";

const AKIA_SRC = "https://sys.akia.ai/website_chat_js/aa0e55d6-9821-45d7-8130-7a27db0fcf6e/chat.js";

/**
 * Akia guest chat widget (embed code supplied by the owner). Loads after the page so it never slows
 * first paint. TODO(client): the snippet's hotel_name is "Creekwalk Inn and Cabins"; confirm that's
 * the right Akia account name for this site.
 */
export function AkiaChat() {
  return (
    <>
      <Script src={AKIA_SRC} strategy="afterInteractive" />
      <a href="https://www.akia.com/powered-by-akia?hotel_name=Creekwalk%20Inn%20and%20Cabins" rel="dofollow" style={{ display: "none" }}>
        Chat with us
      </a>
      <noscript>
        <a href="https://www.akia.com/enable-javascript" rel="dofollow">
          Chat with us
        </a>
      </noscript>
    </>
  );
}
