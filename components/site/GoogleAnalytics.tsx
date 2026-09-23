import Script from "next/script";

const GA_MEASUREMENT_ID = `G-FRX906FRWV`;
const GTAG_URL = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
/** Fallback for visitors who read without scrolling or tapping. */
const FALLBACK_DELAY_MS = 4000;
const INTERACTION_EVENTS = [`pointerdown`, `keydown`, `scroll`, `touchstart`];

/**
 * gtag.js is ~175 KB and was the largest main-thread cost on every page
 * (~370 ms of blocking in Lighthouse). The page view is queued in dataLayer
 * immediately, but the library itself is only fetched on the first
 * interaction or a few seconds after load, whichever comes first, so it never
 * competes with the page's own rendering. Only visitors who leave within that
 * window without touching the page go unrecorded.
 */
const LOADER = `(function(){
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('js',new Date());
gtag('config','${GA_MEASUREMENT_ID}');
var loaded=false;
function load(){
if(loaded)return;loaded=true;
var s=document.createElement('script');s.async=true;s.src='${GTAG_URL}';
document.head.appendChild(s);
}
${JSON.stringify(INTERACTION_EVENTS)}.forEach(function(e){addEventListener(e,load,{once:true,passive:true});});
if(document.readyState==='complete'){setTimeout(load,${FALLBACK_DELAY_MS});}
else{addEventListener('load',function(){setTimeout(load,${FALLBACK_DELAY_MS});});}
})();`;

export const GoogleAnalytics = (): React.JSX.Element => (
  <Script id="google-analytics" strategy="afterInteractive">
    {LOADER}
  </Script>
);
