import { Button, Tooltip } from "antd";
import html2canvas from "html2canvas";
import { useContext } from "react";

import { AppContext } from "../../AppContext";

import "./SendButton.sass";
import { ArrowUpOutlined } from "@ant-design/icons";

export const SendButton = () => {
  const { setCurrentIngred } = useContext(AppContext);

  // Ẩn các phần tử có className cụ thể
  const hideElementsWithClass = (classNameToHide) => {
    const hiddenElements = [];
    const elements = document.querySelectorAll(`.${classNameToHide}`);

    elements.forEach((el) => {
      const originalDisplay = el.style.display;
      if (el.style.display !== "none") {
        hiddenElements.push({ element: el, originalDisplay });
        el.style.display = "none";
      }
    });

    return hiddenElements;
  };

  // Khôi phục các phần tử bị ẩn
  const restoreElements = (hiddenElements) => {
    hiddenElements.forEach(({ element, originalDisplay }) => {
      element.style.display = originalDisplay;
    });
  };

  // Làm trong suốt các vùng màu trắng
  const makeWhiteTransparent = (imgSrc, callback) => {
    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Làm trong suốt
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const transparentImg = canvas.toDataURL("image/png");
      callback(transparentImg);
    };
  };

  // Gộp hai ảnh
  const combineImages = (backgroundSrc, overlaySrc, callback) => {
    const backgroundImg = new Image();
    const overlayImg = new Image();

    backgroundImg.src = backgroundSrc;
    overlayImg.src = overlaySrc;

    backgroundImg.onload = () => {
      overlayImg.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = backgroundImg.width;
        canvas.height = backgroundImg.height;

        ctx.drawImage(backgroundImg, 0, 0);
        ctx.drawImage(overlayImg, 0, 0);

        const combinedImg = canvas.toDataURL("image/png");
        callback(combinedImg);
      };
    };
  };

  // Hiển thị ảnh kết quả
  const displayResultImage = (finalImg) => {
    const resultWindow = window.open("", "_blank");
    resultWindow.document.write(`
      <html>
        <head>
          <title>Combined Screenshot</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            img {
              max-width: 100%;
              max-height: 100%;
            }
          </style>
        </head>
        <body>
          <img src="${finalImg}" alt="Combined Screenshot" />
        </body>
      </html>
    `);
    resultWindow.document.close();
  };

  // Hàm để gửi API
  const sendImageToAPI = async (imageData) => {
    // Ví dụ logic gửi API:
    // await fetch("https://api.example.com/upload", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ image: imageData }),
    // });
  };

  // Chụp ảnh màn hình
  const handleScreenshot = async () => {
    const hiddenElements = hideElementsWithClass("hidden-element");

    const shotClasses = ["first_shot", "second_shot", "third_shot"];
    const images = [];

    for (const shotClass of shotClasses) {
      const classesToHide = shotClasses.filter((cls) => cls !== shotClass);
      const stepHiddenElements = [];
      classesToHide.forEach((cls) => {
        stepHiddenElements.push(...hideElementsWithClass(cls));
      });

      const canvas = await html2canvas(document.body);
      const imgData = canvas.toDataURL("image/png");
      images.push(imgData);

      restoreElements(stepHiddenElements);
    }

    restoreElements(hiddenElements);

    // Làm trong suốt các vùng trắng của ảnh
    const processedImages = [];
    makeWhiteTransparent(images[1], (transparentImg) => {
      processedImages.push(images[0]);
      processedImages.push(transparentImg);

      makeWhiteTransparent(images[2], (lastTransparentImg) => {
        processedImages.push(lastTransparentImg);

        // Gộp ảnh theo thứ tự 1 - 2 - 3
        combineImages(
          processedImages[0],
          processedImages[1],
          (firstCombined) => {
            combineImages(
              firstCombined,
              processedImages[2],
              async (finalImg) => {
                // Hiển thị ảnh
                displayResultImage(finalImg);

                // Gửi API
                await sendImageToAPI(finalImg);
              }
            );
          }
        );
      });
    });
  };

  return (
    <div className="send_button">
       <Tooltip className='send_button__tooltip' placement="bottom" >
        <Button
          icon={<ArrowUpOutlined />}
          className="send_button__button"
          size="large"
          type="primary"
          onClick={() => {
            setCurrentIngred(null);
            handleScreenshot();
          }}
        >
          Gửi bản thiết kế
        </Button>
       </Tooltip>
    </div>
  );
};
