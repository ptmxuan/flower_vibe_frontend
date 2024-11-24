import { useEffect } from "react";

function FacebookComments({ url, width = "100%" }) {
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
    <div className="facebook-comments">
      <div
        className="fb-comments"
        data-href={url}
        data-width={width}
        data-numposts="5"
      ></div>
    </div>
  );
}

export default FacebookComments;
