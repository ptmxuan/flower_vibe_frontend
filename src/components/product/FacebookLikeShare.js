import { useEffect } from "react";

function FacebookLikeShare({ url, width = "100%", size = "small" }) {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      const fbScript = document.createElement("script");
      fbScript.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v16.0";
      fbScript.async = true;
      fbScript.defer = true;
      document.body.appendChild(fbScript);
    }
  }, []);

  return (
    <div className="facebook-like-share">
      <div className="fb-like" 
        data-href={url} 
        data-width=""
        data-layout="" 
        data-action="" 
        data-size="" 
        data-share="true">
      </div>
    </div>
  );
}

export default FacebookLikeShare;
