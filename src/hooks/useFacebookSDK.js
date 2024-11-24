import { useEffect } from "react";

function useFacebookSDK() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v16.0",
      });
    };
  }, []);
}

export default useFacebookSDK;
