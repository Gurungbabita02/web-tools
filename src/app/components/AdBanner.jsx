"use client";
import { useEffect, useRef, useState } from "react";

const AdBanner = ({ adSlot, adFormat = "auto", fullWidthResponsive = true }) => {
  // const adRef = useRef(null);
  // const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }

    // const timer = setTimeout(() => {
    //   if (adRef.current) {
    //     const ins = adRef.current.querySelector("ins");
    //     if (ins && ins.getAttribute("data-ad-status") === "filled") {
    //         (true);
    //     }
    //   }
    // }, 2000);

    // return () => clearTimeout(timer);
  }, []);

  return (
    <div  className={`ad-container text-center my-5 `}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7641843461158094"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      ></ins>
    </div>
  );
};

export default AdBanner;
